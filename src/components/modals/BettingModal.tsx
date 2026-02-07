"use client";

import React, { useMemo, useState } from "react";
import { CgClose } from "react-icons/cg";
import CustomButton from "@/components/shared/Button";
import { useGetBettingPlatforms, useFundBettingPlatform } from "@/api/betting/betting.queries";
import { handleNumericKeyDown, handleNumericPaste } from "@/utils/utilityFunctions";
import SpinnerLoader from "@/components/Loader/SpinnerLoader";
import { useTransactionProcessingStore } from "@/store/transactionProcessing.store";
import { IBettingPlatform } from "@/api/betting/betting.types";

interface BettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BettingModal: React.FC<BettingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"form" | "confirm" | "result">("form");
  const [selectedPlatform, setSelectedPlatform] = useState<IBettingPlatform | null>(null);
  const [platformUserId, setPlatformUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [walletPin, setWalletPin] = useState("");
  const [transactionResult, setTransactionResult] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { showProcessing, showSuccess, showError } = useTransactionProcessingStore();

  const { data: platformsData, isPending: platformsLoading } = useGetBettingPlatforms();

  const platforms = useMemo(() => {
    const responseData = platformsData?.data?.data;
    if (responseData && Array.isArray(responseData.billers)) {
      return responseData.billers;
    }
    if (Array.isArray(responseData)) {
      return responseData;
    }
    return [];
  }, [platformsData]);

  const filteredPlatforms = useMemo(() => {
    if (!searchTerm) return platforms;
    return platforms.filter((p) =>
      p.billerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.billerCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [platforms, searchTerm]);

  const onPaySuccess = (data: any) => {
    setTransactionResult({ success: true, data: data?.data });
    setStep("result");
    showSuccess({ title: "Payment Successful", message: "Betting account funded successfully." });
  };

  const onPayError = (error: any) => {
    const errorMessage = error?.response?.data?.message || "Betting funding failed.";
    setTransactionResult({
      success: false,
      error: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage
    });
    setStep("result");
    showError({
      title: "Payment Failed",
      message: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage
    });
  };

  const { mutate: fundPlatform, isPending: subLoading } = useFundBettingPlatform(onPayError, onPaySuccess);

  const handleClose = () => {
    setStep("form");
    setSelectedPlatform(null);
    setPlatformUserId("");
    setAmount("");
    setWalletPin("");
    setTransactionResult(null);
    setSearchTerm("");
    onClose();
  };

  const canProceed = platformUserId && selectedPlatform && amount && Number(amount) >= 100;

  const handleConfirmPayment = () => {
    if (!selectedPlatform) return;

    const payload = {
      platform: selectedPlatform.billerCode,
      platformUserId: platformUserId,
      amount: Number(amount),
      currency: "NGN",
      walletPin: walletPin,
      description: `Funding ${selectedPlatform.billerName} account`,
    };

    showProcessing({ title: "Processing Payment", message: "Please wait..." });
    fundPlatform(payload);
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
              {step === "form" ? "Fund Betting Account" : step === "confirm" ? "Confirm Payment" : transactionResult?.success ? "Payment Receipt" : "Payment Failed"}
            </h2>
            <p className="text-white/60 text-sm">
              {step === "form" ? "Select platform and enter details" : step === "confirm" ? "Review payment details" : transactionResult?.success ? "Your transaction was successful" : ""}
            </p>
          </div>
          <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded transition-colors">
            <CgClose className="text-xl text-white/70" />
          </button>
        </div>

        <div className="px-4 pb-4">
          {step === "form" && (
            <div className="flex flex-col gap-4">
              {/* Platform Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm">Betting Platform</label>
                {platformsLoading ? (
                  <div className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-4 flex items-center gap-2">
                    <SpinnerLoader width={16} height={16} color="#D4B139" />
                    <span className="text-white/60 text-sm">Loading platforms...</span>
                  </div>
                ) : selectedPlatform ? (
                  <div className="w-full bg-[#D4B139]/10 border border-[#D4B139]/30 rounded-lg p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4B139]/20 flex items-center justify-center text-[#D4B139] font-bold">
                        {selectedPlatform.billerName.charAt(0)}
                      </div>
                      <span className="text-white font-medium text-sm">{selectedPlatform.billerName}</span>
                    </div>
                    <button
                      onClick={() => setSelectedPlatform(null)}
                      className="p-2 hover:bg-white/10 rounded-full transition-all text-white/60 hover:text-white"
                    >
                      <CgClose className="text-xl" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <input
                      className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-4 text-white text-sm outline-none focus:ring-1 focus:ring-[#D4B139]/50 transition-all placeholder:text-white/30"
                      placeholder="Search platforms (e.g. Bet9ja, SportyBet...)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="w-full max-h-[200px] overflow-y-auto bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg custom-scrollbar divide-y divide-white/5">
                      {filteredPlatforms.length > 0 ? (
                        filteredPlatforms.map((p, i) => (
                          <div
                            key={i}
                            onClick={() => setSelectedPlatform(p)}
                            className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 font-bold text-xs">
                              {p.billerName.charAt(0)}
                            </div>
                            <span className="text-[13px] text-white/80">{p.billerName}</span>
                          </div>
                        ))
                      ) : (
                        <div className="py-8 text-center text-white/30 text-xs italic">No platforms found</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User ID Input */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm">Platform User ID</label>
                <input
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-4 text-white placeholder:text-white/60 text-sm outline-none focus:ring-1 focus:ring-[#D4B139] transition-all"
                  placeholder="Enter your betting user ID"
                  value={platformUserId}
                  onChange={(e) => setPlatformUserId(e.target.value)}
                />
              </div>

              {/* Amount Input */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-sm">₦</span>
                  <input
                    className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 pl-8 pr-4 text-white placeholder:text-white/30 text-sm outline-none focus:ring-1 focus:ring-[#D4B139] transition-all"
                    placeholder="Enter amount (Min ₦100)"
                    type="number"
                    min="100"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onKeyDown={handleNumericKeyDown}
                    onPaste={handleNumericPaste}
                  />
                </div>
                <p className="text-[#D4B139] text-[10px] font-bold uppercase tracking-widest px-1">Minimum amount is ₦100</p>
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
                  <span className="text-white/60 text-sm">Platform</span>
                  <span className="text-white text-sm font-medium">{selectedPlatform?.billerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">User ID</span>
                  <span className="text-white text-sm font-medium">{platformUserId}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-white/60 text-sm font-medium">Total Amount</span>
                  <span className="text-[#D4B139] text-lg font-bold">₦{Number(amount).toLocaleString()}.00</span>
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
                  <p className="text-white text-3xl font-bold mt-2">₦{Number(amount).toLocaleString()}.00</p>
                )}
                {!transactionResult?.success && (
                  <p className="text-white/60 text-sm mt-2 max-w-xs">{transactionResult?.error || 'Your transaction could not be processed.'}</p>
                )}
              </div>

              {transactionResult?.success && (
                <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Platform</span>
                    <span className="text-white font-medium">{selectedPlatform?.billerName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">User ID</span>
                    <span className="text-white font-medium">{platformUserId}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Reference</span>
                    <span className="text-white font-mono text-xs">{transactionResult?.data?.transactionRef || transactionResult?.data?.transactionId || '---'}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-4 w-full">
                <CustomButton onClick={handleClose} className="flex-1 bg-transparent border border-border-600 text-white hover:bg-white/5 py-3 rounded-lg text-sm">Close</CustomButton>
                {!transactionResult?.success && (
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

export default BettingModal;
