"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CgClose } from "react-icons/cg";
import Image from "next/image";
import CustomButton from "@/components/shared/Button";
import { useGetAirtimeNetWorkProvider, usePayForAirtime } from "@/api/airtime/airtime.queries";
import { NetworkProvider } from "@/components/user/bill/bill.data";
import { handleInput } from "@/utils/utilityFunctions";
import SpinnerLoader from "@/components/Loader/SpinnerLoader";
import { useTransactionProcessingStore } from "@/store/transactionProcessing.store";

interface AirtimeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AirtimeModal: React.FC<AirtimeModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"form" | "confirm" | "result">("form");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [walletPin, setWalletPin] = useState("");
  const [operatorId, setOperatorId] = useState<number | undefined>();
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [transactionResult, setTransactionResult] = useState<any>(null);
  const [addBeneficiary, setAddBeneficiary] = useState(false);

  const { showProcessing, showSuccess, showError } = useTransactionProcessingStore();

  const { data: networkProviders, isPending: providersLoading } = useGetAirtimeNetWorkProvider();

  // Tier 1: Prefix Mapping
  const prefixMap: Record<string, string[]> = {
    MTN: ["0803", "0806", "0703", "0706", "0813", "0816", "0810", "0814", "0903", "0906", "0913", "0916", "07025", "07026", "0704"],
    AIRTEL: ["0802", "0808", "0708", "0812", "0902", "0907", "0901", "0904", "0701", "0912"],
    GLO: ["0805", "0807", "0705", "0815", "0811", "0905", "0915", "08070", "08050"],
    "9MOBILE": ["0809", "0817", "0818", "0909", "0908"],
  };

  // Tier 3: Hardcoded Fallback IDs
  const fallbackOperatorIds: Record<string, number> = {
    MTN: 341,
    AIRTEL: 342,
    GLO: 344,
    "9MOBILE": 340,
  };

  const cleanedPhone = phone.replace(/\D/g, "");

  // Tier 2: Dynamic Operator ID Matching from API
  const apiProviderMap = useMemo(() => {
    // Extract billers from response (Handling potential nested structures)
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
          operatorId: Number(item?.billerId || item?.operatorId),
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
    // Detection happens as user types, must complete by 10-11 digits
    if (cleanedPhone.length >= 4) {
      // Normalize to domestic format for prefix check
      let phoneForPrefix = cleanedPhone;
      if (phoneForPrefix.startsWith('234')) {
        phoneForPrefix = '0' + phoneForPrefix.slice(3);
      }

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
        // Resolve Operator ID using Tiered Strategy
        const apiData = apiProviderMap[detectedName];
        // Tier 2 -> Tier 3 Fallback
        const resolvedOperatorId = apiData?.operatorId || fallbackOperatorIds[detectedName];

        setOperatorId(resolvedOperatorId);

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

  const onPaySuccess = (data: any) => {
    setTransactionResult({ success: true, data: data?.data });
    setStep("result");
    showSuccess({ title: "Payment Successful", message: "Airtime purchase completed." });
  };

  const onPayError = (error: any) => {
    const errorMessage = error?.response?.data?.message || "Airtime purchase failed.";
    setTransactionResult({ success: false, error: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage });
    setStep("result");
    showError({ title: "Payment Failed", message: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage });
  };

  const { mutate: PayForAirtime, isPending: airtimeLoading } = usePayForAirtime(onPayError, onPaySuccess);

  const handleClose = () => {
    setStep("form");
    setPhone("");
    setAmount("");
    setWalletPin("");
    setOperatorId(undefined);
    setSelectedProvider(null);
    setTransactionResult(null);
    onClose();
  };

  // Ensure canProceed is robust: valid phone length, resolved operator, and amount > 0
  const canProceed = cleanedPhone.length >= 10 && operatorId && Number(amount) > 0;

  const handleConfirmPayment = () => {
    if (!operatorId) return;

    // Formatting phone: Ensure 11 digits starting with 0
    let phoneToPay = cleanedPhone;
    if (phoneToPay.startsWith("234")) {
      phoneToPay = "0" + phoneToPay.slice(3);
    } else if (phoneToPay.length === 10 && !phoneToPay.startsWith("0")) {
      phoneToPay = "0" + phoneToPay;
    } else if (phoneToPay.length > 11) {
      phoneToPay = "0" + phoneToPay.slice(-10);
    }

    const payload = {
      phone: phoneToPay,
      amount: Number(amount),
      operatorId: Number(operatorId),
      currency: "NGN",
      walletPin: walletPin,
      addBeneficiary: addBeneficiary,
    };

    showProcessing({ title: "Processing Payment", message: "Please wait..." });
    PayForAirtime(payload);
  };

  if (!isOpen) return null;

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

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
              {step === "form" ? "Buy Airtime" : step === "confirm" ? "Confirm Airtime" : transactionResult?.success ? "Transaction History" : "Payment Failed"}
            </h2>
            <p className="text-white/60 text-sm">
              {step === "form" ? "Enter payment details to continue" : step === "confirm" ? "Confirm transaction details" : transactionResult?.success ? "View complete information about this transaction" : ""}
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

              {/* Detected Network (Locked) */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm">Detected Network</label>
                <div className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-4 text-white text-sm flex items-center justify-between opacity-90">
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

              {/* Amount Selection */}
              <div className="flex flex-col gap-3">
                <label className="text-white/70 text-sm">Select or Enter Amount</label>
                <div className="grid grid-cols-3 gap-2">
                  {quickAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(String(amt))}
                      className={`py-2 px-1 rounded-lg border text-sm transition-colors ${amount === String(amt) ? "bg-[#D4B139] border-[#D4B139] text-black font-semibold" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}`}
                    >
                      ₦{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-4 text-white placeholder:text-white/60 text-sm outline-none focus:ring-1 focus:ring-[#D4B139] transition-all"
                  placeholder="Enter custom amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              {/* Add Beneficiary Toggle */}
              <div className="flex items-center justify-between px-1">
                <span className="text-white/70 text-sm">Save as Beneficiary</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={addBeneficiary}
                    onChange={(e) => setAddBeneficiary(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4B139]"></div>
                </label>
              </div>

              <CustomButton
                type="button"
                disabled={!canProceed}
                className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-semibold py-3.5 rounded-xl mt-2 transition-all active:scale-95"
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
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-white/60 text-sm font-medium">Total Amount</span>
                  <span className="text-[#D4B139] text-lg font-bold">₦{Number(amount).toLocaleString()}.00</span>
                </div>
              </div>

              {/* PIN Input */}
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
                <p className="text-center text-white/40 text-[10px] uppercase tracking-wider">Enter your 4-digit security pin</p>
              </div>

              <div className="flex gap-4 mt-2">
                <CustomButton onClick={() => setStep("form")} className="flex-1 bg-transparent border border-border-600 text-white hover:bg-white/5 py-3 rounded-lg">
                  Back
                </CustomButton>
                <CustomButton
                  onClick={handleConfirmPayment}
                  disabled={walletPin.length !== 4 || airtimeLoading}
                  isLoading={airtimeLoading}
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
                  <p className="text-white text-3xl font-bold mt-2">₦{Number(amount).toLocaleString()}.00</p>
                )}
                {!transactionResult?.success && (
                  <p className="text-white/60 text-sm mt-2 max-w-xs">{transactionResult?.error || 'Your transaction could not be processed at this time. Please try again later.'}</p>
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
                    <span className="text-white/60">Reference</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-xs">{transactionResult?.data?.transactionRef || transactionResult?.data?.transactionId || '---'}</span>
                      <button onClick={() => navigator.clipboard.writeText(transactionResult?.data?.transactionRef || transactionResult?.data?.transactionId || '')} className="text-[#D4B139] hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Status</span>
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] uppercase font-bold">Completed</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-4 w-full">
                <CustomButton onClick={handleClose} className="flex-1 bg-transparent border border-border-600 text-white hover:bg-white/5 py-3 rounded-lg text-sm">
                  Contact Support
                </CustomButton>
                {transactionResult?.success ? (
                  <CustomButton onClick={handleClose} className="flex-1 bg-[#D4B139] hover:bg-[#D4B139]/90 text-black py-3 rounded-lg font-semibold text-sm">
                    Download Receipt
                  </CustomButton>
                ) : (
                  <CustomButton
                    onClick={() => { setStep("form"); setTransactionResult(null); }}
                    className="flex-1 bg-[#D4B139] hover:bg-[#D4B139]/90 text-black py-3 rounded-lg font-semibold text-sm"
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
