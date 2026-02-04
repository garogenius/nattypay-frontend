"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CgClose } from "react-icons/cg";
import Image from "next/image";
import CustomButton from "@/components/shared/Button";
import { useGetNetworkProviders, useGetDataVariation, usePayForData } from "@/api/data/data.queries";
import { NetworkProvider } from "@/components/user/bill/bill.data";
import { handleInput } from "@/utils/utilityFunctions";
import SpinnerLoader from "@/components/Loader/SpinnerLoader";
import { useTransactionProcessingStore } from "@/store/transactionProcessing.store";

interface MobileDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDataModal: React.FC<MobileDataModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"form" | "confirm" | "result">("form");
  const [phone, setPhone] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [walletPin, setWalletPin] = useState("");
  const [operatorId, setOperatorId] = useState<number | undefined>();
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [transactionResult, setTransactionResult] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { showProcessing, showSuccess, showError } = useTransactionProcessingStore();

  const { data: networkProviders, isPending: providersLoading } = useGetNetworkProviders();

  // Tier 1: Prefix Mapping (Reuse from Airtime logic)
  const prefixMap: Record<string, string[]> = {
    MTN: ["0803", "0806", "0703", "0706", "0813", "0816", "0810", "0814", "0903", "0906", "0913", "0916", "07025", "07026", "0704"],
    AIRTEL: ["0802", "0808", "0708", "0812", "0902", "0907", "0901", "0904", "0701", "0912"],
    GLO: ["0805", "0807", "0705", "0815", "0811", "0905", "0915", "08070", "08050"],
    "9MOBILE": ["0809", "0817", "0818", "0909", "0908"],
  };

  // Tier 3: Hardcoded Fallback IDs for Data
  const fallbackOperatorIds: Record<string, number> = {
    MTN: 345,
    "9MOBILE": 645,
    AIRTEL: 646,
    GLO: 931,
  };

  const cleanedPhone = phone.replace(/\D/g, "");

  // Tier 2: Dynamic Operator ID Matching from API
  const apiProviderMap = useMemo(() => {
    const rawData = networkProviders?.data?.data || networkProviders?.data || [];
    const providersArray = Array.isArray(rawData?.billers) ? rawData.billers : Array.isArray(rawData) ? rawData : [];

    const map: Record<string, any> = {};
    providersArray.forEach((item: any) => {
      const name = (item?.billerName || item?.network || "").toUpperCase();
      let normalizedName = "";
      if (name.includes("MTN")) normalizedName = "MTN";
      else if (name.includes("AIRTEL")) normalizedName = "AIRTEL";
      else if (name.includes("GLO")) normalizedName = "GLO";
      else if (name.includes("9MOBILE") || name.includes("9 MOBILE")) normalizedName = "9MOBILE";

      if (normalizedName) {
        map[normalizedName] = {
          operatorId: Number(item?.billerId || item?.operatorId || item?.id),
          logo: item?.billerIcon,
          name: normalizedName,
          label: item?.billerName
        };
      }
    });
    return map;
  }, [networkProviders]);

  // Network Detection Flow
  useEffect(() => {
    // Detection happens as user types, normalized to domestic format handled later
    if (cleanedPhone.length >= 4) {
      // Normalize international to domestic for prefix check
      let phoneForPrefix = cleanedPhone;
      if (phoneForPrefix.startsWith('234')) phoneForPrefix = '0' + phoneForPrefix.slice(3);

      const prefix = phoneForPrefix.startsWith('0')
        ? phoneForPrefix.substring(0, 4)
        : '0' + phoneForPrefix.substring(0, 3);

      let detectedName = "";
      for (const [name, prefixes] of Object.entries(prefixMap)) {
        if (prefixes.includes(prefix)) {
          detectedName = name;
          break;
        }
      }

      if (detectedName) {
        const apiData = apiProviderMap[detectedName];
        const resolvedOperatorId = apiData?.operatorId || fallbackOperatorIds[detectedName];

        if (operatorId !== resolvedOperatorId) {
          setOperatorId(resolvedOperatorId);
          setSelectedPlan(null); // Reset plan when network changes
        }

        const providerBase = NetworkProvider.find(p => p.name === detectedName);
        setSelectedProvider({
          name: detectedName,
          logo: apiData?.logo || providerBase?.logo,
          label: apiData?.label || detectedName
        });
      } else {
        setOperatorId(undefined);
        setSelectedProvider(null);
      }
    } else {
      setOperatorId(undefined);
      setSelectedProvider(null);
    }
  }, [cleanedPhone, apiProviderMap]);

  // Fetch variations immediately once operatorId is resolved
  const { data: variations, isLoading: plansLoading } = useGetDataVariation({
    operatorId: operatorId || 0
  });

  const filteredVariations = useMemo(() => {
    if (!variations) return [];
    if (!searchTerm) return variations;
    return variations.filter((v: any) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.amount.includes(searchTerm)
    );
  }, [variations, searchTerm]);

  const onPaySuccess = (data: any) => {
    setTransactionResult({ success: true, data: data?.data });
    setStep("result");
    showSuccess({ title: "Payment Successful", message: "Mobile data purchase completed." });
  };

  const onPayError = (error: any) => {
    const errorMessage = error?.response?.data?.message || "Mobile data purchase failed.";
    setTransactionResult({ success: false, error: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage });
    setStep("result");
    showError({ title: "Payment Failed", message: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage });
  };

  const { mutate: PayForData, isPending: subLoading } = usePayForData(onPayError, onPaySuccess);

  const handleClose = () => {
    setStep("form");
    setPhone("");
    setSelectedPlan(null);
    setWalletPin("");
    setOperatorId(undefined);
    setSelectedProvider(null);
    setTransactionResult(null);
    setSearchTerm("");
    onClose();
  };

  const canProceed = cleanedPhone.length >= 10 && operatorId && selectedPlan;

  const handleConfirmPayment = () => {
    if (!operatorId || !selectedPlan) return;

    // Normalize phone to domestic format (11 digits starting with 0)
    let phoneToPay = cleanedPhone;
    if (phoneToPay.startsWith("234")) phoneToPay = "0" + phoneToPay.slice(3);
    else if (phoneToPay.length === 10 && !phoneToPay.startsWith("0")) phoneToPay = "0" + phoneToPay;
    else if (phoneToPay.length > 11) phoneToPay = "0" + phoneToPay.slice(-10);

    const payload = {
      phoneNumber: phoneToPay,
      amount: Number(selectedPlan.amount),
      network: selectedProvider?.name,
      currency: "NGN",
      walletPin: walletPin,
    };

    showProcessing({ title: "Processing Payment", message: "Please wait..." });
    PayForData(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="z-[999999] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 flex justify-center items-center w-full md:inset-0 h-[100dvh]">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-black/80 dark:bg-black/60" onClick={handleClose}></div>
      </div>
      <div className="relative mx-4 bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 w-full max-w-md rounded-2xl overflow-visible">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-2">
          <div>
            <h2 className="text-white text-lg font-semibold">
              {step === "form" ? "Buy Mobile Data" : step === "confirm" ? "Confirm Data" : transactionResult?.success ? "Transaction History" : "Payment Failed"}
            </h2>
            <p className="text-white/60 text-sm">
              {step === "form" ? "Enter details to subscribe" : step === "confirm" ? "Confirm subscription details" : transactionResult?.success ? "View complete information about this transaction" : ""}
            </p>
          </div>
          <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded transition-colors">
            <CgClose className="text-xl text-white/70" />
          </button>
        </div>

        <div className="px-4 pb-4">
          {step === "form" && (
            <div className="flex flex-col gap-4">
              {/* Phone Input */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm">Phone Number</label>
                <input
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-4 text-white placeholder:text-white/60 text-sm outline-none focus:ring-1 focus:ring-[#D4B139] transition-all"
                  placeholder="0803 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onInput={handleInput}
                  maxLength={11}
                />
              </div>

              {/* Detected Network */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm">Detected Network</label>
                <div className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-4 text-white text-sm flex items-center justify-between">
                  {providersLoading ? (
                    <div className="flex items-center gap-2 text-white/70">
                      <SpinnerLoader width={16} height={16} color="#D4B139" />
                      <span>Fetching networks...</span>
                    </div>
                  ) : selectedProvider ? (
                    <div className="flex items-center gap-3">
                      {selectedProvider.logo && (
                        <Image src={selectedProvider.logo} alt={selectedProvider.name} width={24} height={24} className="rounded-full h-6 w-6 object-contain" />
                      )}
                      <span className="font-medium text-white">{selectedProvider.label}</span>
                    </div>
                  ) : (
                    <span className="text-white/50">Enter phone number to detect network</span>
                  )}
                  {selectedProvider && <div className="text-[#D4B139]"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>}
                </div>
              </div>

              {/* Plan Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm">Select Data Plan</label>
                {!operatorId ? (
                  <div className="w-full bg-white/5 border border-dashed border-white/10 rounded-lg py-8 text-center text-white/40 text-xs">
                    Please provide a phone number to load plans
                  </div>
                ) : plansLoading ? (
                  <div className="w-full bg-white/5 border border-white/10 rounded-lg py-8 flex flex-col items-center gap-2">
                    <SpinnerLoader width={24} height={24} color="#D4B139" />
                    <span className="text-white/60 text-xs">Loading Plans...</span>
                  </div>
                ) : selectedPlan ? (
                  <div className="w-full bg-[#D4B139]/10 border border-[#D4B139]/30 rounded-lg p-4 flex items-center justify-between group">
                    <div className="flex flex-col gap-1">
                      <span className="text-white font-medium text-sm">{selectedPlan.name}</span>
                      <span className="text-[#D4B139] font-bold text-lg">₦{Number(selectedPlan.amount).toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => setSelectedPlan(null)}
                      className="p-2 hover:bg-white/10 rounded-full transition-all text-white/60 hover:text-white"
                    >
                      <CgClose className="text-xl" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <input
                      className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-t-lg py-2.5 px-4 text-white text-sm outline-none focus:ring-1 focus:ring-[#D4B139]/50 transition-all placeholder:text-white/30"
                      placeholder="Search plans (e.g. 1GB, Monthly...)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="w-full max-h-[200px] overflow-y-auto bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-b-lg border-t-0 custom-scrollbar divide-y divide-white/5">
                      {filteredVariations.length > 0 ? (
                        filteredVariations.map((v: any, i: number) => (
                          <div
                            key={i}
                            onClick={() => setSelectedPlan(v)}
                            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                          >
                            <span className="text-[13px] text-white/80">{v.name}</span>
                            <span className="text-[#D4B139] font-bold text-sm">₦{Number(v.amount).toLocaleString()}</span>
                          </div>
                        ))
                      ) : (
                        <div className="py-8 text-center text-white/30 text-xs italic">No plans found matching your search</div>
                      )}
                    </div>
                  </div>
                )}
              </div>


              <CustomButton
                type="button"
                disabled={!canProceed}
                className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-semibold py-3.5 rounded-xl mt-2 transition-all"
                onClick={() => setStep("confirm")}
              >
                Continue
              </CustomButton>
            </div>
          )}

          {step === "confirm" && (
            <div className="flex flex-col gap-6 pt-2">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Network</span>
                  <div className="flex items-center gap-2">
                    {selectedProvider?.logo && <Image src={selectedProvider.logo} alt="" width={16} height={16} className="rounded-full" />}
                    <span className="text-white text-sm font-medium">{selectedProvider?.label}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Phone Number</span>
                  <span className="text-white text-sm font-medium">{phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Data Plan</span>
                  <span className="text-white text-xs font-medium max-w-[200px] text-right">{selectedPlan?.name}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-white/60 text-sm font-medium">Total Amount</span>
                  <span className="text-[#D4B139] text-lg font-bold">₦{Number(selectedPlan?.amount).toLocaleString()}.00</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/60 text-sm">Transaction PIN</label>
                <input
                  type="password"
                  maxLength={4}
                  value={walletPin}
                  onChange={(e) => setWalletPin(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-4 text-white text-center text-xl tracking-[1em] outline-none focus:border-[#D4B139]"
                  placeholder="****"
                />
              </div>

              <div className="flex gap-4 mt-2">
                <CustomButton onClick={() => setStep("form")} className="flex-1 bg-transparent border border-border-600 text-white hover:bg-white/5 py-3 rounded-lg">Back</CustomButton>
                <CustomButton
                  onClick={handleConfirmPayment}
                  disabled={walletPin.length !== 4 || subLoading}
                  isLoading={subLoading}
                  className="flex-1 bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-semibold py-3 rounded-lg"
                >
                  Pay Now
                </CustomButton>
              </div>
            </div>
          )}

          {step === "result" && (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: transactionResult?.success ? '#22c55e' : '#ef4444' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {transactionResult?.success ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  )}
                </svg>
              </div>

              <div className="text-center">
                <h3 className={`text-xl font-bold ${transactionResult?.success ? 'text-emerald-400' : 'text-red-400'}`}>
                  {transactionResult?.success ? 'Payment Successful' : 'Payment Failed'}
                </h3>
                {transactionResult?.success && (
                  <p className="text-white text-3xl font-bold mt-2">₦{Number(selectedPlan?.amount).toLocaleString()}.00</p>
                )}
                {!transactionResult?.success && (
                  <p className="text-white/60 text-sm mt-2 max-w-xs">{transactionResult?.error || 'Your transaction could not be processed.'}</p>
                )}
              </div>

              {transactionResult?.success && (
                <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Network</span>
                    <span className="text-white font-medium">{selectedProvider?.label}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Recipient</span>
                    <span className="text-white font-medium">{phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Plan</span>
                    <span className="text-white font-medium text-right text-xs max-w-[150px]">{selectedPlan?.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Reference</span>
                    <span className="text-white font-mono text-xs">{transactionResult?.data?.transactionRef || transactionResult?.data?.transactionId || '---'}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-4 w-full">
                <CustomButton onClick={handleClose} className="flex-1 bg-transparent border border-border-600 text-white hover:bg-white/5 py-3 rounded-lg text-sm">Contact Support</CustomButton>
                {transactionResult?.success ? (
                  <CustomButton onClick={handleClose} className="flex-1 bg-[#D4B139] hover:bg-[#D4B139]/90 text-black py-3 rounded-lg font-semibold text-sm">Download Receipt</CustomButton>
                ) : (
                  <CustomButton onClick={() => { setStep("form"); setTransactionResult(null); }} className="flex-1 bg-[#D4B139] hover:bg-[#D4B139]/90 text-black py-3 rounded-lg font-semibold text-sm">Try Again</CustomButton>
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
