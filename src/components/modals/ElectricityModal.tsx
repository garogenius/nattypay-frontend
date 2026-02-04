"use client";

import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoChevronDown, IoChevronBack } from "react-icons/io5";
import CustomButton from "@/components/shared/Button";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {
  useGetElectricityPlans,
  useGetElectricityVariations,
  useVerifyElectricityNumber,
  usePayForElectricity,
} from "@/api/electricity/electricity.queries";
import SpinnerLoader from "@/components/Loader/SpinnerLoader";
import { useTransactionProcessingStore } from "@/store/transactionProcessing.store";

interface ElectricityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "provider" | "meterType" | "meterNumber" | "amount" | "confirm" | "result";

const ElectricityModal: React.FC<ElectricityModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>("provider");
  const [providerOpen, setProviderOpen] = useState(false);
  const [meterTypeOpen, setMeterTypeOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<{ name: string; billerCode: string } | null>(null);
  const [selectedMeterType, setSelectedMeterType] = useState<{ name: string; itemCode: string; fee: number } | null>(null);
  const [meterNumber, setMeterNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [walletPin, setWalletPin] = useState<string>("");
  const [verifiedCustomer, setVerifiedCustomer] = useState<any>(null);
  const [transactionResult, setTransactionResult] = useState<any>(null);

  const providerRef = useRef<HTMLDivElement>(null);
  const meterTypeRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(providerRef, () => setProviderOpen(false));
  useOnClickOutside(meterTypeRef, () => setMeterTypeOpen(false));

  const { showProcessing, showSuccess, showError } = useTransactionProcessingStore();

  // Step 1: Fetch electricity providers
  const { electricityPlans, isPending: providersLoading } = useGetElectricityPlans({
    currency: "NGN",
    isEnabled: isOpen,
  });

  // Step 2: Fetch meter types when provider is selected
  const { variations: meterTypes, isLoading: meterTypesLoading } = useGetElectricityVariations({
    billerCode: selectedProvider?.billerCode || "",
  });

  // Step 3: Verify meter number
  const onVerifySuccess = (data: any) => {
    const res = data?.data?.data;
    setVerifiedCustomer(res);
    setStep("amount");
  };

  const onVerifyError = (error: any) => {
    const msg = error?.response?.data?.message;
    showError({
      title: "Validation Failed",
      message: Array.isArray(msg) ? msg[0] : msg || "Invalid meter number",
    });
  };

  const { mutate: verifyMeter, isPending: verifying } = useVerifyElectricityNumber(
    onVerifyError,
    onVerifySuccess
  );

  // Payment handlers
  const onPaySuccess = (data: any) => {
    const isPrepaid = selectedMeterType?.name?.toLowerCase().includes('prepaid');
    showSuccess({
      title: "Payment Successful",
      message: isPrepaid ? "Token will be sent shortly" : "Payment confirmed",
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

  const { mutate: payElectricity, isPending: paying } = usePayForElectricity(
    onPayError,
    onPaySuccess
  );

  const handleVerifyMeter = () => {
    if (!selectedProvider || !selectedMeterType || !meterNumber) return;

    verifyMeter({
      itemCode: selectedMeterType.itemCode,
      billerCode: selectedProvider.billerCode,
      billerNumber: meterNumber,
    });
  };

  const handleConfirm = () => {
    if (!selectedProvider || !selectedMeterType || !walletPin || !amount) return;

    const totalAmount = Number(amount) + (selectedMeterType.fee || 0);

    showProcessing({ title: "Processing", message: "Completing your payment..." });

    payElectricity({
      amount: totalAmount,
      itemCode: selectedMeterType.itemCode,
      billerCode: selectedProvider.billerCode,
      billerNumber: meterNumber,
      currency: "NGN",
      walletPin,
      addBeneficiary: false,
    });
  };

  const handleClose = () => {
    setStep("provider");
    setProviderOpen(false);
    setMeterTypeOpen(false);
    setSelectedProvider(null);
    setSelectedMeterType(null);
    setMeterNumber("");
    setAmount("");
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

  const isPrepaid = selectedMeterType?.name?.toLowerCase().includes('prepaid');
  const totalAmount = Number(amount || 0) + (selectedMeterType?.fee || 0);
  const minAmount = verifiedCustomer?.minimum || 500;

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
                  if (step === "meterType") { setStep("provider"); setSelectedMeterType(null); }
                  else if (step === "meterNumber") { setStep("meterType"); setMeterNumber(""); setVerifiedCustomer(null); }
                  else if (step === "amount") { setStep("meterNumber"); setAmount(""); }
                  else if (step === "confirm") setStep("amount");
                }}
                className="p-1 hover:bg-white/10 rounded transition-colors text-white/70"
              >
                <IoChevronBack className="text-xl" />
              </button>
            )}
            <div>
              <h2 className="text-white text-lg font-semibold tracking-tight">
                {step === "provider" ? "Electricity" :
                  step === "meterType" ? "Meter Type" :
                    step === "meterNumber" ? "Verify Meter" :
                      step === "amount" ? "Enter Amount" :
                        step === "confirm" ? "Confirm Payment" :
                          "Transaction Success"}
              </h2>
              <p className="text-white/60 text-[13px]">
                {step === "provider" ? "Choose your provider" :
                  step === "meterType" ? "Select meter type" :
                    step === "meterNumber" ? "Enter meter details" :
                      step === "amount" ? "Enter payment amount" :
                        step === "confirm" ? "Review and confirm" :
                          isPrepaid ? "Token generated" : "Payment confirmed"}
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
                <label className="text-white/70 text-sm font-medium px-1">Select Distribution Company</label>
                <div
                  onClick={() => setProviderOpen(!providerOpen)}
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3.5 px-4 text-white text-sm outline-none cursor-pointer flex items-center justify-between transition-all hover:bg-white/5"
                >
                  <span className={selectedProvider ? "text-white font-medium" : "text-white/50"}>
                    {selectedProvider?.name || "Choose provider (IKEDC, AEDC, etc.)"}
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
                      ) : !electricityPlans || electricityPlans.length === 0 ? (
                        <div className="px-4 py-6 text-white/50 text-sm text-center">No providers available</div>
                      ) : (
                        electricityPlans.map((p: any) => (
                          <button
                            key={p.billerCode || p.id}
                            onClick={() => {
                              setSelectedProvider({
                                name: p.shortName || p.planName || p.name,
                                billerCode: p.billerCode || p.biller_code || p.item_code
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
                  onClick={() => setStep("meterType")}
                  className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-2xl shadow-xl shadow-[#D4B139]/20 transition-all active:scale-95"
                >
                  CONTINUE
                </CustomButton>
              )}
            </div>
          )}

          {/* Step 2: Meter Type Selection */}
          {step === "meterType" && (
            <div className="space-y-5">
              <div className="bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4B139]/10 flex items-center justify-center">
                  <span className="text-[#D4B139] text-lg font-black">⚡</span>
                </div>
                <div>
                  <p className="text-white font-bold tracking-tight">{selectedProvider?.name}</p>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Selected Provider</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 relative" ref={meterTypeRef}>
                <label className="text-white/70 text-sm font-medium px-1">Select Meter Type</label>
                <div
                  onClick={() => {
                    if (!meterTypesLoading) setMeterTypeOpen(!meterTypeOpen);
                  }}
                  className={`w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3.5 px-4 text-white text-sm outline-none flex items-center justify-between transition-all ${meterTypesLoading ? 'cursor-wait' : 'cursor-pointer hover:bg-white/5'}`}
                >
                  {meterTypesLoading ? (
                    <span className="text-white/50 flex items-center gap-2">
                      Loading types... <SpinnerLoader width={16} height={16} color="#D4B139" />
                    </span>
                  ) : (
                    <span className={selectedMeterType ? "text-white font-medium" : "text-white/50"}>
                      {selectedMeterType?.name || "Choose meter type"}
                    </span>
                  )}
                  <IoChevronDown className={`w-4 h-4 text-white/70 transition-transform ${meterTypeOpen ? 'rotate-180' : ''}`} />
                </div>
                {meterTypeOpen && !meterTypesLoading && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-[100]">
                    <div className="bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 rounded-xl shadow-2xl overflow-hidden">
                      {meterTypes && meterTypes.length > 0 ? (
                        meterTypes.map((item: any, index: number) => (
                          <button
                            key={item.item_code || index}
                            onClick={() => {
                              setSelectedMeterType({
                                name: item.short_name || item.name || item.item_name,
                                itemCode: item.item_code || item.itemCode,
                                fee: Number(item.fee) || 0,
                              });
                              setMeterTypeOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-white hover:bg-white/5 text-sm font-medium flex items-center justify-between transition-colors border-b border-white/5 last:border-0"
                          >
                            <span>{item.short_name || item.name || item.item_name}</span>
                            {item.fee > 0 && (
                              <span className="text-[#D4B139] text-xs">+₦{item.fee} fee</span>
                            )}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-white/50 text-sm text-center">No meter types available</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {selectedMeterType && (
                <CustomButton
                  onClick={() => setStep("meterNumber")}
                  className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-2xl shadow-xl shadow-[#D4B139]/20 transition-all active:scale-95"
                >
                  CONTINUE
                </CustomButton>
              )}
            </div>
          )}

          {/* Step 3: Meter Number Validation */}
          {step === "meterNumber" && (
            <div className="space-y-6">
              <div className="bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Provider</p>
                  <p className="text-white text-sm font-bold">{selectedProvider?.name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Meter Type</p>
                  <p className="text-white text-sm font-bold">{selectedMeterType?.name}</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white/70 text-sm font-medium px-1">Meter Number</label>
                <input
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-4 px-4 text-white text-lg font-bold outline-none focus:ring-1 focus:ring-[#D4B139] transition-all"
                  placeholder="Enter meter number"
                  type="text"
                  inputMode="numeric"
                  value={meterNumber}
                  onChange={(e) => setMeterNumber(e.target.value.replace(/\D/g, ""))}
                />
              </div>

              {verifiedCustomer && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-emerald-400 text-sm font-bold">✓ Meter Verified</p>
                  <p className="text-white text-sm mt-1">{verifiedCustomer.customerName || verifiedCustomer.name}</p>
                  {verifiedCustomer.address && (
                    <p className="text-white/60 text-xs mt-1">{verifiedCustomer.address}</p>
                  )}
                </div>
              )}

              <CustomButton
                onClick={handleVerifyMeter}
                disabled={!meterNumber || meterNumber.length < 10 || verifying}
                isLoading={verifying}
                className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-2xl shadow-xl shadow-[#D4B139]/20 transition-all active:scale-95"
              >
                VERIFY METER
              </CustomButton>
            </div>
          )}

          {/* Step 4: Amount Entry */}
          {step === "amount" && (
            <div className="space-y-6">
              <div className="bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Customer</p>
                  <p className="text-white text-sm font-bold">{verifiedCustomer?.customerName || verifiedCustomer?.name}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Meter Number</p>
                  <p className="text-white text-sm font-bold font-mono">{meterNumber}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Type</p>
                  <p className="text-white text-sm font-bold">{selectedMeterType?.name}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <label className="text-white/70 text-sm font-medium">Amount</label>
                  {minAmount > 0 && (
                    <span className="text-[#D4B139] text-[10px] font-bold uppercase tracking-widest">
                      Min: ₦{minAmount.toLocaleString()}
                    </span>
                  )}
                </div>
                <input
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-4 px-4 text-white text-lg font-bold outline-none focus:ring-1 focus:ring-[#D4B139] transition-all"
                  placeholder="Enter amount"
                  type="text"
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                />
                {isPrepaid && amount && Number(amount) >= minAmount && (
                  <p className="text-[#D4B139]/80 text-xs px-1 font-medium">
                    💡 Token will be generated after payment
                  </p>
                )}
              </div>

              {amount && Number(amount) >= minAmount && (
                <div className="bg-[#D4B139]/10 border border-[#D4B139]/30 rounded-2xl p-5 text-center space-y-1">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Total Payable</p>
                  <h3 className="text-white text-3xl font-black tracking-tighter">
                    ₦{totalAmount.toLocaleString()}
                  </h3>
                  {selectedMeterType && selectedMeterType.fee > 0 && (
                    <p className="text-[#D4B139]/60 text-[9px] font-black uppercase tracking-widest pt-1">
                      Includes ₦{selectedMeterType.fee} service charge
                    </p>
                  )}
                </div>
              )}

              <CustomButton
                onClick={() => setStep("confirm")}
                disabled={!amount || Number(amount) < minAmount}
                className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-2xl shadow-xl shadow-[#D4B139]/20 transition-all active:scale-95"
              >
                PROCEED TO PAY
              </CustomButton>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === "confirm" && (
            <div className="space-y-6 pt-2">
              <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 bg-white/5 border-b border-white/5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Provider</span>
                    <span className="text-white text-sm font-bold">{selectedProvider?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Meter</span>
                    <span className="text-white text-sm font-mono font-bold">{meterNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Type</span>
                    <span className="text-white text-sm font-bold">{selectedMeterType?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Customer</span>
                    <span className="text-white text-sm font-bold">{verifiedCustomer?.customerName || verifiedCustomer?.name}</span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-sm font-medium">Amount</span>
                    <span className="text-white text-sm font-bold">₦{Number(amount).toLocaleString()}</span>
                  </div>
                  {selectedMeterType && selectedMeterType.fee > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-white/40 text-sm font-medium">Service Charge</span>
                      <span className="text-white text-sm font-bold">₦{selectedMeterType.fee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-white/5 flex justify-between items-end">
                    <span className="text-white/70 font-black uppercase text-[10px] tracking-widest pb-1">Total Amount</span>
                    <span className="text-[#D4B139] text-3xl font-black tracking-tight">₦{totalAmount.toLocaleString()}</span>
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
                  onClick={() => setStep("amount")}
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

          {/* Step 6: Result */}
          {step === "result" && (
            <div className="py-6 text-center space-y-6 animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-500/10 border-4 border-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/10 transition-transform scale-110">
                <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="space-y-2">
                <h3 className="text-emerald-400 text-2xl font-black tracking-tight">Payment Successful</h3>
                <p className="text-white/40 text-sm font-medium">
                  {isPrepaid ? "Your token has been generated" : "Payment confirmed"}
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/5 divide-y divide-white/5 space-y-3 text-left">
                <div className="flex justify-between items-center pb-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Provider</span>
                  <span className="text-white text-xs font-black">{selectedProvider?.name}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Meter Type</span>
                  <span className="text-white text-xs font-black">{selectedMeterType?.name}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Meter Number</span>
                  <span className="text-white/80 text-[10px] font-mono tracking-tighter">{meterNumber}</span>
                </div>
                {isPrepaid && transactionResult?.token && (
                  <div className="flex justify-between items-center py-3 bg-[#D4B139]/10 -mx-5 px-5 rounded-lg">
                    <span className="text-[#D4B139] text-[10px] font-black uppercase tracking-widest">Token</span>
                    <span className="text-[#D4B139] text-sm font-mono font-black tracking-wider">{transactionResult.token}</span>
                  </div>
                )}
                {transactionResult?.units && (
                  <div className="flex justify-between items-center py-3">
                    <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Units</span>
                    <span className="text-white text-xs font-black">{transactionResult.units} kWh</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Reference</span>
                  <span className="text-white/80 text-[10px] font-mono tracking-tighter">{transactionResult?.reference || transactionResult?.transactionRef || "-"}</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Amount Paid</span>
                  <span className="text-[#D4B139] text-xl font-black tracking-tight">₦{totalAmount.toLocaleString()}</span>
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

export default ElectricityModal;
