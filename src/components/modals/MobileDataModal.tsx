"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { IoChevronDown } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import CustomButton from "@/components/shared/Button";
import { useGetDataPlan, useGetDataVariation, usePayForPalmPayData, useGetDataPlanByPhone } from "@/api/data/data.queries";
import { NetworkProvider } from "@/components/user/bill/bill.data";
import { handleNumericKeyDown, handleNumericPaste } from "@/utils/utilityFunctions";
import ErrorToast from "@/components/toast/ErrorToast";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import SpinnerLoader from "@/components/Loader/SpinnerLoader";
import { useTransactionProcessingStore } from "@/store/transactionProcessing.store";

interface MobileDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDataModal: React.FC<MobileDataModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"form" | "confirm" | "result">("form");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [operatorId, setOperatorId] = useState<string | number | undefined>();
  const [selectedNetworkPlan, setSelectedNetworkPlan] = useState<any>();
  const [checkoutMessage, setCheckoutMessage] = useState<string>("");
  const [formData, setFormData] = useState<any>(null);
  const [walletPin, setWalletPin] = useState("");
  const [transactionResult, setTransactionResult] = useState<any>(null);
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false);
  const [planDropdownOpen, setPlanDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const durationDropdownRef = useRef<HTMLDivElement>(null);
  const planDropdownRef = useRef<HTMLDivElement>(null);

  const prefixMap: Record<string, string[]> = {
    MTN: ["0803", "0806", "0703", "0706", "0813", "0816", "0810", "0814", "0903", "0906", "0913", "0916", "07025", "07026", "0704"],
    AIRTEL: ["0802", "0808", "0708", "0812", "0902", "0907", "0901", "0904", "0701", "0912"],
    GLO: ["0805", "0807", "0705", "0815", "0811", "0905", "0915", "08070", "08050"],
    "9MOBILE": ["0809", "0817", "0818", "0909", "0908"],
  };

  useOnClickOutside(dropdownRef, () => setNetworkDropdownOpen(false));
  useOnClickOutside(durationDropdownRef, () => setDurationDropdownOpen(false));
  useOnClickOutside(planDropdownRef, () => setPlanDropdownOpen(false));

  // Network options now come from API
  const {
    networkPlans: networkProviders, // Renamed for clarity, these are now billers
    isLoading: isNetworkProvidersLoading,
  } = useGetDataPlan({});

  const [providerOptions, setProviderOptions] = useState<any[]>([]);

  useEffect(() => {
    if (networkProviders && Array.isArray(networkProviders)) {
      const options = networkProviders.map((item: any) => {
        const rawName = (item.billerName || item.network || item.name || "").toUpperCase();
        // Don't normalize name to just "MTN" etc. Keep full name (e.g. "MTN SME")
        const normalizedName = rawName;

        return {
          name: normalizedName,
          logo: item.billerIcon || "",
          operatorId: item.billerId || item.operatorId || item.id,
        };
      });

      // Filter or map to ensure we have logos if needed
      // For now, mapping known names to local logos as fallback
      const enhancedOptions = options.map(opt => {
        const knownProvider = NetworkProvider.find(p => opt.name.includes(p.name.toUpperCase()));
        return { ...opt, logo: knownProvider?.logo || opt.logo };
      });

      setProviderOptions(enhancedOptions);
    }
  }, [networkProviders]);

  // Duration options come dynamically from the networkPlans API
  // or fall back to these defaults if no networkPlans are returned.
  const defaultDurationOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  const schema = useMemo(
    () =>
      yup.object().shape({
        phone: yup
          .string()
          .required("Phone Number is required")
          .min(11, "Phone Number must be at least 11 digits")
          .max(11, "Phone Number must be exactly 11 digits"),
        network: yup.string().required("Network is required"),
      }),
    []
  );

  const form = useForm({
    defaultValues: { phone: "", network: "" },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState, watch, setValue, clearErrors } = form;
  const { errors, isValid } = formState;
  const watchedPhone = watch("phone");
  const watchedNetwork = watch("network");

  // Clean phone number for API call (remove any non-digits)
  const cleanedPhone = watchedPhone?.replace(/\D/g, "") || "";



  // Only fetch data variations when a network is selected
  const {
    variations,
    isPending: dataVariationsPending,
    isError: dataVariationsError,
  } = useGetDataVariation({
    operatorId: operatorId ? Number(operatorId) : undefined,
  });

  const dataVariationsLoading = dataVariationsPending && !dataVariationsError;

  // Debug logging for data variations
  useEffect(() => {
    console.log("🔄 [DATA MODAL] operatorId changed:", operatorId);
    console.log("🔄 [DATA MODAL] Variations loading:", dataVariationsLoading);
    console.log("🔄 [DATA MODAL] Variations error:", dataVariationsError);
    console.log("🔄 [DATA MODAL] Variations count:", variations?.length || 0);
  }, [operatorId, dataVariationsLoading, dataVariationsError, variations]);

  const { showProcessing, showSuccess, showError } = useTransactionProcessingStore();

  const onPayDataSuccess = (data: any) => {
    setTransactionResult({ success: true, data });
    setStep("result");
    showSuccess({ title: "Payment Successful", message: "Mobile data purchase completed." });
  };

  const onPayDataError = (error: any) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage) ? errorMessage : [errorMessage];
    setTransactionResult({ success: false, error: errorMessage });
    setStep("result");
    showError({
      title: "Payment Failed",
      message: descriptions?.[0] || "Mobile data purchase failed.",
    });
  };

  const {
    mutate: PayForData,
    isPending: dataPending,
    isError: dataError,
  } = usePayForPalmPayData(onPayDataError, onPayDataSuccess);

  const dataLoading = dataPending && !dataError;

  // New: Fetch plan/operator info from API
  const { data: dataPlanData, isPending: isDataPlanLoading } = useGetDataPlanByPhone(cleanedPhone);

  useEffect(() => {
    if (dataPlanData?.data?.data) {
      const planInfo = dataPlanData.data.data;
      console.log("📡 [DATA] Plan Info Fetched:", planInfo);

      const apiNetwork = planInfo.network;
      // The plan field is an array for data: [{operatorId: 345}, {operatorId: 346}]
      // First one is usually the main data plans
      const apiPlan = Array.isArray(planInfo.plan) ? planInfo.plan[0] : planInfo.plan;
      const apiOperatorId = apiPlan?.operatorId;

      if (apiNetwork && apiOperatorId) {
        console.log(`🔧 [DATA] API detected network: ${apiNetwork}, operatorId: ${apiOperatorId}`);

        // Find matches loosely (e.g. "MTN SME" includes "MTN")
        const providerOption = providerOptions.find(
          (opt) =>
            opt.name.toUpperCase() === apiNetwork.toUpperCase() ||
            opt.name.toUpperCase().includes(apiNetwork.toUpperCase())
        );

        // Set operatorId from API - this is the source of truth for the transaction
        // NOTE: We only do this when api data changes, not when user selects a different provider manually
        
        if (providerOption) {
          // Verify we aren't overwriting a valid selection of the same network family
          // But since we removed selectedProvider from deps, this only runs on new API data.
          // So it's safe to enforce the API's "best guess" initially.
          
          setSelectedProvider({ name: providerOption.name, logo: providerOption.logo });
          // Note: providerOption.operatorId might differ from apiOperatorId if api detected SME but providerOption found Corp first.
          // Ideally we use apiOperatorId.
          setOperatorId(apiOperatorId);
          
          setValue("network", providerOption.name);
          clearErrors("network");
        } else {
           // Fallback
           setOperatorId(apiOperatorId);
           if (selectedProvider?.name !== apiNetwork) {
              setSelectedProvider({ name: apiNetwork, logo: "" });
              setValue("network", apiNetwork);
           }
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPlanData, providerOptions]);

  // Auto-detect network when phone number is entered
  useEffect(() => {
    // 1. Fast Detection: Use phone number prefix
    if (cleanedPhone && cleanedPhone.length >= 3) {
      const prefix = cleanedPhone.startsWith('0')
        ? cleanedPhone.substring(0, 4)
        : '0' + cleanedPhone.substring(0, 3);

      let detectedNetworkName = "";
      for (const [net, prefixes] of Object.entries(prefixMap)) {
        if (prefixes.includes(prefix)) {
          detectedNetworkName = net;
          break;
        }
      }

      if (detectedNetworkName) {
        const option = providerOptions.find(
          (opt) =>
            opt.name.toUpperCase() === detectedNetworkName ||
            (detectedNetworkName === "9MOBILE" && opt.name.toUpperCase() === "ETISALAT") ||
            (opt.name.toUpperCase() === "9MOBILE" && detectedNetworkName === "ETISALAT")
        );

        if (option) {
          if (selectedProvider?.name !== option.name) {
            console.log("🔧 [DATA] Auto-detected network:", option.name);
            // Only set UI provider - let API or manual selection handle operatorId
            setSelectedProvider({
              name: option.name,
              logo: option.logo,
            });
            setValue("network", option.name);
            clearErrors("network");
            // Do NOT set operatorId here to avoid conflicts or setting invalid values
            // setOperatorId(option.operatorId);
            // setSelectedNetworkPlan(option.operatorId);

            // Reset duration when provider changes to force re-detection
            setSelectedDuration("");
            setSelectedPlan("");
            setAmount("");
          }
        }
      } else if (cleanedPhone.length >= 11) {
        // ... (rest of logic)
      }
    }
  }, [cleanedPhone, providerOptions, setValue, clearErrors, selectedProvider]);

  const handleClose = () => {
    setStep("form");
    setSelectedProvider(null);
    setSelectedDuration("");
    setSelectedPlan("");
    setAmount("");
    setOperatorId(undefined);
    setSelectedNetworkPlan(undefined);
    setCheckoutMessage("");
    setFormData(null);
    setWalletPin("");
    setTransactionResult(null);
    setNetworkDropdownOpen(false);
    setDurationDropdownOpen(false);
    setPlanDropdownOpen(false);
    form.reset();
    onClose();
  };

  const onSubmit = (data: any) => {
    if (!selectedProvider || !amount || !selectedPlan || (selectedNetworkPlan === undefined || selectedNetworkPlan === null)) return;
    // Use the selectedNetworkPlan as operatorId
    setOperatorId(selectedNetworkPlan);
    setFormData({ ...data, amount, plan: selectedPlan, duration: selectedDuration });
    setStep("confirm");
  };

  const handleConfirmPayment = () => {
    console.log("🔍 [DATA PAY] Button clicked - Starting validation...");
    console.log("📋 [DATA PAY] Form Data:", formData);
    console.log("📋 [DATA PAY] Operator ID:", operatorId);
    console.log("📋 [DATA PAY] Wallet PIN Length:", walletPin.length);
    console.log("📋 [DATA PAY] Amount:", amount);

    if (!formData || !operatorId || walletPin.length !== 4) {
      console.error("❌ [DATA PAY] Validation Failed:", { formData: !!formData, operatorId, walletPinLength: walletPin.length });
      return;
    }

    console.log("✅ [DATA PAY] All validations passed!");

    // Format phone number to local format for PalmPay payload
    // e.g., 07043742886
    let cleaned = formData.phone.replace(/\D/g, "");
    let phoneNumber = cleaned;

    if (cleaned.length === 10) {
      phoneNumber = `0${cleaned}`;
    }


    const payload = {
      phoneNumber: phoneNumber,
      network: selectedProvider?.name,
      currency: "NGN",
      walletPin: walletPin,
      amount: Number(amount),
    };

    console.log("📤 [DATA PAY] Calling API with payload:", payload);
    showProcessing({ title: "Processing Payment", message: "Please wait..." });
    PayForData(payload);
  };

  const handlePlanSelect = (planAmount: string, description: string) => {
    setAmount(planAmount);
    setOperatorId(selectedNetworkPlan);
    setCheckoutMessage(description);
    setSelectedPlan(description);
    setPlanDropdownOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      aria-hidden="true"
      className="z-[999999] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 flex justify-center items-center w-full md:inset-0 h-[100dvh]"
    >
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-black/80 dark:bg-black/60" onClick={handleClose}></div>
      </div>
      <div className="relative mx-4 bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 w-full max-w-md rounded-2xl overflow-visible">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-2">
          <div>
            <h2 className="text-white text-lg font-semibold">
              {step === "form" ? "Mobile Data" : step === "confirm" ? "Mobile Data" : transactionResult?.success ? "Transaction History" : "Payment Failed"}
            </h2>
            <p className="text-white/60 text-sm">
              {step === "form" ? "Enter payment details to continue" :
                step === "confirm" ? "Confirm Transactions" :
                  transactionResult?.success ? "View complete information about this transaction" :
                    "Your transaction could not be completed"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <CgClose className="text-xl text-white/70" />
          </button>
        </div>

        {/* Content based on step */}
        <div className="px-4 pb-4">
          {step === "form" && (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {/* Mobile Number */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm">Mobile Number</label>
                <input
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-4 text-white placeholder:text-white/60 text-sm outline-none focus:ring-1 focus:ring-[#D4B139] focus:border-[#D4B139]"
                  placeholder="Enter mobile number"
                  type="text"
                  maxLength={11}
                  {...register("phone", {
                    onChange: (e) => {
                      // Clean input to only allow digits
                      const cleaned = e.target.value.replace(/\D/g, "").slice(0, 11);
                      e.target.value = cleaned;
                    }
                  })}
                  onKeyDown={handleNumericKeyDown}
                  onPaste={handleNumericPaste}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Network validation error */}
              <div className="flex flex-col gap-2">
                {errors.network && (
                  <p className="text-red-500 text-sm">{errors.network.message}</p>
                )}
              </div>

              {/* Select Network */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm">Select Network</label>
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}
                    className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-4 text-white text-sm outline-none cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {selectedProvider ? (
                        <>
                          {selectedProvider.logo && (
                            <Image
                              src={selectedProvider.logo}
                              alt={selectedProvider.name}
                              width={20}
                              height={20}
                              className="w-5 h-5 rounded-full"
                            />
                          )}
                          <span>{selectedProvider.name}</span>
                        </>
                      ) : (
                        <span className="text-white/50 text-sm">{isNetworkProvidersLoading ? "Loading networks..." : "Select network"}</span>
                      )}
                    </div>
                    {isNetworkProvidersLoading ? (
                      <SpinnerLoader width={16} height={16} color="#D4B139" />
                    ) : (
                      <IoChevronDown className={`w-4 h-4 text-white/70 transition-transform ${networkDropdownOpen ? 'rotate-180' : ''}`} />
                    )}
                  </div>

                  {/* Network Dropdown Options */}
                  {networkDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 rounded-lg shadow-lg z-50 overflow-hidden">
                      {providerOptions.map((network) => (
                        <div
                          key={network.name}
                          onClick={() => {
                            console.log("🔧 [DATA] Manual network selection:", network);
                            console.log("🔧 [DATA] Setting operatorId to:", network.operatorId);
                            setSelectedProvider({
                              name: network.name,
                              logo: network.logo,
                            });
                            // Set form value for validation
                            setValue("network", network.name);
                            clearErrors("network");
                            // Use the numeric operatorId from the network option
                            setOperatorId(network.operatorId); // This should be a number
                            setSelectedNetworkPlan(network.operatorId);
                            setSelectedPlan(""); // Reset plan when network changes
                            setAmount(""); // Reset amount when network changes
                            setNetworkDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 text-white text-sm hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          {network.logo && (
                            <Image
                              src={network.logo}
                              alt={network.name}
                              width={20}
                              height={20}
                              className="w-5 h-5 rounded-full"
                            />
                          )}
                          <span>{network.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Duration */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm">Duration</label>
                <div className="relative" ref={durationDropdownRef}>
                  <div
                    onClick={() => setDurationDropdownOpen(!durationDropdownOpen)}
                    className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-4 text-white text-sm outline-none cursor-pointer flex items-center justify-between"
                  >
                    <span className={selectedDuration ? "text-white" : "text-white/50"}>
                      {selectedDuration || "Select duration"}
                    </span>
                    <IoChevronDown className={`w-4 h-4 text-white/70 transition-transform ${durationDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Duration Dropdown Options */}
                  {durationDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 rounded-lg shadow-lg z-50 overflow-hidden">
                      {defaultDurationOptions.map((duration) => (
                        <div
                          key={duration.value}
                          onClick={() => {
                            setSelectedDuration(duration.label);
                            setDurationDropdownOpen(false);
                          }}
                          className="px-4 py-3 text-white text-sm hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          {duration.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Plan */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm">Plan</label>
                <div className="relative" ref={planDropdownRef}>
                  <div
                    onClick={() => setPlanDropdownOpen(!planDropdownOpen)}
                    className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-4 text-white text-sm outline-none cursor-pointer flex items-center justify-between"
                  >
                    <span className={selectedPlan ? "text-white" : "text-white/50"}>
                      {selectedPlan || "Select plan"}
                    </span>
                    <IoChevronDown className={`w-4 h-4 text-white/70 transition-transform ${planDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Plan Dropdown Options */}
                  {planDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 rounded-lg shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto">
                      {!selectedNetworkPlan ? (
                        <div className="px-4 py-3 text-white/50 text-sm">Select network first</div>
                      ) : dataVariationsLoading ? (
                        <div className="flex items-center justify-center py-4">
                          <SpinnerLoader width={20} height={20} color="#D4B139" />
                          <span className="text-white/70 text-sm ml-2">Loading plans...</span>
                        </div>
                      ) : dataVariationsError ? (
                        <div className="px-4 py-3 text-red-400 text-sm">Failed to load plans. Please try again.</div>
                      ) : variations && variations.length > 0 ? (
                        (() => {
                          console.log("📡 Raw Variations from API:", variations);
                          const filteredVariations = variations.filter((item: any) => {
                            if (!selectedDuration) return true;
                            const desc = String(item.name).toLowerCase();
                            const duration = selectedDuration.toLowerCase();

                            // If the duration name is generic (e.g., "Plans", "Data", "MTN Plans"), show all variations
                            const genericKeywords = ["plan", "data", "list", "all", "internet", "bundle"];
                            const isGeneric = genericKeywords.some(keyword => duration.includes(keyword)) &&
                              !["day", "daily", "week", "month", "year"].some(keyword => duration.includes(keyword));

                            if (isGeneric) return true;

                            if (duration.includes("daily") || duration.includes("day")) {
                              return desc.includes("day") || desc.includes("daily") || desc.includes("24hr") || desc.includes("24 hr");
                            }
                            if (duration.includes("weekly") || duration.includes("week")) {
                              return desc.includes("week") || desc.includes("weekly") || desc.includes("7 day") || desc.includes("7day");
                            }
                            if (duration.includes("monthly") || duration.includes("month")) {
                              return desc.includes("month") || desc.includes("monthly") || desc.includes("30 day") || desc.includes("30day");
                            }
                            if (duration.includes("yearly") || duration.includes("year")) {
                              return desc.includes("year") || desc.includes("yearly") || desc.includes("365 day") || desc.includes("365day");
                            }
                            return desc.includes(duration);
                          });

                          if (filteredVariations.length === 0) {
                            return <div className="px-4 py-3 text-white/50 text-sm">No plans available for this duration</div>;
                          }

                          return filteredVariations.map((item: any, index: number) => (
                            <div
                              key={`${item.amount}-${index}`}
                              onClick={() => handlePlanSelect(item.amount, String(item.name))}
                              className="flex items-center justify-between px-4 py-3 text-white text-sm hover:bg-white/5 cursor-pointer transition-colors"
                            >
                              <span>{String(item.name)}</span>
                              <span className="text-[#D4B139] font-medium">₦{Number(item.amount).toLocaleString()}</span>
                            </div>
                          ));
                        })()
                      ) : (
                        <div className="px-4 py-3 text-white/50 text-sm">No plans available for this network</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Amount Display */}
              <div className="flex items-center justify-center py-2">
                <div className="flex items-center gap-2 text-green-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-lg">₦{Number(amount).toLocaleString()}.00</span>
                </div>
              </div>

              {/* Next Button */}
              <CustomButton
                type="submit"
                disabled={!isValid || !selectedProvider || !selectedPlan || !amount || dataLoading}
                isLoading={dataLoading}
                className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-medium py-3 rounded-lg transition-colors mt-2"
              >
                Next
              </CustomButton>
            </form>
          )}

          {step === "confirm" && formData && (
            <div className="flex flex-col gap-6">
              {/* Transaction Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Network</span>
                  <span className="text-white text-sm font-medium">{selectedProvider?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Phone Number</span>
                  <span className="text-white text-sm font-medium">+{formData.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Duration</span>
                  <span className="text-white text-sm font-medium">{formData.duration || "Monthly"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Plan</span>
                  <span className="text-white text-sm font-medium">{formData.plan || selectedPlan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Amount</span>
                  <span className="text-white text-sm font-medium">₦{Number(amount).toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Amount Debited</span>
                  <span className="text-white text-sm font-medium">₦{Number(amount).toLocaleString()}.00</span>
                </div>
              </div>

              {/* PIN Input */}
              <div className="flex flex-col gap-3">
                <label className="text-white/60 text-sm">Enter Transaction PIN</label>
                <div className="relative">
                  <input
                    type="password"
                    maxLength={4}
                    value={walletPin}
                    onChange={(e) => setWalletPin(e.target.value)}
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement;
                      input.value = input.value.replace(/\D/g, ""); // Remove non-digit characters
                    }}
                    className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-4 px-4 text-white placeholder:text-white/40 text-sm outline-none focus:ring-1 focus:ring-[#D4B139] focus:border-[#D4B139] pr-14"
                    placeholder=""
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 rounded-full p-2.5">
                    <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.27.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.29-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.69-2.5 1.65-3.4 2.94-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-2.04-1.34-3.30 0-1.28.47-2.44 1.34-3.30.19-.19.50-.19.69 0 .19.19.19.50 0 .69-.68.68-1.04 1.57-1.04 2.61 0 1.04.36 1.93 1.04 2.61.19.19.19.50 0 .69-.09.1-.22.15-.34.15zm7.5 0c-.13 0-.26-.05-.35-.15-.19-.19-.19-.50 0-.69.68-.68 1.04-1.57 1.04-2.61 0-1.04-.36-1.93-1.04-2.61-.19-.19-.19-.50 0-.69.19-.19.50-.19.69 0 .87.86 1.34 2.02 1.34 3.30 0 1.26-.47 2.43-1.34 3.30-.09.1-.22.15-.34.15zM12 13.44c-.78 0-1.42-.64-1.42-1.42s.64-1.42 1.42-1.42 1.42.64 1.42 1.42-.64 1.42-1.42 1.42zm0-1.84c-.23 0-.42.19-.42.42s.19.42.42.42.42-.19.42-.42-.19-.42-.42-.42z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-2">
                <CustomButton
                  onClick={() => setStep("form")}
                  className="flex-1 bg-transparent border border-border-600 text-white hover:bg-white/5 py-4 rounded-lg transition-colors font-medium"
                >
                  Back
                </CustomButton>
                <CustomButton
                  onClick={handleConfirmPayment}
                  disabled={walletPin.length !== 4 || dataLoading}
                  isLoading={dataLoading}
                  className="flex-1 bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-medium py-4 rounded-lg transition-colors"
                >
                  Pay
                </CustomButton>
              </div>
            </div>
          )}

          {step === "result" && transactionResult && (
            <div className="flex flex-col items-center gap-4">
              {/* Success/Error Icon and Amount */}
              <div className="flex flex-col items-center gap-2">
                {transactionResult.success ? (
                  <>
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-green-500 text-sm font-medium">Successful</span>
                    <span className="text-white text-2xl font-bold">₦{Number(amount || 0).toLocaleString()}.00</span>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-red-500 text-sm font-medium">Failed</span>
                    <span className="text-red-400 text-xs mt-1 text-center font-medium max-w-[200px]">
                      {transactionResult.error || "An unknown error occurred"}
                    </span>
                    <span className="text-white text-2xl font-bold">₦{Number(amount || 0).toLocaleString()}.00</span>
                  </>
                )}
              </div>

              {/* Transaction Details */}
              {transactionResult.success ? (
                <div className="w-full space-y-3 mt-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Transaction Reference</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-mono">
                          {transactionResult?.data?.data?.transactionRef || transactionResult?.data?.data?.transaction?.transactionRef || transactionResult?.data?.data?.transactionId || "N/A"}
                        </span>
                        {(transactionResult?.data?.data?.transactionRef || transactionResult?.data?.data?.transaction?.transactionRef || transactionResult?.data?.data?.transactionId) && (
                          <button
                            onClick={() => {
                              const ref = transactionResult?.data?.data?.transactionRef || transactionResult?.data?.data?.transaction?.transactionRef || transactionResult?.data?.data?.transactionId;
                              if (ref) navigator.clipboard.writeText(String(ref));
                            }}
                            className="p-1 rounded hover:bg-white/10"
                            title="Copy"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-white/70">
                              <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V7q0-.825.588-1.412T7 5h8q.825 0 1.413.588T17 7v12q0 .825-.587 1.413T15 21zm0-2h8V7H7zm10-2V5H9V3h8q.825 0 1.413.588T19 5v12z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    {transactionResult?.data?.data?.pin && (
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">PIN</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-mono">{transactionResult.data.data.pin}</span>
                          <button
                            onClick={() => navigator.clipboard.writeText(transactionResult.data.data.pin)}
                            className="p-1 rounded hover:bg-white/10"
                            title="Copy"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-white/70">
                              <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V7q0-.825.588-1.412T7 5h8q.825 0 1.413.588T17 7v12q0 .825-.587 1.413T15 21zm0-2h8V7H7zm10-2V5H9V3h8q.825 0 1.413.588T19 5v12z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                    {transactionResult?.data?.data?.transactionId && (
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">Transaction ID</span>
                        <span className="text-white text-sm font-mono">{transactionResult.data.data.transactionId}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70 text-sm">Transaction ID</span>
                    <span className="text-white text-sm font-medium">
                      {transactionResult?.data?.data?.transactionRef || transactionResult?.data?.data?.transaction?.transactionRef || transactionResult?.data?.data?.transactionId || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70 text-sm">Date & Time</span>
                    <span className="text-white text-sm font-medium">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70 text-sm">Payment Method</span>
                    <span className="text-white text-sm font-medium">Available Balance</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70 text-sm">Transaction Type</span>
                    <span className="text-white text-sm font-medium">Data</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70 text-sm">To</span>
                    <span className="text-white text-sm font-medium">{selectedProvider?.name} Nigeria</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70 text-sm">Number</span>
                    <span className="text-white text-sm font-medium">+{formData?.phone}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70 text-sm">Plan</span>
                    <span className="text-white text-sm font-medium">{selectedPlan}</span>
                  </div>
                </div>
              ) : null}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 w-full">
                <CustomButton
                  onClick={handleClose}
                  className="flex-1 bg-transparent border border-border-600 text-white hover:bg-white/5 py-3 rounded-lg transition-colors"
                >
                  Contact Support
                </CustomButton>
                {transactionResult.success ? (
                  <CustomButton
                    onClick={handleClose}
                    className="flex-1 bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-medium py-3 rounded-lg transition-colors"
                  >
                    Download Receipt
                  </CustomButton>
                ) : (
                  <CustomButton
                    onClick={() => {
                      setStep("form");
                      setTransactionResult(null);
                    }}
                    className="flex-1 bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-medium py-3 rounded-lg transition-colors"
                  >
                    Try Again
                  </CustomButton>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileDataModal;
