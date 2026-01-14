"use client";
import { getCurrencyIconByString } from "@/utils/utilityFunctions";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { useRef } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { Wallet } from "@/constants/types";
import { ICurrencyAccount } from "@/api/currency/currency.types";
import AddMoneyModal from "@/components/modals/AddMoneyModal";
import { createPortal } from "react-dom";

interface AccountOption {
  currency: string;
  balance: number;
  label: string;
  type: "wallet" | "currencyAccount";
}

const getCurrencySymbol = (currency: string): string => {
  const upper = currency.toUpperCase();
  switch (upper) {
    case "NGN":
      return "₦";
    case "USD":
      return "$";
    case "GBP":
      return "£";
    case "EUR":
      return "€";
    default:
      return "₦";
  }
};

const BalanceCard = ({
  wallets = [],
  currencyAccounts = [],
}: {
  wallets?: Wallet[];
  currencyAccounts?: ICurrencyAccount[];
}) => {
  // Combine wallets and currency accounts into account options
  // Only include unique accounts - if only NGN wallet exists, don't show dropdown
  const accountOptions: AccountOption[] = useMemo(() => {
    const options: AccountOption[] = [];
    const seenCurrencies = new Set<string>();
    
    // Add wallets (NGN accounts) - only add one NGN account
    wallets.forEach((wallet) => {
      const currency = wallet.currency.toUpperCase();
      // Only add NGN wallet if not already added
      if (currency === "NGN" && !seenCurrencies.has("NGN")) {
        options.push({
          currency: currency,
          balance: wallet.balance || 0,
          label: `${currency} Account`,
          type: "wallet",
        });
        seenCurrencies.add("NGN");
      }
    });
    
    // Add currency accounts (USD, EUR, GBP) - only add unique currencies
    currencyAccounts.forEach((account) => {
      const currency = (account.currency || "").toUpperCase();
      if (currency && !seenCurrencies.has(currency)) {
        options.push({
          currency: currency,
          balance: account.balance || 0,
          label: account.label || `${currency} Account`,
          type: "currencyAccount",
        });
        seenCurrencies.add(currency);
      }
    });
    
    return options;
  }, [wallets, currencyAccounts]);

  // Get initial selected account (first available)
  const initialAccount = accountOptions[0];
  const [selectedAccount, setSelectedAccount] = useState<AccountOption | null>(initialAccount || null);

  // Update selected account when options change
  useEffect(() => {
    if (accountOptions.length > 0 && !selectedAccount) {
      setSelectedAccount(accountOptions[0]);
    } else if (selectedAccount && accountOptions.length > 0) {
      // Update balance if account still exists
      const updated = accountOptions.find(
        (opt) => opt.currency === selectedAccount.currency && opt.type === selectedAccount.type
      );
      if (updated) {
        setSelectedAccount(updated);
      }
    }
  }, [accountOptions, selectedAccount]);

  const currentCurrency = selectedAccount?.currency.toLowerCase() || "ngn";
  const currentBalance = selectedAccount?.balance || 0;

  const [isBalanceVisible, setBalanceVisible] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(
        `walletBalanceVisibility-${currentCurrency}`
      );
      return stored === null || stored === "true";
    }
    return true;
  });

  const toggleBalanceVisibility = () => {
    const newValue = !isBalanceVisible;
    setBalanceVisible(newValue);
    localStorage.setItem(`walletBalanceVisibility-${currentCurrency}`, String(newValue));
  };

  // Dropdown
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, () => setOpen(false));

  // Add Money Modal
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const currencySymbol = getCurrencySymbol(currentCurrency);

  // Track viewport to decide where to render dropdown
  useEffect(() => {
    const mq = typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)") : null;
    const update = () => setIsDesktop(Boolean(mq?.matches));
    update();
    mq?.addEventListener("change", update);
    return () => mq?.removeEventListener("change", update);
  }, []);

  const getCurrencyFlag = (currency: string): string => {
    const upper = currency.toUpperCase();
    switch (upper) {
      case "NGN":
        return "🇳🇬";
      case "GBP":
        return "🇬🇧";
      case "USD":
        return "🇺🇸";
      case "EUR":
        return "🇪🇺";
      default:
        return "💰";
    }
  };

  if (accountOptions.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#D4B139] rounded-xl px-4 py-4 flex flex-col gap-2 sm:gap-3 relative z-20">
      {/* Header: currency icon + account label */}
      <div className="relative flex items-center gap-2">
        <Image 
          src={getCurrencyIconByString(currentCurrency) || ""} 
          alt="currency" 
          className="w-8 h-8" 
        />
        <p className="text-[#141414] text-sm sm:text-base font-semibold uppercase flex-1">
          {selectedAccount?.label || `${currentCurrency.toUpperCase()} Account`}
        </p>
        {/* Only show dropdown if there are 2 or more accounts (i.e., at least one currency account besides NGN) */}
        {accountOptions.length > 1 && (
          <MdKeyboardArrowDown 
            onClick={() => setOpen((v) => !v)} 
            className="ml-1 cursor-pointer hover:opacity-70 transition-opacity text-[#141414]" 
          />
        )}

        {open && accountOptions.length > 1 && (
          isDesktop ? (
            <div
              ref={menuRef}
              className="absolute right-0 top-9 z-50 w-56 rounded-xl bg-bg-600 dark:bg-bg-2200 border border-border-800 dark:border-border-700 shadow-2xl p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-text-200 dark:text-text-800 font-semibold">Select Account</p>
                <MdClose onClick={() => setOpen(false)} className="cursor-pointer" />
              </div>
              {accountOptions.map((opt, idx, arr) => (
                <button
                  key={`${opt.type}-${opt.currency}-${idx}`}
                  onClick={() => {
                    setSelectedAccount(opt);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 py-2.5 ${idx !== arr.length - 1 ? "border-b border-border-800 dark:border-border-700" : ""}`}
                >
                  <span className="text-lg">{getCurrencyFlag(opt.currency)}</span>
                  <span className="text-left text-text-200 dark:text-text-800 text-sm flex-1">{opt.label}</span>
                  <span
                    className={`w-3.5 h-3.5 rounded-full border ${
                      selectedAccount?.currency === opt.currency && selectedAccount?.type === opt.type
                        ? "bg-secondary border-secondary"
                        : "border-border-800 dark:border-border-700"
                    }`}
                  ></span>
                </button>
              ))}
            </div>
          ) : (
            typeof document !== "undefined"
              ? createPortal(
                  <div className="fixed inset-0 z-[100000]" onClick={() => setOpen(false)}>
                    <div className="absolute inset-0" />
                    <div
                      ref={menuRef}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-4 top-[110px] z-[100001] w-56 rounded-xl bg-bg-600 dark:bg-bg-2200 border border-border-800 dark:border-border-700 shadow-2xl p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-text-200 dark:text-text-800 font-semibold">Select Account</p>
                        <MdClose onClick={() => setOpen(false)} className="cursor-pointer" />
                      </div>
                      {accountOptions.map((opt, idx, arr) => (
                        <button
                          key={`${opt.type}-${opt.currency}-${idx}`}
                          onClick={() => {
                            setSelectedAccount(opt);
                            setOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 py-2.5 ${idx !== arr.length - 1 ? "border-b border-border-800 dark:border-border-700" : ""}`}
                        >
                          <span className="text-lg">{getCurrencyFlag(opt.currency)}</span>
                          <span className="text-left text-text-200 dark:text-text-800 text-sm flex-1">{opt.label}</span>
                          <span
                            className={`w-3.5 h-3.5 rounded-full border ${
                              selectedAccount?.currency === opt.currency && selectedAccount?.type === opt.type
                                ? "bg-secondary border-secondary"
                                : "border-border-800 dark:border-border-700"
                            }`}
                          ></span>
                        </button>
                      ))}
                    </div>
                  </div>,
                  document.body
                )
              : null
          )
        )}
      </div>

      {/* Subtitle + eye toggle */}
      <div className="flex items-center gap-2 font-semibold">
        <p className="text-[#141414] text-xs sm:text-sm">Main Balance</p>
        {isBalanceVisible ? (
          <FiEyeOff onClick={toggleBalanceVisibility} className="cursor-pointer text-[#141414] text-base" />
        ) : (
          <FiEye onClick={toggleBalanceVisibility} className="cursor-pointer text-[#141414] text-base" />
        )}
      </div>

      {/* Amount + yellow action */}
      <div className="flex items-center justify-between">
        <p className="text-[#141414] text-2xl sm:text-3xl font-semibold">
          {isBalanceVisible 
            ? `${currencySymbol} ${currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
            : "---"}
        </p>
        <button
          type="button"
          aria-label="add"
          onClick={() => setIsAddMoneyModalOpen(true)}
          className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#141414] text-white font-bold grid place-items-center hover:bg-[#2a2a2a] transition-colors cursor-pointer text-xl"
        >
          +
        </button>
      </div>

      {/* Add Money Modal */}
      <AddMoneyModal 
        isOpen={isAddMoneyModalOpen} 
        onClose={() => setIsAddMoneyModalOpen(false)} 
      />
    </div>
  );
};

export default BalanceCard;
