"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { CgClose } from "react-icons/cg";
import { IoChevronDown } from "react-icons/io5";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import CustomButton from "@/components/shared/Button";
import { useGetAirtimeNetWorkProvider, usePayForAirtime, useGetAirtimePlanByPhone } from "@/api/airtime/airtime.queries";
import { NetworkProvider } from "@/components/user/bill/bill.data";
import { handleNumericKeyDown, handleNumericPaste } from "@/utils/utilityFunctions";
import ErrorToast from "@/components/toast/ErrorToast";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import SpinnerLoader from "@/components/Loader/SpinnerLoader";
import { useTransactionProcessingStore } from "@/store/transactionProcessing.store";

interface AirtimeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AirtimeModal: React.FC<AirtimeModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"form" | "confirm" | "result">("form");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [maxAmount, setMaximumAmount] = useState<number>(0);
  const [operatorId, setOperatorId] = useState<string | number | undefined>();
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [walletPin, setWalletPin] = useState("");
  const [transactionResult, setTransactionResult] = useState<any>(null);
  const [isBeneficiaryChecked, setIsBeneficiaryChecked] = useState(false);
  const [providerOptions, setProviderOptions] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const prefixMap: Record<string, string[]> = {
    MTN: ["0803", "0806", "0703", "0706", "0813", "0816", "0810", "0814", "0903", "0906", "0913", "0916", "07025", "07026", "0704"],
    AIRTEL: ["0802", "0808", "0708", "0812", "0902", "0907", "0901", "0904", "0701", "0912"],
    GLO: ["0805", "0807", "0705", "0815", "0811", "0905", "0915", "08070", "08050"],
    "9MOBILE": ["0809", "0817", "0818", "0909", "0908"],
  };

  useOnClickOutside(dropdownRef, () => {
    setNetworkDropdownOpen(false);
  });

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const { data: networkProviders, isPending: airtimeProvidersLoading } = useGetAirtimeNetWorkProvider();




  useEffect(() => {
    // Debug: Log the entire response to understand structure
    console.log("🔍 Network Providers Response:", networkProviders);

    // Highly resilient extraction of providers array from API response
    // Handles scenarios where data is nested in data.data or directly in data
    const extractProviders = () => {
      if (!networkProviders) {
        console.log("❌ No networkProviders data");
        return [];
      }

      const responseBody = networkProviders.data;
      console.log("📦 Response Body:", responseBody);

      // Check for PalmPay structure: data.billers
      if (Array.isArray(responseBody?.data?.billers)) {
        console.log("✅ Found data in responseBody.data.billers (PalmPay)");
        return responseBody.data.billers;
      }

      if (Array.isArray(responseBody?.data)) {
        console.log("✅ Found data in responseBody.data");
        return responseBody.data;
      }
      if (Array.isArray(responseBody)) {
        console.log("✅ Found data in responseBody");
        return responseBody;
      }
      if (Array.isArray(networkProviders)) {
        console.log("✅ Found data in networkProviders");
        return networkProviders;
      }

      console.log("❌ No array found in response");
      return [];
    };

    const providersArray = extractProviders();
    console.log("📋 Providers Array:", providersArray);
    if (providersArray.length > 0) {
      console.log("📋 First Provider (raw):", providersArray[0]);
    }

    if (providersArray.length > 0) {
      const options = providersArray.map((item: any) => {
        // Support both old (network/planName) and new (billerName/billerId) structures
        const networkName = (item?.billerName || item?.network || item?.planName || item?.billerId || "").toUpperCase();
        const provider = NetworkProvider.find(
          (p) =>
            networkName.includes(p.name.toUpperCase()) ||
            p.name.toUpperCase().includes(networkName)
        );

        const extractedValue = item?.billerId || item?.operatorId || item?.id || "";
        console.log("🔍 Item:", item.billerName || item.network, "| billerId:", item?.billerId, "| operatorId:", item?.operatorId, "| id:", item?.id, "| Final value:", extractedValue);

        return {
          value: extractedValue,
          label: item?.billerName || item?.planName || item?.network || item?.billerId || "Unknown Provider",
          name: networkName.includes("MTN") ? "MTN" :
            networkName.includes("AIRTEL") ? "AIRTEL" :
              networkName.includes("GLO") ? "GLO" :
                networkName.includes("9MOBILE") || networkName.includes("9 MOBILE") ? "9MOBILE" : networkName,
          logo: provider?.logo || item?.billerIcon,
          minAmount: item?.minAmount || 50,
          maxAmount: item?.maxAmount || 50000,
        };
      });
      console.log("✨ Provider Options:", options);
      setProviderOptions(options);
    }
  }, [networkProviders]);

  const schema = useMemo(
    () =>
      yup.object().shape({
        phone: yup
          .string()
          .required("Phone Number is required")
          .min(11, "Phone Number must be at least 11 digits")
          .max(11, "Phone Number must be exactly 11 digits"),
        amount: yup
          .number()
          .required("Amount is required")
          .typeError("Amount is required")
          .min(50, "Minimum amount is ₦50")
          .max(
            maxAmount || 50000,
            `Maximum amount is ₦${(maxAmount || 50000).toLocaleString()}`
          ),
      }),
    [maxAmount]
  );

  const form = useForm({
    defaultValues: { phone: "", amount: undefined },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState, watch } = form;
  const { errors, isValid } = formState;
  const watchedPhone = watch("phone");

  // Clean phone number for API call (remove any non-digits)
  const cleanedPhone = useMemo(() => watchedPhone?.replace(/\D/g, "") || "", [watchedPhone]);

  const { showProcessing, showSuccess, showError } = useTransactionProcessingStore();

  const onPayAirtimeSuccess = (data: any) => {
    setTransactionResult({ success: true, data });
    setStep("result");
    showSuccess({ title: "Payment Successful", message: "Airtime purchase completed." });
  };

  const onPayAirtimeError = (error: any) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage) ? errorMessage : [errorMessage];
    setTransactionResult({ success: false, error: errorMessage });
    setStep("result");
    showError({
      title: "Payment Failed",
      message: descriptions?.[0] || "Airtime purchase failed.",
    });
  };

  const {
    mutate: PayForAirtime,
    isPending: airtimePending,
    isError: airtimeError,
  } = usePayForAirtime(onPayAirtimeError, onPayAirtimeSuccess);

  const airtimeLoading = airtimePending && !airtimeError;

  // Fetch plan/operator info from API when phone number is valid (11 digits)
  const { data: airtimePlanData, isPending: isPlanLoading } = useGetAirtimePlanByPhone(cleanedPhone);

  useEffect(() => {
    if (airtimePlanData) {
      console.log("📡 [AIRTIME] Plan Info Fetched:", airtimePlanData);

      // Robust extraction for PalmPay / legacy structures
      const responseData = airtimePlanData?.data?.data || airtimePlanData?.data || airtimePlanData;

      const apiNetwork = responseData?.network || responseData?.billerName || responseData?.operatorName || responseData?.providerName;
      // PalmPay often returns 'billerId' or 'operatorId'
      const apiOperatorId = responseData?.operatorId || responseData?.billerId || responseData?.plan?.operatorId || responseData?.data?.operatorId;

      if (apiNetwork || apiOperatorId) { // Allow if at least one is found, we might be able to map the other
        console.log(`🔧 [AIRTIME] API detected network: ${apiNetwork}, operatorId: ${apiOperatorId}`);

        // Normalize network name for matching
        const normalizedNetwork = (apiNetwork || "").toUpperCase();

        // Find matching provider option
        const providerOption = providerOptions.find(
          (opt) =>
            (normalizedNetwork && opt.name.toUpperCase().includes(normalizedNetwork)) ||
            (normalizedNetwork && normalizedNetwork.includes(opt.name.toUpperCase())) ||
            // usage of operatorId/billerId to match if network name is fuzzy
            (apiOperatorId && String(opt.value) === String(apiOperatorId))
        );

        // Determine final Operator ID
        const finalOperatorId = apiOperatorId || providerOption?.value;

        if (finalOperatorId) {
          // Set operatorId from API - this is the source of truth for the transaction
          setOperatorId(finalOperatorId);
          console.log("✅ [AIRTIME] Set operatorId to:", finalOperatorId);
        }

        if (providerOption) {
          // If we found a matching provider in our list, verify names match or update selection
          if (selectedProvider?.name !== providerOption.name) {
            setSelectedProvider(providerOption);
            setMaximumAmount(providerOption.maxAmount || 50000);
          }
        } else if (apiNetwork) {
          // Fallback if provider not found in list but returned by plan API
          // Only set if not already set to something valid
          if (selectedProvider?.name !== apiNetwork) {
            // Try to map known names manually if providerOptions failed
            let mappedName = apiNetwork;
            if (normalizedNetwork.includes("MTN")) mappedName = "MTN";
            else if (normalizedNetwork.includes("AIRTEL")) mappedName = "AIRTEL";
            else if (normalizedNetwork.includes("GLO")) mappedName = "GLO";
            else if (normalizedNetwork.includes("9MOBILE") || normalizedNetwork.includes("ETISALAT")) mappedName = "9MOBILE";

            setSelectedProvider({ name: mappedName, label: mappedName });
          }
        }
      }
    }
  }, [airtimePlanData, providerOptions, selectedProvider]);


  useEffect(() => {
    // Detect network based on phone number prefix
    // Support both 0803 (4 digits) and 803 (3 digits) formats
    if (cleanedPhone && cleanedPhone.length >= 3) {
      const prefix = cleanedPhone.startsWith('0')
        ? cleanedPhone.substring(0, 4)
        : '0' + cleanedPhone.substring(0, 3);

      let detectedNetwork = "";

      for (const [net, prefixes] of Object.entries(prefixMap)) {
        if (prefixes.includes(prefix)) {
          detectedNetwork = net;
          break;
        }
      }

      if (detectedNetwork) {
        const providerOption = providerOptions.find(
          (opt) =>
            opt.name === detectedNetwork ||
            opt.label?.toUpperCase().includes(detectedNetwork)
        );

        if (providerOption) {
          // Check if we need to update to avoid infinite loops
          if (selectedProvider?.name !== providerOption.name) {
            console.log("🔧 [AIRTIME] Auto-detected network:", providerOption.name);
            // Only update UI provider selection - let API or manual select handle operatorId
            setSelectedProvider(providerOption);
            // Use max from provider if available, otherwise use default
            setMaximumAmount(providerOption.maxAmount || 50000);
          }
        }
      }
      // Removed the aggressively clearing block here to allow manual selection
    } else if (cleanedPhone.length === 0) {
      if (selectedProvider !== null || operatorId !== undefined) {
        setSelectedProvider(null);
        setOperatorId(undefined);
      }
    }
  }, [cleanedPhone, providerOptions, selectedProvider, operatorId]);

  const handleClose = () => {
    setStep("form");
    setSelectedProvider(null);
    setMaximumAmount(0);
    setOperatorId(undefined);
    setNetworkDropdownOpen(false);
    setFormData(null);
    setWalletPin("");
    setTransactionResult(null);
    form.reset();
    onClose();
  };

  const onSubmit = (data: any) => {
    if (operatorId === undefined || operatorId === null) return;
    setFormData(data);
    setStep("confirm");
  };

  const handleConfirmPayment = () => {
    console.log("🔍 [AIRTIME PAY] Button clicked - Starting validation...");
    console.log("📋 [AIRTIME PAY] Form Data:", formData);
    console.log("📋 [AIRTIME PAY] Operator ID:", operatorId, "Type:", typeof operatorId);
    console.log("📋 [AIRTIME PAY] Wallet PIN:", walletPin, "Length:", walletPin.length);
    console.log("📋 [AIRTIME PAY] Is Number Check:", isNaN(Number(operatorId)));

    // Individual validation checks with detailed logging
    if (!formData) {
      console.error("❌ [AIRTIME PAY] Validation Failed: formData is missing");
      return;
    }

    if (operatorId === undefined || operatorId === null) {
      console.error("❌ [AIRTIME PAY] Validation Failed: operatorId is undefined or null");
      return;
    }

    if (isNaN(Number(operatorId))) {
      console.error("❌ [AIRTIME PAY] Validation Failed: operatorId is not a number:", operatorId);
      return;
    }

    if (walletPin.length !== 4) {
      console.error("❌ [AIRTIME PAY] Validation Failed: walletPin length is not 4, got:", walletPin.length);
      return;
    }

    console.log("✅ [AIRTIME PAY] All validations passed!");

    // Format phone number to local format: ensure 11 digits with leading 0
    // e.g., 07043742886 -> 07043742886 (keep as is)
    // e.g., 7043742886 -> 07043742886 (add leading 0)
    // e.g., 2347043742886 -> 07043742886 (remove country code, add leading 0)
    // e.g., +2347043742886 -> 07043742886 (remove + and country code, add leading 0)
    let cleaned = formData.phone.replace(/\D/g, "");
    let phoneForPayment = cleaned;

    // Remove country code if present (234 or +234)
    if (cleaned.startsWith("234") && (cleaned.length === 13 || cleaned.length === 14)) {
      // Remove 234 prefix and add leading 0
      const withoutCountryCode = cleaned.slice(3);
      phoneForPayment = `0${withoutCountryCode}`;
    } else if (cleaned.length === 10) {
      // If phone is 10 digits (without leading 0), add leading 0
      phoneForPayment = `0${cleaned}`;
    } else if (cleaned.length === 11 && !cleaned.startsWith("0")) {
      // If 11 digits but doesn't start with 0, replace first digit with 0
      phoneForPayment = `0${cleaned.slice(1)}`;
    } else if (cleaned.length === 11 && cleaned.startsWith("0")) {
      // Already in correct format (11 digits with leading 0)
      phoneForPayment = cleaned;
    } else if (cleaned.length > 11) {
      // If longer than 11, might have country code - extract last 10 digits and add 0
      const last10 = cleaned.slice(-10);
      phoneForPayment = `0${last10}`;
    }

    // Ensure final format is exactly 11 digits starting with 0
    if (phoneForPayment.length !== 11 || !phoneForPayment.startsWith("0")) {
      // Fallback: take last 10 digits and add leading 0
      const last10 = cleaned.slice(-10);
      phoneForPayment = `0${last10}`;
    }

    const payload = {
      phone: phoneForPayment,
      currency: "NGN",
      walletPin: walletPin,
      operatorId: Number(operatorId),
      amount: Number(formData.amount),
      addBeneficiary: isBeneficiaryChecked,
    };

    console.log("📤 [AIRTIME PAY] Calling API with payload:", payload);
    showProcessing({ title: "Processing Payment", message: "Please wait..." });
    PayForAirtime(payload);
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
              {step === "form" ? "Airtime" : step === "confirm" ? "Airtime" : transactionResult?.success ? "Transaction History" : "Payment Failed"}
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
                  {...register("phone")}
                  onKeyDown={handleNumericKeyDown}
                  onPaste={handleNumericPaste}
                />
                {errors?.phone?.message && (
                  <p className="text-red-400 text-xs">{errors.phone.message}</p>
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
                          <Image
                            src={selectedProvider.logo}
                            alt={selectedProvider.name}
                            width={20}
                            height={20}
                            className="w-5 h-5 rounded-full"
                          />
                          <span>{selectedProvider.name}</span>
                        </>
                      ) : (
                        <span className="text-white/50">Enter phone number</span>
                      )}
                    </div>
                    <IoChevronDown className={`w-4 h-4 text-white/70 transition-transform ${networkDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Dropdown Options */}
                  {networkDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 rounded-lg shadow-lg z-50 overflow-hidden max-h-[250px] overflow-y-auto">
                      {airtimeProvidersLoading ? (
                        <div className="flex items-center gap-2 px-4 py-3 text-white/70 text-sm">
                          <SpinnerLoader width={16} height={16} color="#D4B139" />
                          <span>Loading networks...</span>
                        </div>
                      ) : providerOptions.length > 0 ? (
                        providerOptions.map((network, index) => (
                          <div
                            key={`${network.name}-${index}`}
                            onClick={() => {
                              console.log("🔧 [AIRTIME] Manual network selection:", network);
                              console.log("🔧 [AIRTIME] Setting operatorId to:", network.value);
                              setSelectedProvider(network);
                              setOperatorId(network.value); // Use network.value which is the billerId
                              setMaximumAmount(network.maxAmount || 50000);
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
                            <span>{network.label}</span>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-white/50 text-sm">
                          No networks found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm">Amount</label>
                <input
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-4 text-white placeholder:text-white/60 text-sm outline-none focus:ring-1 focus:ring-[#D4B139] focus:border-[#D4B139]"
                  placeholder="Enter amount"
                  type="number"
                  min={50}
                  max={maxAmount || 50000}
                  {...register("amount")}
                />
                {errors?.amount?.message && (
                  <p className="text-red-400 text-xs">{errors.amount.message}</p>
                )}
              </div>

              {/* Next Button */}
              <CustomButton
                type="submit"
                disabled={!isValid || !selectedProvider || (operatorId === undefined || operatorId === null || operatorId === "") || airtimeLoading}
                isLoading={airtimeLoading}
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
                  <span className="text-white/60 text-sm">Amount</span>
                  <span className="text-white text-sm font-medium">₦{Number(formData.amount).toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Amount Debited</span>
                  <span className="text-white text-sm font-medium">₦{Number(formData.amount).toLocaleString()}.00</span>
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
                  disabled={walletPin.length !== 4 || airtimeLoading}
                  isLoading={airtimeLoading}
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
                    <span className="text-white text-2xl font-bold">₦{Number(formData?.amount || 0).toLocaleString()}.00</span>
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
                    <span className="text-white text-2xl font-bold">₦{Number(formData?.amount || 0).toLocaleString()}.00</span>
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
                    <div className="flex justify-between items-center py-2 border-t border-white/5 mt-2">
                      <span className="text-white/70 text-sm">Date & Time</span>
                      <span className="text-white text-sm font-medium">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/70 text-sm">Payment Method</span>
                      <span className="text-white text-sm font-medium">Available Balance</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/70 text-sm">Transaction Type</span>
                      <span className="text-white text-sm font-medium">Airtime</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/70 text-sm">To</span>
                      <span className="text-white text-sm font-medium">{selectedProvider?.name} Nigeria</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/70 text-sm">Number</span>
                      <span className="text-white text-sm font-medium">+{formData?.phone}</span>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 w-full">
                <CustomButton
                  onClick={handleClose}
                  className="flex-1 bg-transparent border border-border-600 text-white hover:bg-white/5 py-3 rounded-lg transition-colors font-medium"
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

export default AirtimeModal;
