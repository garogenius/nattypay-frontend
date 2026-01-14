"use client";
import { getCurrencyIconByString } from "@/utils/utilityFunctions";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Wallet } from "@/constants/types";
import { ICurrencyAccount } from "@/api/currency/currency.types";
import AddMoneyModal from "@/components/modals/AddMoneyModal";
import { IoWalletOutline } from "react-icons/io5";

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

  // Add Money Modal
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);

  const currencySymbol = getCurrencySymbol(currentCurrency);

  if (accountOptions.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#D4B139] rounded-xl px-4 py-4 flex flex-col gap-2 sm:gap-3 relative z-20">
      {/* Header: icon + Main Balance + Transaction History */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-black/15 grid place-items-center text-[#141414]">
            <IoWalletOutline className="text-lg" />
          </div>
          <p className="text-[#141414] text-base sm:text-lg font-semibold">Main Balance</p>
        </div>
        <Link
          href="/user/transactions"
          className="flex items-center gap-1 text-[#141414] text-sm sm:text-base font-semibold hover:opacity-80 transition-opacity"
        >
          <span>Transaction History</span>
          <MdKeyboardArrowRight className="text-lg" />
        </Link>
      </div>

      {/* Amount + add action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-[#141414] text-3xl sm:text-4xl font-semibold leading-none">
            {isBalanceVisible 
              ? `${currencySymbol}${currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
              : "---"}
          </p>
          {isBalanceVisible ? (
            <FiEyeOff onClick={toggleBalanceVisibility} className="cursor-pointer text-[#141414] text-xl" />
          ) : (
            <FiEye onClick={toggleBalanceVisibility} className="cursor-pointer text-[#141414] text-xl" />
          )}
        </div>
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
