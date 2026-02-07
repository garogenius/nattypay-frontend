"use client";

import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoChevronDown, IoChevronBack, IoSearch } from "react-icons/io5";
import CustomButton from "@/components/shared/Button";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import SpinnerLoader from "@/components/Loader/SpinnerLoader";
import { useGetInternetPlans, useGetInternetVariations, usePayForInternet } from "@/api/internet/internet.queries";
import { useTransactionProcessingStore } from "@/store/transactionProcessing.store";
import Image from "next/image";

interface InternetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "isp" | "bundle" | "account" | "confirm" | "result";

const InternetModal: React.FC<InternetModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>("isp");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedISP, setSelectedISP] = useState<{ name: string; billerCode: string; logo?: string } | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<{ name: string; amount: number; itemCode: string; validity?: string } | null>(null);
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [walletPin, setWalletPin] = useState<string>("");
  const [addBeneficiary, setAddBeneficiary] = useState<boolean>(false);
  const [transactionResult, setTransactionResult] = useState<any>(null);

  const { showProcessing, showSuccess, showError } = useTransactionProcessingStore();

  // Step 1: Fetch ISPs
  const { internetPlans: isps, isPending: ispsLoading, isError: ispsError } = useGetInternetPlans({
    currency: "NGN",
    isEnabled: isOpen
  });

  // Step 2: Fetch ISP-specific bundles when ISP is selected
  const { variations: bundles, isLoading: bundlesLoading, isError: bundlesError } = useGetInternetVariations({
    billerCode: selectedISP?.billerCode || ""
  });

  // Normalize bundles to expected shape
  const normalizedBundles = (bundles || []).map((v: any) => ({
    name: v.short_name || v.name || v.item_name,
    amount: typeof v.payAmount === 'number' ? v.payAmount : Number(v.amount) || 0,
    itemCode: v.item_code || v.itemCode,
    validity: v.validity_period ? `${v.validity_period} Days` : undefined,
  }));

  // Filter bundles by search term
  const filteredBundles = normalizedBundles.filter(bundle =>
    bundle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Payment handlers
  const onPaySuccess = (data: any) => {
    showSuccess({
      title: "Payment Successful",
      message: `Successfully purchased ${selectedBundle?.name}`,
    });
    setTransactionResult(data?.data?.data || data?.data);
    setStep("result");
  };

  const onPayError = (error: any) => {
    const msg = error?.response?.data?.message;
    showError({
      title: "Payment Failed",
      message: Array.isArray(msg) ? msg[0] : msg || "Internet payment failed",
    });
  };

  const { mutate: payForInternet, isPending: paying } = usePayForInternet(
    onPayError,
    onPaySuccess
  );

  const handleConfirm = () => {
    if (!selectedISP || !selectedBundle || !walletPin || !accountNumber) return;

    showProcessing({ title: "Processing", message: "Completing your purchase..." });

    payForInternet({
      itemCode: selectedBundle.itemCode,
      billerCode: selectedISP.billerCode,
      billerNumber: accountNumber,
      amount: selectedBundle.amount,
      walletPin,
      currency: "NGN",
      addBeneficiary,
    });
  };

  const handleClose = () => {
    setStep("isp");
    setSearchTerm("");
    setSelectedISP(null);
    setSelectedBundle(null);
    setAccountNumber("");
    setWalletPin("");
    setAddBeneficiary(false);
    setTransactionResult(null);
    onClose();
  };

  // Handle ISP change - clear bundle selection and refetch
  const handleISPChange = (isp: { name: string; billerCode: string; logo?: string }) => {
    setSelectedISP(isp);
    setSelectedBundle(null); // Clear bundle when ISP changes
    setSearchTerm(""); // Clear search
    setStep("bundle");
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
            {step !== "isp" && step !== "result" && (
              <button
                onClick={() => {
                  if (step === "bundle") { setStep("isp"); setSelectedISP(null); setSelectedBundle(null); }
                  else if (step === "account") { setStep("bundle"); setAccountNumber(""); }
                  else if (step === "confirm") setStep("account");
                }}
                className="p-1 hover:bg-white/10 rounded transition-colors text-white/70"
              >
                <IoChevronBack className="text-xl" />
              </button>
            )}
            <div>
              <h2 className="text-white text-lg font-semibold tracking-tight">
                {step === "isp" ? "Internet Services" :
                  step === "bundle" ? "Select Bundle" :
                    step === "account" ? "Account Details" :
                      step === "confirm" ? "Confirm Purchase" :
                        "Transaction Success"}
              </h2>
              <p className="text-white/60 text-[13px]">
                {step === "isp" ? "Choose your ISP provider" :
                  step === "bundle" ? "Select data bundle" :
                    step === "account" ? "Enter account number" :
                      step === "confirm" ? "Review and confirm" :
                        "Purchase completed"}
              </p>
            </div>
          </div>
          <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded transition-colors">
            <CgClose className="text-2xl text-white/70" />
          </button>
        </div>

        <div className="px-4 pb-6 mt-3">
          {/* Step 1: ISP Selection */}
          {step === "isp" && (
            <div className="space-y-5">
              {ispsLoading ? (
                <div className="py-20 flex flex-col items-center gap-4">
                  <SpinnerLoader width={32} height={32} color="#D4B139" />
                  <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.3em]">Loading ISPs...</p>
                </div>
              ) : ispsError ? (
                <div className="py-12 text-center">
                  <p className="text-red-400 text-sm font-medium">Failed to load ISPs. Please try again.</p>
                </div>
              ) : isps && isps.length > 0 ? (
                <div className="grid grid-cols-1 gap-2.5">
                  {isps.map((isp: any) => (
                    <button
                      key={isp.biller_code || isp.code || isp.billerCode || isp.id}
                      onClick={() => handleISPChange({
                        name: isp.short_name || isp.shortName || isp.name || isp.planName,
                        billerCode: String(isp.biller_code || isp.code || isp.billerCode || ""),
                        logo: isp.logo,
                      })}
                      className="flex items-center justify-between p-4 bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-2xl hover:bg-white/5 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center p-2 border border-white/5">
                          {isp.logo ? (
                            <Image src={isp.logo} alt={isp.shortName || isp.name} width={48} height={48} className="object-contain" unoptimized />
                          ) : (
                            <span className="text-[#D4B139] text-lg font-black">🌐</span>
                          )}
                        </div>
                        <div className="text-left">
                          <p className="text-white text-sm font-bold tracking-tight">{isp.shortName || isp.planName || isp.name}</p>
                          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Internet Service Provider</p>
                        </div>
                      </div>
                      <div className="text-white/20 group-hover:text-[#D4B139] transition-colors">
                        <IoChevronDown className="text-xl rotate-[-90deg]" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-white/50 text-sm">No ISPs available</p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Bundle Selection */}
          {step === "bundle" && (
            <div className="space-y-5">
              <div className="bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4B139]/10 flex items-center justify-center">
                  <span className="text-[#D4B139] text-lg font-black">🌐</span>
                </div>
                <div>
                  <p className="text-white font-bold tracking-tight">{selectedISP?.name}</p>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Selected ISP</p>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xl" />
                <input
                  type="text"
                  placeholder="Search bundles..."
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3 pl-12 pr-4 text-white text-sm outline-none focus:ring-1 focus:ring-[#D4B139] transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {bundlesLoading ? (
                <div className="py-12 flex flex-col items-center gap-4">
                  <SpinnerLoader width={24} height={24} color="#D4B139" />
                  <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.3em]">Loading bundles...</p>
                </div>
              ) : bundlesError ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-red-500/10 border-2 border-red-500/20 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-red-400 text-sm font-bold">No Bundles Available</p>
                    <p className="text-white/40 text-xs mt-1">This ISP currently has no data bundles</p>
                  </div>
                  <CustomButton
                    onClick={() => {
                      setStep("isp");
                      setSelectedISP(null);
                      setSelectedBundle(null);
                    }}
                    className="bg-white/5 hover:bg-white/10 text-white border border-border-600 py-3 px-6 rounded-xl font-bold transition-all mx-auto"
                  >
                    Select Different ISP
                  </CustomButton>
                </div>
              ) : filteredBundles.length > 0 ? (
                <div className="space-y-3">
                  <label className="text-white/70 text-sm font-medium px-1">Available Data Bundles</label>
                  <div className="grid grid-cols-1 gap-2.5 max-h-96 overflow-y-auto">
                    {filteredBundles.map((bundle, index) => (
                      <button
                        key={bundle.itemCode || index}
                        onClick={() => setSelectedBundle(bundle)}
                        className={`flex items-center justify-between p-4 text-left border rounded-xl transition-all ${selectedBundle?.itemCode === bundle.itemCode
                          ? "bg-[#D4B139] text-black border-[#D4B139]"
                          : "border-border-600 text-white hover:bg-white/5"
                          }`}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-bold">{bundle.name}</p>
                          {bundle.validity && (
                            <p className="text-xs opacity-70 mt-0.5">{bundle.validity}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-black text-base">
                            ₦{bundle.amount.toLocaleString()}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-white/50 text-sm">
                    {searchTerm ? "No bundles match your search" : "No bundles available"}
                  </p>
                </div>
              )}

              {selectedBundle && (
                <CustomButton
                  onClick={() => setStep("account")}
                  className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-2xl shadow-xl shadow-[#D4B139]/20 transition-all active:scale-95"
                >
                  CONTINUE
                </CustomButton>
              )}
            </div>
          )}

          {/* Step 3: Account Number Entry */}
          {step === "account" && (
            <div className="space-y-6">
              <div className="bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">ISP</p>
                  <p className="text-white text-sm font-bold">{selectedISP?.name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Bundle</p>
                  <p className="text-white text-sm font-bold">{selectedBundle?.name}</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white/70 text-sm font-medium px-1">
                  Account / Phone Number
                </label>
                <input
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-4 px-4 text-white text-lg font-bold outline-none focus:ring-1 focus:ring-[#D4B139] transition-all"
                  placeholder="Enter account or phone number"
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-1">
                  Enter your {selectedISP?.name} account number or phone
                </p>
              </div>

              {/* Save as Beneficiary Toggle */}
              <div className="bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-bold">Save as Beneficiary</p>
                  <p className="text-white/40 text-xs mt-0.5">Quick access for future purchases</p>
                </div>
                <button
                  onClick={() => setAddBeneficiary(!addBeneficiary)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${addBeneficiary ? 'bg-[#D4B139]' : 'bg-white/10'
                    }`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${addBeneficiary ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                </button>
              </div>

              <CustomButton
                onClick={() => setStep("confirm")}
                disabled={!accountNumber || accountNumber.length < 5}
                className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-2xl shadow-xl shadow-[#D4B139]/20 transition-all active:scale-95"
              >
                PROCEED TO PAY
              </CustomButton>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === "confirm" && (
            <div className="space-y-6 pt-2">
              <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 bg-white/5 border-b border-white/5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">ISP</span>
                    <span className="text-white text-sm font-bold">{selectedISP?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Account</span>
                    <span className="text-white text-sm font-mono font-bold">{accountNumber}</span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-sm font-medium">Bundle</span>
                    <span className="text-white text-sm font-bold">{selectedBundle?.name}</span>
                  </div>
                  {selectedBundle?.validity && (
                    <div className="flex justify-between items-center">
                      <span className="text-white/40 text-sm font-medium">Validity</span>
                      <span className="text-white text-sm font-bold">{selectedBundle.validity}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-white/5 flex justify-between items-end">
                    <span className="text-white/70 font-black uppercase text-[10px] tracking-widest pb-1">Total Amount</span>
                    <span className="text-[#D4B139] text-3xl font-black tracking-tight">₦{Number(selectedBundle?.amount || 0).toLocaleString()}</span>
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
                  onClick={() => setStep("account")}
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
                <h3 className="text-emerald-400 text-2xl font-black tracking-tight">Purchase Successful</h3>
                <p className="text-white/40 text-sm font-medium">Your data bundle is now active</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/5 divide-y divide-white/5 space-y-3 text-left">
                <div className="flex justify-between items-center pb-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">ISP</span>
                  <span className="text-white text-xs font-black">{selectedISP?.name}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Bundle</span>
                  <span className="text-white text-xs font-black">{selectedBundle?.name}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Account</span>
                  <span className="text-white/80 text-[10px] font-mono tracking-tighter">{accountNumber}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Reference</span>
                  <span className="text-white/80 text-[10px] font-mono tracking-tighter">
                    {transactionResult?.reference || transactionResult?.transactionRef || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Amount Paid</span>
                  <span className="text-[#D4B139] text-xl font-black tracking-tight">₦{Number(selectedBundle?.amount || 0).toLocaleString()}</span>
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

export default InternetModal;
