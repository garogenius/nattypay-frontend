"use client";

import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoChevronDown, IoChevronBack } from "react-icons/io5";
import CustomButton from "@/components/shared/Button";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {
  useGetCablePlans,
  useGetCableVariations,
  useVerifyCableNumber,
  usePayForCable,
} from "@/api/cable/cable.queries";
import SpinnerLoader from "@/components/Loader/SpinnerLoader";
import { useTransactionProcessingStore } from "@/store/transactionProcessing.store";
import Image from "next/image";

interface CableTvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "provider" | "smartcard" | "bouquet" | "confirm" | "result";

const CableTvModal: React.FC<CableTvModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>("provider");
  const [providerOpen, setProviderOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<{ name: string; billerCode: string } | null>(null);
  const [smartcard, setSmartcard] = useState<string>("");
  const [selectedBouquet, setSelectedBouquet] = useState<{ name: string; amount: number; payAmount: number; itemCode: string } | null>(null);
  const [walletPin, setWalletPin] = useState<string>("");
  const [verifiedCustomer, setVerifiedCustomer] = useState<any>(null);
  const [transactionResult, setTransactionResult] = useState<any>(null);

  const providerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(providerRef, () => setProviderOpen(false));

  const { showProcessing, showSuccess, showError } = useTransactionProcessingStore();

  // Step 1: Fetch cable providers
  const { cablePlans, isPending: providersLoading } = useGetCablePlans({
    currency: "NGN",
    isEnabled: isOpen,
  });

  // Step 3: Fetch bouquets when provider is selected
  const { variations: bouquets, isLoading: bouquetsLoading } = useGetCableVariations({
    billerCode: selectedProvider?.billerCode || "",
  });

  // Step 2: Verify smartcard
  const onVerifySuccess = (data: any) => {
    const res = data?.data?.data;
    setVerifiedCustomer(res);
    setStep("bouquet");
  };

  const onVerifyError = (error: any) => {
    const msg = error?.response?.data?.message;
    showError({
      title: "Validation Failed",
      message: Array.isArray(msg) ? msg[0] : msg || "Invalid smartcard number",
    });
  };

  const { mutate: verifySmartcard, isPending: verifying } = useVerifyCableNumber(
    onVerifyError,
    onVerifySuccess
  );

  // Payment handlers
  const onPaySuccess = (data: any) => {
    showSuccess({
      title: "Payment Successful",
      message: `Successfully subscribed to ${selectedBouquet?.name}`,
    });
    setTransactionResult(data?.data?.data || data?.data);
    setStep("result");
  };

  const onPayError = (error: any) => {
    const msg = error?.response?.data?.message;
    showError({
      title: "Payment Failed",
      message: Array.isArray(msg) ? msg[0] : msg,
    });
  };

  const { mutate: payCable, isPending: paying } = usePayForCable(
    onPayError,
    onPaySuccess
  );

  const handleVerifySmartcard = () => {
    if (!selectedProvider || !smartcard || !bouquets || bouquets.length === 0) return;

    verifySmartcard({
      itemCode: bouquets[0].item_code,
      billerCode: selectedProvider.billerCode,
      billerNumber: smartcard,
    });
  };

  const handleConfirm = () => {
    if (!selectedProvider || !selectedBouquet || !walletPin) return;

    showProcessing({ title: "Processing", message: "Completing your subscription..." });

    payCable({
      billerCode: selectedProvider.billerCode,
      billerNumber: smartcard,
      itemCode: selectedBouquet.itemCode,
      currency: "NGN",
      walletPin,
      amount: Number(selectedBouquet.payAmount),
      addBeneficiary: false,
    });
  };

  const handleClose = () => {
    setStep("provider");
    setProviderOpen(false);
    setSelectedProvider(null);
    setSmartcard("");
    setSelectedBouquet(null);
    setWalletPin("");
    setVerifiedCustomer(null);
    setTransactionResult(null);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      handleClose();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="z-[999999] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 flex justify-center items-center w-full md:inset-0 h-[100dvh]">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-black/80 dark:bg-black/60" onClick={handleClose} />
      </div>

      <div className="relative mx-4 bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 w-full max-w-md rounded-2xl overflow-visible shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-2">
            {step !== "provider" && step !== "result" && (
              <button
                onClick={() => {
                  if (step === "smartcard") { setStep("provider"); setSmartcard(""); setVerifiedCustomer(null); }
                  else if (step === "bouquet") { setStep("smartcard"); setSelectedBouquet(null); }
                  else if (step === "confirm") setStep("bouquet");
                }}
                className="p-1 hover:bg-white/10 rounded transition-colors text-white/70"
              >
                <IoChevronBack className="text-xl" />
              </button>
            )}
            <div>
              <h2 className="text-white text-lg font-semibold tracking-tight">
                {step === "provider" ? "Cable TV" :
                  step === "smartcard" ? "Verify Account" :
                    step === "bouquet" ? "Select Bouquet" :
                      step === "confirm" ? "Confirm Subscription" :
                        "Transaction Success"}
              </h2>
              <p className="text-white/60 text-[13px]">
                {step === "provider" ? "Choose your TV provider" :
                  step === "smartcard" ? "Enter smartcard details" :
                    step === "bouquet" ? "Choose your plan" :
                      step === "confirm" ? "Review and confirm" :
                        "Subscription activated"}
              </p>
            </div>
          </div>
          <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded transition-colors">
            <CgClose className="text-2xl text-white/70" />
          </button>
        </div>

        <div className="px-4 pb-6 mt-3">
          {/* Step 1: Provider Selection */}
          {step === "provider" && (
            <div className="space-y-5">
              <div className="flex flex-col gap-2 relative" ref={providerRef}>
                <label className="text-white/70 text-sm font-medium px-1">Select Provider</label>
                <div
                  onClick={() => setProviderOpen(!providerOpen)}
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3.5 px-4 text-white text-sm outline-none cursor-pointer flex items-center justify-between transition-all hover:bg-white/5"
                >
                  <span className={selectedProvider ? "text-white font-medium" : "text-white/50"}>
                    {selectedProvider?.name || "Choose TV provider"}
                  </span>
                  <IoChevronDown className={`w-4 h-4 text-white/70 transition-transform ${providerOpen ? 'rotate-180' : ''}`} />
                </div>
                {providerOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-[100]">
                    <div className="bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                      {providersLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <SpinnerLoader width={24} height={24} color="#D4B139" />
                        </div>
                      ) : !cablePlans || cablePlans.length === 0 ? (
                        <div className="px-4 py-6 text-white/50 text-sm text-center">No providers available</div>
                      ) : (
                        cablePlans.map((p: any) => (
                          <button
                            key={p.billerCode || p.id}
                            onClick={() => {
                              setSelectedProvider({
                                name: p.shortName || p.planName || p.name,
                                billerCode: p.billerCode
                              });
                              setProviderOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/5 text-sm font-medium transition-colors border-b border-white/5 last:border-0"
                          >
                            {p.shortName || p.planName || p.name}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {selectedProvider && (
                <CustomButton
                  onClick={() => setStep("smartcard")}
                  className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-2xl shadow-xl shadow-[#D4B139]/20 transition-all active:scale-95"
                >
                  CONTINUE
                </CustomButton>
              )}
            </div>
          )}

          {/* Step 2: Smartcard Input & Validation */}
          {step === "smartcard" && (
            <div className="space-y-6">
              <div className="bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4B139]/10 flex items-center justify-center">
                  <span className="text-[#D4B139] text-lg font-black">📺</span>
                </div>
                <div>
                  <p className="text-white font-bold tracking-tight">{selectedProvider?.name}</p>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Selected Provider</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white/70 text-sm font-medium px-1">
                  {selectedProvider?.name?.toLowerCase().includes('startimes') ? 'IUC Number' : 'Smartcard Number'}
                </label>
                <input
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-4 px-4 text-white text-lg font-bold outline-none focus:ring-1 focus:ring-[#D4B139] transition-all"
                  placeholder="Enter number"
                  type="text"
                  inputMode="numeric"
                  value={smartcard}
                  onChange={(e) => setSmartcard(e.target.value.replace(/\D/g, ""))}
                />
              </div>

              {verifiedCustomer && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-emerald-400 text-sm font-bold">✓ Account Verified</p>
                  <p className="text-white text-sm mt-1">{verifiedCustomer.customerName || verifiedCustomer.name}</p>
                </div>
              )}

              <CustomButton
                onClick={handleVerifySmartcard}
                disabled={!smartcard || smartcard.length < 10 || verifying || !bouquets || bouquets.length === 0}
                isLoading={verifying || bouquetsLoading}
                className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-2xl shadow-xl shadow-[#D4B139]/20 transition-all active:scale-95"
              >
                {bouquetsLoading ? "LOADING..." : "VERIFY ACCOUNT"}
              </CustomButton>
            </div>
          )}

          {/* Step 3: Bouquet Selection */}
          {step === "bouquet" && (
            <div className="space-y-5">
              <div className="bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Customer</p>
                  <p className="text-white text-sm font-bold">{verifiedCustomer?.customerName || verifiedCustomer?.name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Smartcard</p>
                  <p className="text-white text-sm font-bold font-mono">{smartcard}</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white/70 text-sm font-medium px-1">Available Bouquets</label>
                <div className="grid grid-cols-1 gap-2.5 max-h-80 overflow-y-auto">
                  {bouquets && bouquets.length > 0 ? (
                    bouquets.map((item: any, index: number) => (
                      <button
                        key={item.item_code || index}
                        onClick={() => {
                          setSelectedBouquet({
                            name: String(item.biller_name || item.short_name || item.name || item.item_name),
                            amount: Number(item.amount) || 0,
                            payAmount: typeof item.payAmount === 'number' ? item.payAmount : Number(item.amount) || 0,
                            itemCode: item.item_code || item.itemCode,
                          });
                        }}
                        className={`flex items-center justify-between p-4 text-left border rounded-xl transition-all ${selectedBouquet?.itemCode === (item.item_code || item.itemCode)
                            ? "bg-[#D4B139] text-black border-[#D4B139]"
                            : "border-border-600 text-white hover:bg-white/5"
                          }`}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-bold">{String(item.biller_name || item.short_name || item.name || item.item_name)}</p>
                          {item.validity_period && (
                            <p className="text-xs opacity-70 mt-0.5">{String(item.validity_period)} Days</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-black text-base">
                            ₦{new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(Number(item.amount))}
                          </p>
                          {item.payAmount && item.payAmount - item.amount > 0 && (
                            <p className="text-xs opacity-70">+₦{item.payAmount - item.amount} fee</p>
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-white/50 text-sm text-center">No bouquets available</div>
                  )}
                </div>
              </div>

              {selectedBouquet && (
                <CustomButton
                  onClick={() => setStep("confirm")}
                  className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-2xl shadow-xl shadow-[#D4B139]/20 transition-all active:scale-95"
                >
                  PROCEED TO PAY
                </CustomButton>
              )}
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === "confirm" && (
            <div className="space-y-6 pt-2">
              <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 bg-white/5 border-b border-white/5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Provider</span>
                    <span className="text-white text-sm font-bold">{selectedProvider?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Smartcard</span>
                    <span className="text-white text-sm font-mono font-bold">{smartcard}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Customer</span>
                    <span className="text-white text-sm font-bold">{verifiedCustomer?.customerName || verifiedCustomer?.name}</span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-sm font-medium">Bouquet</span>
                    <span className="text-white text-sm font-bold">{selectedBouquet?.name}</span>
                  </div>
                  <div className="pt-2 border-t border-white/5 flex justify-between items-end">
                    <span className="text-white/70 font-black uppercase text-[10px] tracking-widest pb-1">Total Amount</span>
                    <span className="text-[#D4B139] text-3xl font-black tracking-tight">₦{Number(selectedBouquet?.payAmount || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 px-1">
                <label className="text-white/60 text-sm font-medium text-center block tracking-tight">Transaction PIN</label>
                <input
                  type="password"
                  maxLength={4}
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3.5 px-4 text-white text-center text-2xl tracking-[1em] outline-none focus:border-[#D4B139] shadow-inner"
                  value={walletPin}
                  onChange={(e) => setWalletPin(e.target.value.replace(/\D/g, ""))}
                  placeholder="****"
                />
              </div>

              <div className="flex gap-4">
                <CustomButton
                  onClick={() => setStep("bouquet")}
                  className="flex-1 bg-transparent border border-border-600 text-white hover:bg-white/5 py-3 rounded-xl font-bold transition-all"
                >
                  Back
                </CustomButton>
                <CustomButton
                  onClick={handleConfirm}
                  disabled={walletPin.length !== 4 || paying}
                  isLoading={paying}
                  className="flex-1 bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-3 rounded-xl"
                >
                  Pay Now
                </CustomButton>
              </div>
            </div>
          )}

          {/* Step 5: Result */}
          {step === "result" && (
            <div className="py-6 text-center space-y-6 animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-500/10 border-4 border-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/10 transition-transform scale-110">
                <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="space-y-2">
                <h3 className="text-emerald-400 text-2xl font-black tracking-tight">Subscription Successful</h3>
                <p className="text-white/40 text-sm font-medium">Your subscription is now active</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/5 divide-y divide-white/5 space-y-3 text-left">
                <div className="flex justify-between items-center pb-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Provider</span>
                  <span className="text-white text-xs font-black">{selectedProvider?.name}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Bouquet</span>
                  <span className="text-white text-xs font-black">{selectedBouquet?.name}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Smartcard</span>
                  <span className="text-white/80 text-[10px] font-mono tracking-tighter">{smartcard}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Reference</span>
                  <span className="text-white/80 text-[10px] font-mono tracking-tighter">{transactionResult?.reference || transactionResult?.transactionRef || "-"}</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Amount Paid</span>
                  <span className="text-[#D4B139] text-xl font-black tracking-tight">₦{Number(selectedBouquet?.payAmount || 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <CustomButton className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-2xl shadow-xl shadow-[#D4B139]/10 transition-all active:scale-95">
                  DOWNLOAD RECEIPT
                </CustomButton>
                <button onClick={handleClose} className="w-full py-2 text-white/40 hover:text-white font-black text-[10px] uppercase tracking-[0.3em] transition-colors">
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CableTvModal;
