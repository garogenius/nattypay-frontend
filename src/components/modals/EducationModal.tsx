"use client";

import React, { useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoChevronDown } from "react-icons/io5";
import CustomButton from "@/components/shared/Button";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {
  useGetEducationBillers,
  useGetEducationBillerItems,
  useVerifyEducationCustomer,
  usePayForEducation,
  useGetRemitaProviders,
  useGetRemitaProducts
} from "@/api/education/education.queries";
import SpinnerLoader from "@/components/Loader/SpinnerLoader";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import useUserStore from "@/store/user.store";

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EducationModal: React.FC<EducationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"category" | "form" | "confirm" | "result">("category");
  const [category, setCategory] = useState<"SCHOOL" | "WAEC" | "JAMB" | null>(null);
  const [billerOpen, setBillerOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);

  // Selection State
  const [selectedBiller, setSelectedBiller] = useState<{ name: string; billerCode: string } | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Form State
  const [customerId, setCustomerId] = useState<string>("");
  const [customFields, setCustomFields] = useState<Record<string, string>>({});
  const [amount, setAmount] = useState<string>("");
  const [walletPin, setWalletPin] = useState<string>("");

  // Verification & Transaction
  const [verifiedCustomer, setVerifiedCustomer] = useState<any>(null);
  const [transactionData, setTransactionData] = useState<any>(null);
  const [paymentError, setPaymentError] = useState<string>("");
  const [resultSuccess, setResultSuccess] = useState<boolean | null>(null);

  const billerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(billerRef, () => setBillerOpen(false));
  useOnClickOutside(itemRef, () => setItemOpen(false));

  const { user } = useUserStore();

  // Queries
  const { billers: schoolBillers, isPending: schoolLoading } = useGetEducationBillers();
  const { providers: remitaProviders, isPending: providersLoading } = useGetRemitaProviders();

  // Fetch Items/Products
  // School: fetch by billerCode
  const { items: schoolItems, isLoading: schoolItemsLoading } = useGetEducationBillerItems({
    billerCode: category === "SCHOOL" ? selectedBiller?.billerCode || "" : "",
  });

  // WAEC/JAMB: fetch by provider (category name)
  const { products: vendingProducts, isLoading: vendingLoading } = useGetRemitaProducts(
    category === "WAEC" ? "WAEC" : category === "JAMB" ? "JAMB" : ""
  );

  const activeItems = category === "SCHOOL" ? schoolItems : vendingProducts;
  const itemsLoading = category === "SCHOOL" ? schoolItemsLoading : vendingLoading;

  // Verify Mutation
  const onVerifySuccess = (data: any) => {
    setVerifiedCustomer(data?.data?.data);
  };
  const onVerifyError = (error: any) => {
    const msg = error?.response?.data?.message || "Verification failed";
    ErrorToast({ title: "Verification Failed", descriptions: [msg] });
    setVerifiedCustomer(null);
  };
  const { mutate: verifyCustomer, isPending: verifying } = useVerifyEducationCustomer(onVerifyError, onVerifySuccess);

  // Pay Mutation
  const onPaySuccess = (data: any) => {
    setTransactionData(data?.data);
    setResultSuccess(true);
    setStep("result");
  };
  const onPayError = (error: any) => {
    const msg = error?.response?.data?.message || "Payment failed";
    setPaymentError(msg);
    setResultSuccess(false);
    setStep("result");
  };
  const { mutate: payEducation, isPending: paying } = usePayForEducation(onPayError, onPaySuccess);

  // Reset logic
  const handleClose = () => {
    setStep("category");
    setCategory(null);
    setSelectedBiller(null);
    setSelectedItem(null);
    setCustomerId("");
    setCustomFields({});
    setAmount("");
    setWalletPin("");
    setVerifiedCustomer(null);
    setTransactionData(null);
    setPaymentError("");
    onClose();
  };

  const handleCategorySelect = (cat: "SCHOOL" | "WAEC" | "JAMB") => {
    setCategory(cat);
    setStep("form");
    // For WAEC/JAMB, we auto-select the "Biller" as the category itself for display purposes
    if (cat !== "SCHOOL") {
      setSelectedBiller({ name: cat, billerCode: cat });
    } else {
      setSelectedBiller(null);
    }
    setSelectedItem(null);
    setCustomerId("");
    setCustomFields({});
    setAmount("");
    setVerifiedCustomer(null);
  };

  const activeBillers = category === "SCHOOL" ? schoolBillers : []; // WAEC/JAMB don't need biller selection step if fixed

  // Check if we can verify
  const canVerify = !!selectedBiller && !!selectedItem && customerId.length > 2;

  const handleVerify = () => {
    verifyCustomer({
      billerCode: selectedBiller?.billerCode || "",
      itemCode: selectedItem?.itemCode || selectedItem?.code || "", // API might return 'code' or 'itemCode'
      customerId,
    });
  };

  const handleConfirm = () => {
    if (!selectedBiller || !selectedItem) return;
    payEducation({
      billerCode: selectedBiller.billerCode,
      itemCode: selectedItem.itemCode || selectedItem.code,
      customerId,
      amount: Number(amount || selectedItem.amount || 0),
      currency: "NGN",
      walletPin,
      customerName: verifiedCustomer?.customerName || user?.fullname || "",
      customerEmail: user?.email || "",
      customerPhone: user?.phoneNumber || "",
      addBeneficiary: false,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="z-[999999] fixed inset-0 flex justify-center items-center w-full h-[100dvh]">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={handleClose} />

      <div className="relative mx-4 bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-white text-xl font-bold tracking-tight">
              {step === "category" ? "Education Payment" : category === "SCHOOL" ? "School Fees" : category}
            </h2>
            <p className="text-white/60 text-xs font-medium uppercase tracking-widest mt-1">
              {step === "category" ? "Select Category" : step === "form" ? "Enter Details" : step === "confirm" ? "Confirm Payment" : "Transaction Status"}
            </p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <CgClose className="text-xl text-white/70" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">

          {/* Step 0: Category Selection */}
          {step === "category" && (
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: "SCHOOL", label: "School Fees", icon: "🏫" },
                { id: "WAEC", label: "WAEC", icon: "📚" },
                { id: "JAMB", label: "JAMB", icon: "🎓" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id as any)}
                  className="flex items-center gap-4 p-4 bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl hover:bg-white/5 hover:border-[#D4B139] transition-all group text-left"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl group-hover:bg-[#D4B139]/20 transition-colors">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{cat.label}</h3>
                    <p className="text-white/40 text-xs font-medium">Pay for {cat.label} services</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 1: Form */}
          {step === "form" && (
            <div className="flex flex-col gap-5">

              {/* School Selection (Only for School Fees) */}
              {category === "SCHOOL" && (
                <div className="space-y-2" ref={billerRef}>
                  <label className="text-white/70 text-sm font-medium px-1">Select School</label>
                  <div
                    onClick={() => setBillerOpen(!billerOpen)}
                    className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3.5 px-4 text-white text-sm outline-none cursor-pointer flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <span className={selectedBiller ? "text-white font-medium" : "text-white/50"}>
                      {selectedBiller?.name || "Choose Institution"}
                    </span>
                    <IoChevronDown className={`text-white/50 transition-transform ${billerOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {billerOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-bg-600 dark:bg-bg-1100 border border-border-600 rounded-xl shadow-2xl max-h-60 overflow-y-auto left-0 right-0">
                      {schoolLoading ? (
                        <div className="flex items-center justify-center py-6">
                          <SpinnerLoader width={20} height={20} color="#D4B139" />
                        </div>
                      ) : activeBillers.length === 0 ? (
                        <div className="px-4 py-4 text-white/50 text-sm text-center">No schools found</div>
                      ) : (
                        activeBillers.map((b: any) => (
                          <button
                            key={b.billerCode || b.billerId}
                            onClick={() => {
                              setSelectedBiller({
                                name: b.name || b.billerName,
                                billerCode: b.billerCode || b.billerId
                              });
                              setSelectedItem(null);
                              setBillerOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-white text-sm font-medium hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
                          >
                            {b.name || b.billerName}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Item Selection */}
              {(category !== "SCHOOL" || selectedBiller) && (
                <div className="space-y-2" ref={itemRef}>
                  <label className="text-white/70 text-sm font-medium px-1">
                    {category === "SCHOOL" ? "Fee Category" : "Product / Service"}
                  </label>
                  <div
                    onClick={() => setItemOpen(!itemOpen)}
                    className={`w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3.5 px-4 text-white text-sm outline-none cursor-pointer flex items-center justify-between hover:bg-white/5 transition-colors ${itemsLoading ? 'opacity-70 pointer-events-none' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      {itemsLoading && <SpinnerLoader width={14} height={14} color="#D4B139" />}
                      <span className={selectedItem ? "text-white font-medium" : "text-white/50"}>
                        {selectedItem?.name || selectedItem?.itemName || (itemsLoading ? "Loading..." : "Select Option")}
                      </span>
                    </div>
                    <IoChevronDown className={`text-white/50 transition-transform ${itemOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {itemOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-bg-600 dark:bg-bg-1100 border border-border-600 rounded-xl shadow-2xl max-h-60 overflow-y-auto left-0 right-0">
                      {activeItems.length === 0 ? (
                        <div className="px-4 py-4 text-white/50 text-sm text-center">No items available</div>
                      ) : (
                        activeItems.map((it: any) => (
                          <button
                            key={it.itemCode || it.code}
                            onClick={() => {
                              // Normalize item data
                              const normalized = {
                                ...it,
                                itemCode: it.itemCode || it.code,
                                name: it.itemName || it.name || it.short_name,
                                amount: it.amount || it.fixedPrice
                              };
                              setSelectedItem(normalized);
                              if (normalized.amount && Number(normalized.amount) > 0) {
                                setAmount(String(normalized.amount));
                              } else {
                                setAmount("");
                              }
                              setItemOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-white text-sm font-medium hover:bg-white/10 transition-colors border-b border-white/5 last:border-0 flex justify-between items-center"
                          >
                            <span>{it.itemName || it.name || it.short_name}</span>
                            {(it.amount || it.fixedPrice) && (
                              <span className="text-[#D4B139] font-bold">₦{Number(it.amount || it.fixedPrice).toLocaleString()}</span>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Dynamic Fields (School) or Standard Inputs */}
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="space-y-2">
                  <label className="text-white/70 text-sm font-medium px-1">
                    {category === "JAMB" ? "JAMB Registration Number" : category === "WAEC" ? "WAEC Candidate Number" : "Student ID / Matric Number"}
                  </label>
                  <input
                    className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3.5 px-4 text-white placeholder:text-white/30 text-sm font-medium outline-none focus:border-[#D4B139] transition-colors"
                    placeholder="Enter ID number"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                  />
                </div>

                {/* Dynamic Fields if any (basic implementation for now) */}
                {selectedItem?.metadata?.customFields?.map((field: any) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-white/70 text-sm font-medium px-1">{field.columnName || field.name}</label>
                    <input
                      className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3.5 px-4 text-white placeholder:text-white/30 text-sm font-medium outline-none"
                      placeholder={`Enter ${field.columnName || field.name}`}
                    //    value={customFields[field.name] || ""}
                    //    onChange={(e) => setCustomFields({ ...customFields, [field.name]: e.target.value })}
                    // Note: For simplicity, we stick to mandatory CustomerID. Complex dynamic forms require dynamic state management.
                    />
                  </div>
                ))}

                {/* Verification Result */}
                {verifiedCustomer && (
                  <div className="bg-[#D4B139]/10 border border-[#D4B139]/20 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D4B139]/20 flex items-center justify-center text-[#D4B139]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#D4B139] text-sm font-bold opacity-80 uppercase tracking-widest text-[10px]">Verified Name</p>
                      <p className="text-white font-bold text-lg">{verifiedCustomer.customerName || verifiedCustomer.name}</p>
                    </div>
                  </div>
                )}

                {/* Amount Input */}
                {(selectedItem && !selectedItem.amount && !selectedItem.fixedPrice) && (
                  <div className="space-y-2">
                    <label className="text-white/70 text-sm font-medium px-1">Amount (NGN)</label>
                    <input
                      className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3.5 px-4 text-white placeholder:text-white/30 text-lg font-bold outline-none focus:border-[#D4B139] transition-colors"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                    />
                  </div>
                )}
              </div>

              {/* Action Button */}
              {!verifiedCustomer ? (
                <CustomButton
                  type="button"
                  disabled={!canVerify || verifying}
                  isLoading={verifying}
                  className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-xl shadow-xl shadow-[#D4B139]/10 mt-2 transition-all active:scale-95"
                  onClick={handleVerify}
                >
                  VERIFY CUSTOMER
                </CustomButton>
              ) : (
                <CustomButton
                  type="button"
                  className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-xl shadow-xl shadow-[#D4B139]/10 mt-2 transition-all active:scale-95"
                  onClick={() => setStep("confirm")}
                >
                  PROCEED TO PAY
                </CustomButton>
              )}
            </div>
          )}

          {/* Step: Confirm */}
          {step === "confirm" && (
            <div className="space-y-6">
              <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 bg-white/5 border-b border-white/5">
                  <div className="flex flex-col items-center py-2">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl mb-3">
                      {category === "SCHOOL" ? "🏫" : category === "WAEC" ? "📚" : "🎓"}
                    </div>
                    <p className="text-white font-bold text-lg uppercase tracking-tight">{category} PAYMENT</p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-sm font-medium">Provider</span>
                    <span className="text-white text-sm font-bold">{selectedBiller?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-sm font-medium">Service</span>
                    <span className="text-white text-sm font-bold">{selectedItem?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-sm font-medium">Customer ID</span>
                    <span className="text-white text-sm font-bold font-mono">{customerId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-sm font-medium">Beneficiary</span>
                    <span className="text-white text-sm font-bold">{verifiedCustomer?.customerName || verifiedCustomer?.name}</span>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex justify-between items-end">
                    <span className="text-white/70 font-black uppercase text-[10px] tracking-widest pb-1">Total Payable</span>
                    <span className="text-[#D4B139] text-2xl font-black tracking-tight">
                      ₦{Number(amount || selectedItem?.amount || 0).toLocaleString()}
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
                  onClick={handleConfirm}
                  disabled={walletPin.length !== 4 || paying}
                  isLoading={paying}
                  className="flex-1 bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-3 rounded-xl shadow-lg"
                >
                  Pay Now
                </CustomButton>
              </div>
            </div>
          )}

          {/* Step: Result */}
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
                  {resultSuccess ? 'Payment Successful' : 'Transaction Failed'}
                </h3>
                <p className="text-white/40 text-sm font-medium">{resultSuccess ? 'Education payment completed.' : paymentError}</p>
              </div>

              {resultSuccess && (
                <div className="bg-white/5 rounded-xl border border-white/10 p-4 space-y-3 text-left">
                  <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
                    <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Amount Paid</span>
                    <span className="text-[#D4B139] font-black font-mono">₦{Number(amount || selectedItem?.amount || 0).toLocaleString()}</span>
                  </div>

                  {transactionData?.transactionId && (
                    <div className="flex justify-between items-center">
                      <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Ref ID</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white/80 font-mono text-sm">{transactionData.transactionId}</span>
                        <button onClick={() => navigator.clipboard.writeText(transactionData.transactionId)} className="p-1 hover:bg-white/10 rounded"><svg className="w-3 h-3 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                      </div>
                    </div>
                  )}
                  {transactionData?.pin && (
                    <div className="flex justify-between items-center">
                      <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Generated PIN</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-mono text-lg font-bold">{transactionData.pin}</span>
                        <button onClick={() => navigator.clipboard.writeText(transactionData.pin)} className="p-1 hover:bg-white/10 rounded"><svg className="w-3 h-3 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
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

export default EducationModal;

