"use client";

import Image from "next/image";
import { useMemo, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "@/components/shared/Button";
import {
  GiftCardDetails,
  GiftCardPriceDetail,
  GiftCardProduct,
} from "@/constants/types";
import toast from "react-hot-toast";
import {
  useGetGCProductsByCurrency,
  useGetGCFxRate,
} from "@/api/gift-card/gift-card.queries";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { motion } from "framer-motion";
import SearchableDropdown from "@/components/shared/SearchableDropdown";
import {
  formatNumberWithoutExponential,
  handleNumericPaste,
  handleNumericKeyDown,
} from "@/utils/utilityFunctions";
import RedeemInstructionModal from "@/components/modals/RedeemInstructionModal";
import { useTheme } from "@/store/theme.store";
import Skeleton from "react-loading-skeleton";

// Helper to determine if product is Fixed or Range
function processGiftCardPrices(
  product: GiftCardProduct
): GiftCardPriceDetail[] {
  const result: GiftCardPriceDetail[] = [];

  if (product.denominationType === "FIXED") {
    // Handle fixed denomination type
    const senderMap = product.fixedRecipientToSenderDenominationsMap || {};
    const payMap = product.fixedRecipientToPayAmount || {};

    // Convert string keys to numbers for comparison
    Object.entries(payMap).forEach(([priceStr, payAmount]) => {
      const price = parseFloat(priceStr);
      const senderAmount = senderMap[`${price}.0`] || senderMap[priceStr];

      if (senderAmount !== undefined) {
        result.push({
          price,
          amount: payAmount,
          fee: payAmount - senderAmount,
        });
      }
    });

    // Sort by price
    result.sort((a, b) => a.price - b.price);
  }
  // For RANGE, we don't return a fixed list of prices here usually, 
  // or we return an empty list and handle it via input.
  return result;
}

type StageOneProps = {
  stage: "one" | "two" | "three";
  setStage: (stage: "one" | "two" | "three") => void;
  setGiftCardDetails: (giftCardDetails: GiftCardDetails) => void;
  setAmount: (amount: string) => void;
};

const BuyGiftCardStageOne: React.FC<StageOneProps> = ({
  setStage,
  setGiftCardDetails,
  setAmount,
}) => {
  const theme = useTheme();

  // State for products aggregation
  const [allProducts, setAllProducts] = useState<GiftCardProduct[]>([]);
  const [isLoadingAllProducts, setIsLoadingAllProducts] = useState(true);

  // We fetch for major currencies to populate the list "Global" search feel
  const currenciesToFetch = ["USD", "GBP", "EUR", "CAD", "AUD"];

  const { products: usdProducts, isLoading: usdLoading } = useGetGCProductsByCurrency({ currency: "USD" });
  const { products: gbpProducts, isLoading: gbpLoading } = useGetGCProductsByCurrency({ currency: "GBP" });
  const { products: eurProducts, isLoading: eurLoading } = useGetGCProductsByCurrency({ currency: "EUR" });
  const { products: cadProducts, isLoading: cadLoading } = useGetGCProductsByCurrency({ currency: "CAD" });
  const { products: audProducts, isLoading: audLoading } = useGetGCProductsByCurrency({ currency: "AUD" });

  useEffect(() => {
    if (!usdLoading && !gbpLoading && !eurLoading && !cadLoading && !audLoading) {
      const combined = [
        ...(usdProducts || []),
        ...(gbpProducts || []),
        ...(eurProducts || []),
        ...(cadProducts || []),
        ...(audProducts || [])
      ];
      // Remove duplicates based on productId
      const unique = Array.from(new Map(combined.map(item => [item.productId, item])).values());
      setAllProducts(unique);
      setIsLoadingAllProducts(false);
    }
  }, [usdProducts, gbpProducts, eurProducts, cadProducts, audProducts, usdLoading, gbpLoading, eurLoading, cadLoading, audLoading]);


  const [product, setProduct] = useState<GiftCardProduct>();
  const [prices, setPrices] = useState<GiftCardPriceDetail[]>([]);

  const [productState, setProductState] = useState(false);
  const [priceState, setPriceState] = useState(false);
  const [openRedeemInstruction, setOpenRedeemInstruction] = useState(false);

  // FX Rate for Range products
  const [debouncedAmount, setDebouncedAmount] = useState<number>(0);

  // Form Schema
  const schema = useMemo(
    () =>
      yup.object().shape({
        currency: yup.string().required("Currency is required"),
        productId: yup.string().required("Product is required"),
        unitPrice: yup
          .number()
          .required("Amount is required")
          .typeError("Invalid amount")
          .test("min-max", "Amount is slightly outside the allowed range", function (value) {
            const { min, max } = this.options.context as any || {};
            // Only validate min/max if they exist (RANGE type)
            if (min !== undefined && value < min) return this.createError({ message: `Minimum amount is ${min}` });
            if (max !== undefined && value > max) return this.createError({ message: `Maximum amount is ${max}` });
            return true;
          }),
        quantity: yup
          .number()
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1")
          .default(1),
        amount: yup.number().required(), // Total Pay Amount (Naira)
      }),
    []
  );

  type FormData = yup.InferType<typeof schema>;

  const form = useForm<FormData>({
    defaultValues: {
      currency: "",
      productId: "",
      unitPrice: undefined,
      quantity: 1,
      amount: undefined,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
    context: {
      min: product?.minRecipientDenomination,
      max: product?.maxRecipientDenomination
    }
  });

  const { register, handleSubmit, formState, watch, setValue, clearErrors } = form;
  const { errors, isValid } = formState;

  const watchedProductId = watch("productId");
  const watchedUnitPrice = watch("unitPrice");
  const watchedQuantity = watch("quantity");

  // Fetch FX Rate when unitPrice changes for RANGE products
  const { fxRate, isLoading: fxLoading } = useGetGCFxRate({
    amount: debouncedAmount,
    currency: product?.recipientCurrencyCode || "USD",
  });

  // Debounce effect for amount input
  useEffect(() => {
    if (product?.denominationType === "RANGE" && watchedUnitPrice) {
      const handler = setTimeout(() => {
        setDebouncedAmount(watchedUnitPrice);
      }, 500);
      return () => clearTimeout(handler);
    }
  }, [watchedUnitPrice, product]);

  // Update calculated pay amount when FX rate comes in
  useEffect(() => {
    if (product?.denominationType === "RANGE" && fxRate) {
      // API usually returns data structure with rate or amount.
      // Based on usual patterns, handle both potential structures safely.
      // Assuming fxRate might be an object containing { rate, totalAmount } or just the amount.
      // If it's just the amount (number):
      if (typeof fxRate === 'number') {
        setValue("amount", fxRate * (watchedQuantity || 1));
      } else if (typeof fxRate === 'object') {
        // Check for common properties like rate, amount, totalAmount
        const rate = fxRate?.rate || fxRate?.exchangeRate;
        if (rate) {
          setValue("amount", watchedUnitPrice * Number(rate) * (watchedQuantity || 1));
        } else if (fxRate?.totalAmount || fxRate?.amount || fxRate?.senderAmount) {
          setValue("amount", Number(fxRate?.totalAmount || fxRate?.amount || fxRate?.senderAmount) * (watchedQuantity || 1));
        }
      }
    }
  }, [fxRate, watchedQuantity, setValue, watchedUnitPrice, product]);

  // Handle FIXED products amount update when quantity changes
  useEffect(() => {
    if (product?.denominationType === "FIXED" && watchedUnitPrice) {
      const selectedPrice = prices.find(p => p.price === watchedUnitPrice);
      if (selectedPrice) {
        setValue("amount", selectedPrice.amount * (watchedQuantity || 1));
      }
    }
  }, [watchedQuantity, watchedUnitPrice, product, prices, setValue]);


  const onSubmit = async (data: FormData) => {
    if (!product) {
      toast.error("Invalid product");
      return;
    }

    Promise.all([
      Promise.resolve(setAmount(String(data.amount))),
      Promise.resolve(
        setGiftCardDetails({
          product,
          currency: data.currency,
          productId: data.productId,
          quantity: data.quantity,
          unitPrice: data.unitPrice,
          amount: data.amount, // Total Pay Amount
        })
      ),
      Promise.resolve(setStage("two")),
    ]);
  };

  const productDropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(productDropdownRef, () => {
    setProductState(false);
  });

  const priceDropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(priceDropdownRef, () => {
    setPriceState(false);
  });

  // Update form context when product changes (for validation)
  useEffect(() => {
    // Re-trigger validation when product constraints change
    if (watchedUnitPrice) form.trigger("unitPrice");
  }, [product, form]);


  return (
    <>
      <div className="w-full py-5 xs:py-10 flex flex-col items-center justify-center">
        <div className="w-full sm:w-[85%] lg:w-[75%] xl:w-[65%] 2xl:w-[55%] dark:bg-[#000000] bg-transparent md:bg-[#F2F1EE] rounded-lg sm:rounded-xl p-0 2xs:p-4 md:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4 md:gap-6"
          >
            <h2 className="2xs:hidden text-2xl font-semibold text-text-800">
              Buy Gift Card
            </h2>

            {/* Gift Card Product Selection */}
            <div
              ref={productDropdownRef}
              className="relative w-full flex flex-col gap-1"
            >
              <label
                htmlFor="product"
                className="text-base text-text-200 dark:text-text-400 mb-1 flex items-start w-full"
              >
                Select Gift Card Product
              </label>
              <div
                onClick={() => {
                  setProductState(!productState);
                }}
                className="w-full flex gap-2 justify-center items-center bg-bg-2000 border border-border-600 rounded-lg py-4 px-3 cursor-pointer"
              >
                <div className="w-full flex items-center justify-between text-text-700 dark:text-text-1000">
                  {!product ? (
                    <p className="text-sm">Select product</p>
                  ) : (
                    <div className="flex items-center gap-2">
                      {product?.logoUrls?.[0] && (
                        <Image
                          src={product.logoUrls[0]}
                          alt={`${product.productName} logo`}
                          width={24}
                          height={24}
                          className="w-7 h-7 rounded-full"
                          unoptimized
                        />
                      )}
                      <p className="text-sm font-medium">
                        {product.productName}
                      </p>
                    </div>
                  )}
                  <motion.svg
                    animate={{
                      rotate: productState ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4 text-text-700 dark:text-text-1000 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </div>
              </div>

              {productState && (
                <div className="absolute top-full my-2.5 px-1 py-2 overflow-y-auto h-fit max-h-60 w-full bg-bg-600 border dark:bg-bg-1100 border-gray-300 dark:border-border-600 rounded-md shadow-md z-10 no-scrollbar">
                  <SearchableDropdown
                    items={allProducts}
                    searchKey="productName"
                    displayFormat={(prod) => (
                      <div className="flex items-center gap-2">
                        {prod.logoUrls?.[0] && (
                          <Image
                            src={prod.logoUrls[0]}
                            alt={`${prod.productName} logo`}
                            width={24}
                            height={24}
                            className="w-7 h-7 rounded-full"
                            unoptimized
                          />
                        )}
                        <div className="flex flex-col items-start text-start">
                          <p className="2xs:text-base text-sm font-medium text-text-200 dark:text-text-400">
                            {prod.productName}
                          </p>
                          {/* Show country code for disambiguation */}
                          <span className="text-xs text-text-400">{prod.country?.isoName} ({prod.recipientCurrencyCode})</span>
                        </div>
                      </div>
                    )}
                    onSelect={(prod) => {
                      setProduct(prod);
                      setValue("productId", String(prod.productId));
                      setValue("currency", prod.recipientCurrencyCode);

                      // Process prices if Fixed
                      if (prod.denominationType === "FIXED") {
                        setPrices(processGiftCardPrices(prod));
                      } else {
                        setPrices([]);
                      }

                      // Reset fields
                      setValue("unitPrice", 0);
                      setValue("amount", 0);

                      setProductState(false);
                      clearErrors("productId");
                    }}
                    showSearch={true}
                    placeholder="Search Gift Cards..."
                    isOpen={productState}
                    onClose={() => setProductState(false)}
                    isLoading={isLoadingAllProducts}
                  />
                </div>
              )}
              {errors?.productId?.message && (
                <p className="flex self-start text-red-500 font-semibold mt-0.5 text-sm">
                  {errors?.productId?.message}
                </p>
              )}
              {product?.redeemInstruction && (
                <button
                  type="button"
                  onClick={() => setOpenRedeemInstruction(true)}
                  className="w-fit text-primary text-xs font-semibold hover:underline flex self-end mt-1"
                >
                  View Redeem Instructions
                </button>
              )}
            </div>

            {/* Auto-detected Country / Currency Display */}
            {product && (
              <div className="flex flex-col gap-1 w-full text-black dark:text-white">
                <label className="text-base text-text-200 dark:text-text-400 mb-1">Country</label>
                <div className="w-full flex items-center gap-3 bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-4 px-3">
                  {product.country?.flagUrl && (
                    <Image
                      src={product.country.flagUrl}
                      alt={product.country.name}
                      width={32}
                      height={24}
                      className="rounded-sm"
                      unoptimized
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-200 dark:text-white">{product.country?.name || product.country?.isoName}</span>
                    <span className="text-xs text-text-500">Currency: {product.recipientCurrencyCode}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex flex-col justify-center items-center gap-1 w-full text-black dark:text-white">
              <label
                className="w-full text-sm sm:text-base font-medium  text-text-200 dark:text-text-800 mb-1 flex items-start "
                htmlFor={"quantity"}
              >
                Quantity
              </label>
              <div className="w-full flex gap-2 justify-center items-center bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-4 px-3">
                <input
                  className="w-full bg-transparent p-0 border-none outline-none text-base text-text-200 dark:text-white placeholder:text-text-200 dark:placeholder:text-text-1000 placeholder:text-sm"
                  placeholder={`Enter quantity`}
                  required={true}
                  type="number"
                  min={1}
                  {...register("quantity", {
                    valueAsNumber: true,
                  })}
                  onKeyDown={handleNumericKeyDown}
                />
              </div>

              {errors?.quantity?.message && (
                <p className="flex self-start text-red-500 font-semibold mt-0.5 text-sm">
                  {errors?.quantity?.message}
                </p>
              )}
            </div>

            {/* Price Selection / Input */}
            <div ref={priceDropdownRef} className="relative w-full flex flex-col gap-1">
              <label className="text-base text-text-200 dark:text-text-400 mb-1 flex items-start w-full">
                {product?.denominationType === "RANGE" ? "Enter Amount" : "Select Price"}
                {product ? ` (${product.recipientCurrencyCode})` : ""}
              </label>

              {product?.denominationType === "RANGE" ? (
                <div className="flex flex-col gap-1">
                  <div className="w-full flex gap-2 justify-center items-center bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-4 px-3">
                    <input
                      className="w-full bg-transparent p-0 border-none outline-none text-base text-text-200 dark:text-white placeholder:text-text-200 dark:placeholder:text-text-1000 placeholder:text-sm"
                      placeholder={`Range: ${product.minRecipientDenomination} - ${product.maxRecipientDenomination}`}
                      type="number"
                      {...register("unitPrice", { valueAsNumber: true })}
                      onKeyDown={handleNumericKeyDown}
                    />
                  </div>
                  {product.minRecipientDenomination && product.maxRecipientDenomination && (
                    <span className="text-xs text-primary flex self-start">
                      Allowed Range: {product.minRecipientDenomination} - {product.maxRecipientDenomination} {product.recipientCurrencyCode}
                    </span>
                  )}
                </div>
              ) : (
                <>
                  <div
                    onClick={() => {
                      if (product) setPriceState(!priceState);
                    }}
                    className={`w-full flex gap-2 justify-center items-center bg-bg-2000 border border-border-600 rounded-lg py-4 px-3 ${!product ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="w-full flex items-center justify-between text-text-700 dark:text-text-1000">
                      {!watchedUnitPrice ? (
                        <p className="text-sm">Select price</p>
                      ) : (
                        <p className="text-sm font-medium">{Number(watchedUnitPrice).toLocaleString()} {product?.recipientCurrencyCode}</p>
                      )}
                      <motion.svg
                        animate={{ rotate: priceState ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </div>
                  </div>
                  {priceState && (
                    <div className="absolute top-full my-2.5 px-1 py-2 overflow-y-auto h-fit max-h-60 w-full bg-bg-600 border dark:bg-bg-1100 border-gray-300 dark:border-border-600 rounded-md shadow-md z-10 no-scrollbar">
                      <SearchableDropdown
                        items={prices}
                        searchKey="price"
                        displayFormat={(price) => (
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-text-200 dark:text-text-400">
                              {price.price} {product?.recipientCurrencyCode}
                            </p>
                          </div>
                        )}
                        onSelect={(price) => {
                          setValue("unitPrice", price.price);

                          // For FIXED, we know the pay amount immediately
                          setValue("amount", price.amount * watchedQuantity);

                          setPriceState(false);
                          clearErrors("unitPrice");
                        }}
                        showSearch={false}
                        placeholder="Select Price"
                        isOpen={priceState}
                        onClose={() => setPriceState(false)}
                        isLoading={false}
                      />
                    </div>
                  )}
                </>
              )}
              {errors?.unitPrice?.message && (
                <p className="flex self-start text-red-500 font-semibold mt-0.5 text-sm">
                  {errors?.unitPrice?.message}
                </p>
              )}
            </div>

            {/* Total Pay Display */}
            <div className="flex flex-col gap-1 self-start text-sm text-primary w-full">
              {product?.denominationType === "RANGE" && fxLoading && (
                <div className="flex items-center gap-2">
                  <Skeleton width={100} />
                  <p className="text-xs text-gray-500">Calculating exchange rate...</p>
                </div>
              )}
              {watch("amount") && !fxLoading ? (
                <div className="w-full flex justify-between items-center py-2 border-t border-border-200 dark:border-border-700 mt-2">
                  <span className="font-medium text-text-200 dark:text-text-400">You Pay (NGN):</span>
                  <span className="font-bold text-lg text-primary">
                    ₦{Number(formatNumberWithoutExponential(watch("amount"), 2)).toLocaleString()}
                  </span>
                </div>
              ) : null}
            </div>

            <CustomButton
              type="submit"
              disabled={!isValid || (product?.denominationType === "RANGE" && fxLoading)}
              isLoading={product?.denominationType === "RANGE" && fxLoading}
              className="w-full border-2 dark:text-black dark:font-bold border-primary text-white text-base 2xs:text-lg max-2xs:px-6 py-3.5"
            >
              Next{" "}
            </CustomButton>
          </form>
        </div>
      </div>
      {product?.redeemInstruction && (
        <RedeemInstructionModal
          isOpen={openRedeemInstruction}
          onClose={() => setOpenRedeemInstruction(false)}
          instruction={product?.redeemInstruction}
        />
      )}
    </>
  );
};

export default BuyGiftCardStageOne;
