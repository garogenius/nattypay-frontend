"use client";

import React, { useMemo, useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { IoChevronBack, IoSearch, IoChevronForward } from "react-icons/io5";
import CustomButton from "@/components/shared/Button";
import {
  useGetGCProductsByCurrency,
  usePayForGiftCard,
  useGetGCFxRate,
} from "@/api/gift-card/gift-card.queries";
import SpinnerLoader from "@/components/Loader/SpinnerLoader";
import { GiftCardProduct } from "@/constants/types";
import Image from "next/image";
import { useTransactionProcessingStore } from "@/store/transactionProcessing.store";

interface GiftCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "brand" | "variant" | "amount" | "confirm" | "result";

const GiftCardModal: React.FC<GiftCardModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>("brand");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<GiftCardProduct | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [walletPin, setWalletPin] = useState("");
  const [transactionResult, setTransactionResult] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const { showProcessing, showSuccess, showError } = useTransactionProcessingStore();

  const { products, isLoading: productsLoading } = useGetGCProductsByCurrency({
    currency: "USD",
  });

  const brands = useMemo(() => {
    if (!products) return [];
    const grouped = products.reduce((acc: Record<string, { name: string; logo: string; products: GiftCardProduct[] }>, p) => {
      const brandName = p.brand.brandName;
      if (!acc[brandName]) {
        acc[brandName] = {
          name: brandName,
          logo: p.logoUrls[0] || "",
          products: []
        };
      }
      acc[brandName].products.push(p);
      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const filteredBrands = useMemo(() => {
    if (!searchTerm) return brands;
    return brands.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [brands, searchTerm]);

  const totalPages = Math.ceil(filteredBrands.length / ITEMS_PER_PAGE);
  const paginatedBrands = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBrands.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBrands, currentPage]);

  const brandVariants = useMemo(() => {
    if (!selectedBrand || !products) return [];
    return products.filter(p => p.brand.brandName === selectedBrand);
  }, [selectedBrand, products]);

  const amountToConvert = selectedProduct?.denominationType === "FIXED"
    ? (selectedAmount || 0)
    : Number(customAmount);

  const { fxRate, isLoading: fxLoading } = useGetGCFxRate({
    amount: amountToConvert,
    currency: selectedProduct?.recipientCurrencyCode || "USD",
  });

  // Structural mapping for Reloadly FX response
  const unitPriceNGN = fxRate?.convertedAmount || fxRate?.totalFee || fxRate?.amount || 0;
  const totalAmountNGN = unitPriceNGN * quantity;

  useEffect(() => {
    if (!isOpen) {
      setStep("brand");
      setSelectedBrand(null);
      setSelectedProduct(null);
      setSelectedAmount(null);
      setCustomAmount("");
      setQuantity(1);
      setWalletPin("");
      setSearchTerm("");
      setCurrentPage(1);
    }
  }, [isOpen]);

  const onPaySuccess = (data: any) => {
    showSuccess({
      title: "Purchase Successful",
      message: `Successfully purchased ${quantity} ${selectedProduct?.productName}`,
    });
    setTransactionResult(data?.data?.data || data?.data);
    setStep("result");
  };

  const onPayError = (error: any) => {
    const msg = error?.response?.data?.message || "Payment failed";
    showError({
      title: "Purchase Failed",
      message: Array.isArray(msg) ? msg[0] : msg,
    });
  };

  const { mutate: payForGiftCard, isPending: paying } = usePayForGiftCard(onPayError, onPaySuccess);

  const handleExecutePayment = () => {
    if (!selectedProduct || !walletPin) return;

    const payload = {
      productId: Number(selectedProduct.productId),
      quantity: quantity,
      unitPrice: Math.round(unitPriceNGN),
      amount: Math.round(totalAmountNGN),
      currency: "NGN" as const,
      walletPin: walletPin,
      addBeneficiary: false,
    };

    showProcessing({ title: "Processing", message: "Finalizing your purchase..." });
    payForGiftCard(payload);
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="z-[999999] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 flex justify-center items-center w-full md:inset-0 h-[100dvh]">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-black/80 dark:bg-black/60" onClick={handleClose}></div>
      </div>

      <div className="relative mx-4 bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 w-full max-w-md rounded-2xl overflow-visible shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-2">
            {step !== "brand" && step !== "result" && (
              <button
                onClick={() => {
                  if (step === "variant") { setStep("brand"); setSelectedBrand(null); }
                  else if (step === "amount") setStep("variant");
                  else if (step === "confirm") setStep("amount");
                }}
                className="p-1 hover:bg-white/10 rounded transition-colors text-white/70"
              >
                <IoChevronBack className="text-xl" />
              </button>
            )}
            <div>
              <h2 className="text-white text-lg font-semibold tracking-tight">
                {step === "brand" ? "Buy Gift Card" : step === "confirm" ? "Confirm Order" : step === "result" ? "Transaction Success" : "Select Region"}
              </h2>
              <p className="text-white/60 text-[13px]">
                {step === "brand" ? "Premium instant delivery" :
                  step === "confirm" ? "Confirm transaction details" :
                    step === "result" ? "Your voucher is being processed" :
                      "Select your preferred region"}
              </p>
            </div>
          </div>
          <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded transition-colors">
            <CgClose className="text-2xl text-white/70" />
          </button>
        </div>

        <div className="px-4 pb-6 mt-3">
          {step === "brand" && (
            <div className="space-y-5">
              <div className="relative">
                <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xl" />
                <input
                  type="text"
                  placeholder="Search brands (e.g. Amazon, iTunes...)"
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3 pl-12 pr-4 text-white text-sm outline-none focus:ring-1 focus:ring-[#D4B139] transition-all"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              {productsLoading ? (
                <div className="py-20 flex flex-col items-center gap-4">
                  <SpinnerLoader width={32} height={32} color="#D4B139" />
                  <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.3em]">Loading Catalog...</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    {paginatedBrands.map((brand) => (
                      <button
                        key={brand.name}
                        onClick={() => {
                          setSelectedBrand(brand.name);
                          setStep("variant");
                        }}
                        className="group flex flex-col items-center gap-2.5 p-3.5 bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-2xl hover:bg-white/5 transition-all text-center aspect-square flex-shrink-0"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                          <Image src={brand.logo} alt={brand.name} width={48} height={48} className="object-cover" unoptimized />
                        </div>
                        <span className="text-white text-[10px] font-black truncate w-full uppercase tracking-tight">{brand.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Pagination Dots/Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-4 px-1">
                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <div key={i} className={`h-1.5 rounded-full transition-all ${currentPage === i + 1 ? 'w-4 bg-[#D4B139]' : 'w-1.5 bg-white/10'}`} />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          className="p-1.5 bg-white/5 rounded-lg text-white/40 hover:text-[#D4B139] disabled:opacity-20 transition-colors border border-white/5"
                        >
                          <IoChevronBack size={14} />
                        </button>
                        <button
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          className="p-1.5 bg-white/5 rounded-lg text-white/40 hover:text-[#D4B139] disabled:opacity-20 transition-colors border border-white/5"
                        >
                          <IoChevronForward size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {step === "variant" && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2.5">
                {brandVariants.map((p) => (
                  <button
                    key={p.productId}
                    onClick={() => {
                      setSelectedProduct(p);
                      setStep("amount");
                    }}
                    className="flex items-center justify-between p-4 bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-2xl hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white/5 p-1">
                        <Image src={p.country.flagUrl} alt={p.country.name} width={24} height={18} className="object-contain" unoptimized />
                      </div>
                      <div className="text-left">
                        <p className="text-white text-sm font-bold tracking-tight">{p.productName}</p>
                        <p className="text-[#D4B139] text-[9px] uppercase font-black tracking-[0.2em]">{p.country.name}</p>
                      </div>
                    </div>
                    <div className="text-white/20 group-hover:text-[#D4B139] transition-colors">
                      <IoChevronForward className="text-xl" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "amount" && selectedProduct && (
            <div className="space-y-6">
              {/* Product Info Card */}
              <div className="bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg bg-white/5 flex items-center justify-center p-1 border border-white/5">
                  <Image src={selectedProduct.logoUrls[0]} alt="" width={56} height={56} className="object-cover" unoptimized />
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-tight">{selectedProduct.brand.brandName}</h4>
                  <p className="text-[#D4B139] text-[10px] font-black uppercase tracking-[0.2em]">{selectedProduct.country.name} • {selectedProduct.recipientCurrencyCode}</p>
                </div>
              </div>

              {/* Denomination Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <label className="text-white/70 text-sm font-medium tracking-tight">
                    {selectedProduct.denominationType === "FIXED" ? "Select Amount" : "Enter Amount"}
                  </label>
                  {fxLoading && <SpinnerLoader width={14} height={14} color="#D4B139" />}
                </div>

                {selectedProduct.denominationType === "FIXED" ? (
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProduct.fixedRecipientDenominations.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setSelectedAmount(amt)}
                        className={`py-3 px-1 rounded-xl border text-[13px] font-black transition-all ${selectedAmount === amt ? 'bg-[#D4B139] border-[#D4B139] text-black' : 'bg-bg-2400 dark:bg-bg-2100 border-border-600 text-white/70 hover:bg-white/5'}`}
                      >
                        {selectedProduct.recipientCurrencyCode} {amt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4B139] font-black text-sm">{selectedProduct.recipientCurrencyCode}</span>
                      <input
                        type="number"
                        placeholder={`Min: ${selectedProduct.minRecipientDenomination || 0}`}
                        className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-4 pl-14 pr-12 text-white text-lg font-black outline-none focus:ring-1 focus:ring-[#D4B139] transition-all"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                      />
                      {/* Loader inside input at end right side */}
                      {fxLoading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <SpinnerLoader width={18} height={18} color="#D4B139" />
                        </div>
                      )}
                    </div>
                    {(selectedProduct.minRecipientDenomination || selectedProduct.maxRecipientDenomination) && (
                      <p className="text-[10px] text-white/30 font-black uppercase text-center tracking-[0.2em]">
                        Range: {selectedProduct.minRecipientDenomination || 0} - {selectedProduct.maxRecipientDenomination || 'Any'}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="bg-bg-2400 dark:bg-bg-2100 border border-border-600 p-4 rounded-xl flex items-center justify-between">
                <span className="text-white/70 text-sm font-medium tracking-tight">Quantity</span>
                <div className="flex items-center gap-6 bg-white/5 px-4 py-2 rounded-full border border-white/5 shadow-inner">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#D4B139] hover:text-white text-3xl font-black transition-colors">-</button>
                  <span className="text-white font-black min-w-[20px] text-center text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-[#D4B139] hover:text-white text-3xl font-black transition-colors">+</button>
                </div>
              </div>

              {/* Final NGN Cost */}
              {unitPriceNGN > 0 && (
                <div className="bg-[#D4B139]/10 border border-[#D4B139]/30 rounded-2xl p-5 text-center space-y-1">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Total Value In NGN</p>
                  <h3 className="text-white text-3xl font-black tracking-tighter">
                    ₦{totalAmountNGN.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h3>
                  <p className="text-[#D4B139]/60 text-[9px] font-black uppercase tracking-widest pt-1">
                    Rate: 1 {selectedProduct.recipientCurrencyCode} = ₦{(unitPriceNGN / amountToConvert).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
              )}

              <CustomButton
                onClick={() => setStep("confirm")}
                disabled={!amountToConvert || unitPriceNGN === 0 || fxLoading}
                className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-2xl shadow-xl shadow-[#D4B139]/20 transition-all active:scale-95"
              >
                PROCEED TO PAY
              </CustomButton>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-6 pt-2">
              <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 flex items-center gap-4 bg-white/5 border-b border-white/5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center p-1 border border-white/10">
                    <Image src={selectedProduct?.logoUrls[0] || ""} alt="" width={48} height={48} className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold">{selectedProduct?.productName}</h4>
                    <p className="text-[#D4B139] text-[10px] font-black uppercase tracking-widest">{selectedProduct?.country.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-[10px] font-black uppercase">Qty</p>
                    <p className="text-white font-black text-xl">x{quantity}</p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/40 font-medium">Recipient Receives</span>
                    <span className="text-white font-bold">{selectedProduct?.recipientCurrencyCode} {amountToConvert.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pb-3 border-b border-white/5">
                    <span className="text-white/40 font-medium">Conversion Rate</span>
                    <span className="text-white font-bold">₦{(unitPriceNGN / amountToConvert).toLocaleString()}</span>
                  </div>
                  <div className="pt-2 flex justify-between items-end">
                    <span className="text-white/70 font-black uppercase text-[10px] tracking-widest pb-1">Total Payable</span>
                    <span className="text-[#D4B139] text-3xl font-black tracking-tight">₦{totalAmountNGN.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 px-1">
                <label className="text-white/60 text-sm font-medium text-center block tracking-tight">Transaction PIN</label>
                <div className="flex justify-center">
                  <input
                    type="password"
                    maxLength={4}
                    className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-xl py-3.5 px-4 text-white text-center text-2xl tracking-[1em] outline-none focus:border-[#D4B139] shadow-inner"
                    value={walletPin}
                    onChange={(e) => setWalletPin(e.target.value.replace(/\D/g, ""))}
                    placeholder="****"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <CustomButton onClick={() => setStep("amount")} className="flex-1 bg-transparent border border-border-600 text-white hover:bg-white/5 py-3 rounded-xl font-bold transition-all">
                  Back
                </CustomButton>
                <CustomButton
                  onClick={handleExecutePayment}
                  disabled={walletPin.length !== 4 || paying}
                  isLoading={paying}
                  className="flex-1 bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-3 rounded-xl"
                >
                  Pay Now
                </CustomButton>
              </div>
            </div>
          )}

          {step === "result" && (
            <div className="py-6 text-center space-y-6 animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-500/10 border-4 border-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/10 transition-transform scale-110">
                <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="space-y-2">
                <h3 className="text-emerald-400 text-2xl font-black tracking-tight">Purchase Successful</h3>
                <p className="text-white/40 text-sm font-medium">Your gift card is being generated</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/5 divide-y divide-white/5 space-y-3 text-left">
                <div className="flex justify-between items-center pb-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Product</span>
                  <div className="text-right">
                    <p className="text-white text-xs font-black">{selectedProduct?.productName}</p>
                    <p className="text-[#D4B139] text-[8px] font-black uppercase tracking-widest">{selectedProduct?.country.name}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Quantity</span>
                  <span className="text-white text-xs font-black">x{quantity}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Reference</span>
                  <span className="text-white/80 text-[10px] font-mono tracking-tighter">{transactionResult?.reference || "-"}</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Total Paid</span>
                  <span className="text-[#D4B139] text-xl font-black tracking-tight">₦{totalAmountNGN.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <CustomButton className="w-full bg-[#D4B139] hover:bg-[#D4B139]/90 text-black font-black py-4 rounded-2xl shadow-xl shadow-[#D4B139]/10 transition-all active:scale-95">
                  GENERATE RECEIPT
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

export default GiftCardModal;
