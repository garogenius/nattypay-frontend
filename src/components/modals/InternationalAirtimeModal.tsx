"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoChevronDown } from "react-icons/io5";
import Image from "next/image";
import CustomButton from "@/components/shared/Button";
import { useGetInternationalAirtimePlan, useGetInternationalAirtimeFxRate, usePayForInternationalAirtime } from "@/api/airtime/airtime.queries";
import { formatNumberWithoutExponential, handleInput } from "@/utils/utilityFunctions";
import SpinnerLoader from "@/components/Loader/SpinnerLoader";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface Props { isOpen: boolean; onClose: () => void; }

const InternationalAirtimeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"form" | "confirm" | "result">("form");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [walletPin, setWalletPin] = useState("");
  const [operatorId, setOperatorId] = useState<number | undefined>();
  const [plan, setPlan] = useState<any>(null);
  const [resultSuccess, setResultSuccess] = useState<boolean | null>(null);
  const [transactionData, setTransactionData] = useState<any>(null);
  const [paymentError, setPaymentError] = useState<string>("");
  const [planDropdownOpen, setPlanDropdownOpen] = useState(false);
  const [addBeneficiary, setAddBeneficiary] = useState(false);

  const planDropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(planDropdownRef, () => setPlanDropdownOpen(false));

  const { data: internationalAirtimePlan, isLoading, isError } = useGetInternationalAirtimePlan({ phone });
  const iaLoading = isLoading && !isError;

  const { data: fxRateData, isLoading: fxLoading } = useGetInternationalAirtimeFxRate({
    operatorId: operatorId || 0,
    amount: Number(amount) || 0
  });

  const convertedAmount = fxRateData?.data?.convertedAmount || 0;
  const exchangeRate = fxRateData?.data?.exchangeRate || 0;

  useEffect(() => {
    const planData = internationalAirtimePlan?.data?.data;
    if (planData) {
      setOperatorId(planData.operatorId);
      setPlan(planData);
      if (planData?.denominationType === "FIXED") {
        setAmount(String(planData?.localFixedAmounts?.[0] || ""));
      }
    } else {
      setPlan(null);
      setOperatorId(undefined);
    }
  }, [internationalAirtimePlan?.data?.data]);

  const minAmt = plan ? Number(formatNumberWithoutExponential(plan?.minAmount * (plan?.fx?.rate || 1), 4)) : 0;
  const maxAmt = plan ? Number(formatNumberWithoutExponential(plan?.maxAmount * (plan?.fx?.rate || 1), 4)) : 0;
  const currencyCode = plan?.destinationCurrencyCode || "Currency";

  const canProceed = phone && operatorId && (Number(amount) > 0);

  const handleClose = () => {
    setStep("form");
    setPhone("");
    setAmount("");
    setWalletPin("");
    setOperatorId(undefined);
    setPlan(null);
    setTransactionData(null);
    setPaymentError("");
    setResultSuccess(null);
    setAddBeneficiary(false);
    onClose();
  };

  const onPayAirtimeSuccess = (data: any) => {
    setTransactionData(data?.data);
    setResultSuccess(true);
    setStep("result");
  };

  const onPayAirtimeError = (error: any) => {
    const errorMessage = error?.response?.data?.message || "Failed to process international airtime purchase.";
    setPaymentError(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
    setResultSuccess(false);
    setStep("result");
  };

  const { mutate: PayForInternationalAirtime, isPending: paying, isError: payError } = usePayForInternationalAirtime(onPayAirtimeError, onPayAirtimeSuccess);
  const isPaying = paying && !payError;

  if (!isOpen) return null;

  return (
    <div className="z-[999999] fixed inset-0 flex justify-center items-center w-full h-[100dvh]">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={handleClose} />

      <div className="relative mx-4 bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-white text-xl font-bold tracking-tight">International Airtime</h2>
            <p className="text-white/60 text-xs font-medium uppercase tracking-widest mt-1">Global Top-up</p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <CgClose className="text-xl text-white/70" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          {step === "form" && (
            <div className="flex flex-col gap-5">
              {/* Phone Input */}
              <div className="space-y-2">
                <label className="text-white/70 text-sm font-medium px-1">Receiver's Phone</label>
                <div className="bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl p-1 flex items-center">
                  <div className="pl-4 pr-2 border-r border-white/10">
                    <span className="text-white/50 text-lg">🌍</span>
                  </div>
                  <input
                    className="w-full bg-transparent py-3 px-4 text-white placeholder:text-white/30 text-base font-medium outline-none"
                    placeholder="+1 234 567 8900"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onInput={handleInput}
                  />
                </div>
              </div>

              {/* Detected Network */}
              <div className="space-y-2">
                <label className="text-white/70 text-sm font-medium px-1">Detected Carrier</label>
                <div className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3.5 px-4 text-white text-sm flex items-center justify-between min-h-[52px]">
                  {iaLoading ? (
                    <div className="flex items-center gap-3 text-white/50">
                      <SpinnerLoader width={16} height={16} color="#D4B139" />
                      <span className="text-xs uppercase font-bold tracking-widest">Identifying...</span>
                    </div>
                  ) : plan ? (
                    <div className="flex items-center gap-3">
                      {plan?.logoUrls?.[0] ? (
                        <Image src={plan.logoUrls[0]} alt={plan?.name} width={24} height={24} className="rounded-full ring-2 ring-white/10" unoptimized />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                          {plan?.name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-white uppercase tracking-wide">{plan?.name}</p>
                        {plan?.countryCode && <p className="text-[10px] text-white/40 font-bold">{plan.countryCode} ({plan.countryName})</p>}
                      </div>
                    </div>
                  ) : (
                    <span className="text-white/30 italic text-sm">Waiting for valid number...</span>
                  )}
                </div>
              </div>

              {/* Amount Selection */}
              {plan && (
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <label className="text-white/70 text-sm font-medium px-1">Top-up Amount ({currencyCode})</label>

                  {plan?.denominationType === "RANGE" ? (
                    <div className="relative">
                      <input
                        className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-4 px-4 text-white placeholder:text-white/30 text-lg font-bold outline-none focus:border-[#D4B139] transition-colors"
                        placeholder={`${minAmt} - ${maxAmt}`}
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 text-xs font-black uppercase tracking-widest pointer-events-none">
                        {currencyCode}
                      </div>
                    </div>
                  ) : (
                    <div className="relative" ref={planDropdownRef}>
                      <button
                        onClick={() => setPlanDropdownOpen(!planDropdownOpen)}
                        className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3.5 px-4 text-white text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span className={amount ? "text-white font-bold text-lg" : "text-white/30"}>
                          {amount ? `${amount} ${currencyCode}` : "Select Amount"}
                        </span>
                        <IoChevronDown className={`transition-transform duration-200 text-white/50 ${planDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {planDropdownOpen && (
                        <div className="absolute z-50 w-full mt-2 bg-bg-600 dark:bg-bg-1100 border border-border-600 rounded-xl shadow-2xl max-h-60 overflow-y-auto no-scrollbar left-0 right-0">
                          {plan?.localFixedAmounts?.map((v: number, i: number) => (
                            <button
                              key={i}
                              onClick={() => { setAmount(String(v)); setPlanDropdownOpen(false); }}
                              className="w-full px-4 py-3 text-white text-left text-sm font-medium hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
                            >
                              {v} {currencyCode}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Currency Conversion Display */}
                  <div className="bg-[#D4B139]/5 border border-[#D4B139]/20 rounded-xl p-3 flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#D4B139]/70 font-medium">Exchange Rate</span>
                      <span className="text-[#D4B139] font-mono">1 {plan?.senderCurrencyCode} ≈ {Number(formatNumberWithoutExponential(plan?.fx?.rate || 1, 2))} {plan?.destinationCurrencyCode}</span>
                    </div>
                    {fxLoading ? (
                      <div className="flex items-center gap-2 text-[#D4B139]/50 text-sm mt-1">
                        <SpinnerLoader width={12} height={12} color="#D4B139" />
                        <span>Calculating total...</span>
                      </div>
                    ) : (
                      <div className="flex justify-between items-end mt-1 border-t border-[#D4B139]/10 pt-2">
                        <span className="text-[#D4B139]/70 text-xs font-black uppercase tracking-widest">You Pay</span>
                        <span className="text-[#D4B139] text-xl font-black tracking-tight">
                          ₦{convertedAmount ? Number(Number(convertedAmount) + (plan?.payAmount || 0)).toLocaleString() : "0.00"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Save Beneficiary */}
              {plan && (
                <div className="bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-bold">Save as Beneficiary</p>
                    <p className="text-white/40 text-xs mt-0.5">Quick access for future top-ups</p>
                  </div>
                  <button
                    onClick={() => setAddBeneficiary(!addBeneficiary)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${addBeneficiary ? 'bg-[#D4B139]' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${addBeneficiary ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              )}

              <CustomButton
                type="button"
                disabled={!canProceed || iaLoading || fxLoading}
                className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-xl shadow-xl shadow-[#D4B139]/10 mt-2 transition-all active:scale-95"
                onClick={() => setStep("confirm")}
              >
                PROCEED TO PAY
              </CustomButton>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-6">
              <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 bg-white/5 border-b border-white/5">
                  <div className="flex flex-col items-center py-2">
                    {plan?.logoUrls?.[0] && <Image src={plan.logoUrls[0]} alt={plan?.name} width={48} height={48} className="rounded-full mb-3" unoptimized />}
                    <p className="text-white font-bold text-lg uppercase tracking-tight">{plan?.name}</p>
                    <p className="text-white/50 text-xs font-bold">{plan?.countryName}</p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-sm font-medium">Receiver</span>
                    <span className="text-white text-sm font-bold font-mono">+{phone}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-sm font-medium">Top-up Value</span>
                    <span className="text-white text-sm font-bold">{amount} {currencyCode}</span>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex justify-between items-end">
                    <span className="text-white/70 font-black uppercase text-[10px] tracking-widest pb-1">Total Payable</span>
                    <span className="text-[#D4B139] text-2xl font-black tracking-tight">
                      ₦{Number(Number(convertedAmount) + (plan?.payAmount || 0)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 px-1">
                <label className="text-white/60 text-sm font-medium text-center block tracking-tight">Transaction PIN</label>
                <input
                  type="password"
                  maxLength={4}
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3.5 px-4 text-white text-center text-2xl tracking-[1em] outline-none focus:border-[#D4B139] shadow-inner transition-colors"
                  value={walletPin}
                  onChange={(e) => setWalletPin(e.target.value.replace(/\D/g, ""))}
                  placeholder="****"
                />
              </div>

              <div className="flex gap-3">
                <CustomButton onClick={() => setStep("form")} className="flex-1 bg-transparent border border-border-600 text-white hover:bg-white/5 py-3 rounded-xl font-bold">Back</CustomButton>
                <CustomButton
                  onClick={() => {
                    if (!operatorId) return;
                    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
                    PayForInternationalAirtime({ phone: formattedPhone, currency: "NGN", walletPin, operatorId, amount: Number(amount), addBeneficiary });
                  }}
                  disabled={walletPin.length !== 4 || isPaying}
                  isLoading={isPaying}
                  className="flex-1 bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-3 rounded-xl shadow-lg"
                >
                  Pay Now
                </CustomButton>
              </div>
            </div>
          )}

          {step === "result" && (
            <div className="py-6 text-center space-y-6 animate-in zoom-in duration-300">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-2xl transition-transform scale-110 ${resultSuccess ? 'bg-emerald-500/10 border-4 border-emerald-500/20 shadow-emerald-500/10' : 'bg-red-500/10 border-4 border-red-500/20 shadow-red-500/10'}`}>
                {resultSuccess ? (
                  <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </div>

              <div className="space-y-2">
                <h3 className={`text-2xl font-black tracking-tight ${resultSuccess ? 'text-emerald-400' : 'text-red-400'}`}>
                  {resultSuccess ? 'Top-up Successful' : 'Transaction Failed'}
                </h3>
                <p className="text-white/40 text-sm font-medium">{resultSuccess ? 'Processing airtime transfer...' : paymentError}</p>
              </div>

              {resultSuccess && (
                <div className="bg-white/5 rounded-xl border border-white/10 p-4 space-y-3 text-left">
                  <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
                    <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Amount Paid</span>
                    <span className="text-[#D4B139] font-black font-mono">₦{Number(Number(convertedAmount) + (plan?.payAmount || 0)).toLocaleString()}</span>
                  </div>

                  {transactionData?.transactionId && (
                    <div className="flex justify-between items-center">
                      <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Ref ID</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white/80 font-mono text-sm">{transactionData.transactionId}</span>
                        <button onClick={() => navigator.clipboard.writeText(transactionData.transactionId)} className="p-1 hover:bg-white/10 rounded"><svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <CustomButton onClick={handleClose} className="flex-1 bg-transparent border border-border-600 text-white hover:bg-white/5 py-3 rounded-xl font-bold">Close</CustomButton>
                {resultSuccess ? (
                  <CustomButton onClick={handleClose} className="flex-1 bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-3 rounded-xl">Receipt</CustomButton>
                ) : (
                  <CustomButton onClick={() => { setStep("form"); }} className="flex-1 bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-3 rounded-xl">Retry</CustomButton>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternationalAirtimeModal;
