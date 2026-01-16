"use client";

import React from "react";
import { FiPlus, FiEye, FiEyeOff, FiArrowUp } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { useGetCurrencyAccounts } from "@/api/currency/currency.queries";
import { getCurrencyIconByString } from "@/utils/utilityFunctions";
import Image from "next/image";
import MultiCurrencyAccountDetails from "./MultiCurrencyAccountDetails";
import CreateCurrencyAccountModal from "@/components/modals/currency/CreateCurrencyAccountModal";
import AddMoneyModal from "@/components/modals/AddMoneyModal";
import CurrencyAccountsListModal from "@/components/modals/currency/CurrencyAccountsListModal";
import { LuArrowUpRight, LuPlus, LuCoins } from "react-icons/lu";
import { RiSwapLine, RiSendPlane2Line, RiArrowDownLine, RiUser3Line } from "react-icons/ri";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import ErrorToast from "@/components/toast/ErrorToast";

const MultiCurrencyContent: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = React.useState<"USD" | "EUR" | "GBP" | null>(null);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = React.useState(false);
  const [openAccountsList, setOpenAccountsList] = React.useState(false);
  const [balanceVisible, setBalanceVisible] = React.useState<Record<string, boolean>>({});
  const [activeDots, setActiveDots] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const { accounts, isPending, refetch } = useGetCurrencyAccounts();

  const accountsList = Array.isArray(accounts) ? accounts : [];
  const currencyAccounts = accountsList.filter((acc: any) =>
    acc?.currency && ["USD", "EUR", "GBP"].includes(String(acc.currency).toUpperCase())
  );

  React.useEffect(() => {
    if (currencyAccounts.length > 0 && !selectedCurrency) {
      const firstCurrency = String(currencyAccounts[0].currency).toUpperCase() as "USD" | "EUR" | "GBP";
      setSelectedCurrency(firstCurrency);
    }
  }, [currencyAccounts, selectedCurrency]);

  // Handle scroll to update selected currency
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || currencyAccounts.length === 0) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const cardWidth = containerWidth - 32;
      const gap = 12;
      const cardIndex = Math.round(scrollLeft / (cardWidth + gap));

      if (cardIndex >= 0 && cardIndex < currencyAccounts.length) {
        const account = currencyAccounts[cardIndex];
        const currency = String(account.currency).toUpperCase() as "USD" | "EUR" | "GBP";
        if (selectedCurrency !== currency) {
          setSelectedCurrency(currency);
        }
      }
    };

    let scrollTimeout: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 150);
    };

    container.addEventListener('scroll', debouncedHandleScroll, { passive: true });

    const handleScrollEnd = () => {
      clearTimeout(scrollTimeout);
      handleScroll();
    };

    container.addEventListener('scrollend', handleScrollEnd, { passive: true });

    return () => {
      container.removeEventListener('scroll', debouncedHandleScroll);
      container.removeEventListener('scrollend', handleScrollEnd);
      clearTimeout(scrollTimeout);
    };
  }, [currencyAccounts, selectedCurrency]);

  // Scroll to selected currency when it changes (for dot navigation)
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || currencyAccounts.length === 0 || !selectedCurrency) return;

    const accountIndex = currencyAccounts.findIndex((acc: any) => {
      const currency = String(acc.currency).toUpperCase() as "USD" | "EUR" | "GBP";
      return currency === selectedCurrency;
    });

    if (accountIndex >= 0) {
      const containerWidth = container.offsetWidth;
      const cardWidth = containerWidth - 32;
      const gap = 12;
      const scrollPosition = accountIndex * (cardWidth + gap);

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [selectedCurrency, currencyAccounts]);

  React.useEffect(() => {
    const handleTriggerAccountList = () => setOpenAccountsList(true);
    window.addEventListener('trigger-account-list', handleTriggerAccountList);
    return () => window.removeEventListener('trigger-account-list', handleTriggerAccountList);
  }, []);

  const handleCreateSuccess = () => {
    setOpenCreate(false);
    refetch();
  };

  const formatBalance = (balance: number | undefined, currency: string) => {
    if (balance === undefined || balance === null) return "0.00";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(balance);
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency.toUpperCase()) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      default:
        return currency.toUpperCase();
    }
  };

  const toggleBalanceVisibility = (currency: string) => {
    setBalanceVisible((prev) => ({
      ...prev,
      [currency]: !prev[currency],
    }));
  };

  const QuickAction = ({ icon: Icon, title, onClick, comingSoon }: { icon: any, title: string, onClick: () => void, comingSoon?: boolean }) => (
    <button
      onClick={comingSoon ? () => ErrorToast({ title: "Feature Coming Soon", descriptions: ["This feature will be available shortly."] }) : onClick}
      type="button"
      className={`flex flex-col items-center gap-1.5 group cursor-pointer w-full bg-transparent border-none outline-none ${comingSoon ? 'opacity-60' : ''}`}
    >
      <div className="w-12 h-12 2xs:w-14 2xs:h-14 rounded-2xl bg-[#D4B139] flex items-center justify-center transition-all group-hover:bg-[#c7a42f] group-hover:scale-105 active:scale-95">
        <Icon className="text-xl 2xs:text-2xl text-black" />
      </div>
      <p className="text-white text-[11px] 2xs:text-xs font-semibold text-center leading-tight whitespace-break-spaces">{title}</p>
    </button>
  );

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Header */}
      <div className="w-full flex-col gap-3 flex">
        <div className="w-full flex items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white">Multi-Currency</h1>
            <p className="text-white/60 text-xs sm:text-sm mt-1">Manage your USD, EUR, and GBP accounts</p>
          </div>
          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center gap-2 bg-[#D4B139] hover:bg-[#c7a42f] text-black px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <FiPlus className="text-base" />
            <span className="hidden sm:inline">Create Account</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>
      </div>

      {/* Account Cards - Show only active on Mobile, Grid on Desktop */}
      <div className="w-full">
        {/* Mobile - Horizontal scrollable cards */}
        <div className="sm:hidden">
          {isPending ? (
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 snap-x snap-mandatory">
              <div className="flex gap-3 min-w-max">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-bg-600 dark:bg-bg-1100 rounded-3xl px-4 py-5 2xs:py-6 flex flex-col gap-3 sm:gap-4 animate-pulse w-[calc(100vw-2rem)] flex-shrink-0 snap-start"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/10" />
                      <div className="h-4 w-24 bg-white/10 rounded" />
                    </div>
                    <div className="h-3 w-20 bg-white/10 rounded" />
                    <div className="h-8 w-32 bg-white/10 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : currencyAccounts.length > 0 ? (
            <>
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide px-4 snap-x snap-mandatory"
                style={{ WebkitOverflowScrolling: 'touch' }}
                onScroll={(e) => {
                  const scrollLeft = e.currentTarget.scrollLeft;
                  const containerWidth = e.currentTarget.offsetWidth;
                  const cardWidth = containerWidth - 32;
                  const gap = 12;
                  const index = Math.round(scrollLeft / (cardWidth + gap));
                  setActiveDots(index);
                }}
              >
                <div className="flex gap-3 w-full">
                  {currencyAccounts.map((account: any) => {
                    const currency = String(account.currency).toUpperCase() as "USD" | "EUR" | "GBP";
                    const isActive = selectedCurrency === currency;
                    const balance = account.balance || 0;
                    const isVisible = balanceVisible[currency] !== false;

                    return (
                      <div
                        key={account.id || account.currency}
                        onClick={() => setSelectedCurrency(currency)}
                        className={`rounded-3xl p-5 2xs:p-6 flex flex-col gap-5 cursor-pointer transition-all flex-shrink-0 snap-center w-full min-w-full max-w-[500px] mx-auto ${isActive
                          ? "bg-[#D4B139] text-black"
                          : "bg-bg-600 dark:bg-bg-1100 text-white"
                          }`}
                      >
                        {/* Header: icon + Main Balance + Transaction History */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? "bg-black/15" : "bg-white/10"}`}>
                              <IoWalletOutline className={`text-lg ${isActive ? "text-black" : "text-white"}`} />
                            </div>
                            <span className="font-semibold text-base sm:text-lg">Main Balance</span>
                          </div>
                          <div className="flex items-center gap-1 font-semibold text-sm sm:text-base opacity-90">
                            <span>Transaction History</span>
                            <MdKeyboardArrowRight className="text-xl" />
                          </div>
                        </div>

                        {/* Amount + eye toggle + plus */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <p className="text-3xl sm:text-4xl font-bold">
                              {isVisible
                                ? `${getCurrencySymbol(currency)}${formatBalance(balance, currency)}`
                                : "••••••"}
                            </p>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBalanceVisibility(currency);
                              }}
                              className="cursor-pointer opacity-80"
                            >
                              {isVisible ? <FiEyeOff className="text-2xl" /> : <FiEye className="text-2xl" />}
                            </div>
                          </div>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? "bg-black text-[#D4B139]" : "bg-[#D4B139] text-black"}`}>
                            <FiPlus className="text-2xl font-bold" />
                          </div>
                        </div>

                        <div className={`h-[1px] w-full ${isActive ? "bg-black/20" : "bg-white/10"}`} />

                        {/* Rate + conversion button */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-0.5">
                            <p className="font-semibold text-sm sm:text-base">
                              {currency} - NGN = {currency === "GBP" ? "₦2,150" : currency === "EUR" ? "₦1,850" : "₦1,680"}
                            </p>
                            <div className="flex items-center gap-1 opacity-70 text-[10px] sm:text-xs">
                              <FiArrowUp className={isActive ? "text-black" : "text-green-600"} />
                              <span className={isActive ? "text-black" : ""}>0.34% today</span>
                            </div>
                          </div>
                          <button className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${isActive ? "bg-black text-[#D4B139]" : "bg-[#D4B139] text-black"}`}>
                            {currency} Conversion
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Create Account Card */}
                  {currencyAccounts.length < 3 && (
                    <div
                      onClick={() => setOpenCreate(true)}
                      className="bg-bg-600 dark:bg-bg-1100 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer border-2 border-dashed border-white/20 hover:border-white/40 hover:bg-white/5 transition-all min-h-[220px] w-[calc(100vw-2rem)] flex-shrink-0 snap-start"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#D4B139]/20 grid place-items-center text-[#D4B139]">
                        <FiPlus className="text-2xl" />
                      </div>
                      <div className="flex flex-col items-center gap-1 text-center">
                        <p className="text-white text-lg font-semibold">Create Account</p>
                        <p className="text-white/40 text-sm">USD, EUR, or GBP</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: currencyAccounts.length + (currencyAccounts.length < 3 ? 1 : 0) }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full transition-all ${activeDots === i ? "bg-white w-4" : "bg-white/30"}`}
                  />
                ))}
              </div>

              {/* Quick Action Buttons for Mobile */}
              <div className="mt-8 mb-6 px-4">
                <div className="grid grid-cols-4 gap-2 2xs:gap-3">
                  <QuickAction
                    icon={RiSendPlane2Line}
                    title="Add Destination"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('trigger-destination'));
                      const el = document.getElementById('account-details-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                  <QuickAction
                    icon={RiSwapLine}
                    title={`Transfer ${selectedCurrency || ''}`}
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('trigger-payout'));
                      const el = document.getElementById('account-details-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                  <QuickAction
                    icon={RiArrowDownLine}
                    title={`Withdraw ${selectedCurrency || ''}`}
                    comingSoon
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('trigger-payout'));
                      const el = document.getElementById('account-details-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                  <QuickAction
                    icon={RiUser3Line}
                    title="Account"
                    onClick={() => setOpenAccountsList(true)}
                  />
                </div>
              </div>
            </>
          ) : (
            <div
              onClick={() => setOpenCreate(true)}
              className="mx-2 bg-bg-600 dark:bg-bg-1100 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer border-2 border-dashed border-white/20 hover:border-white/40 hover:bg-white/5 transition-all min-h-[220px] w-[calc(100%-1rem)]"
            >
              <div className="w-12 h-12 rounded-full bg-[#D4B139]/20 grid place-items-center text-[#D4B139]">
                <FiPlus className="text-2xl" />
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-white text-lg font-semibold">Create Account</p>
                <p className="text-white/40 text-sm">USD, EUR, or GBP</p>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {isPending ? (
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-bg-600 dark:bg-bg-1100 rounded-3xl px-4 py-5 2xs:py-6 flex flex-col gap-3 sm:gap-4 animate-pulse"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-white/10" />
                  <div className="h-4 w-24 bg-white/10 rounded" />
                </div>
                <div className="h-3 w-20 bg-white/10 rounded" />
                <div className="h-8 w-32 bg-white/10 rounded" />
              </div>
            ))
          ) : (
            <>
              {currencyAccounts.map((account: any) => {
                const currency = String(account.currency).toUpperCase() as "USD" | "EUR" | "GBP";
                const isActive = selectedCurrency === currency;
                const balance = account.balance || 0;
                const isVisible = balanceVisible[currency] !== false;

                return (
                  <div
                    key={account.id || account.currency}
                    onClick={() => setSelectedCurrency(currency)}
                    className={`rounded-3xl p-6 flex flex-col gap-6 cursor-pointer transition-all border-2 ${isActive
                      ? "bg-[#D4B139] border-[#D4B139] text-black shadow-xl"
                      : "bg-bg-600 dark:bg-bg-1100 border-white/5 text-white hover:border-white/10"
                      }`}
                  >
                    {/* Header: icon + Main Balance + Transaction History */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? "bg-black/15" : "bg-white/10"}`}>
                          <IoWalletOutline className={`text-lg ${isActive ? "text-black" : "text-white"}`} />
                        </div>
                        <span className="font-semibold text-lg">Main Balance</span>
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCurrency(currency);
                          setTimeout(() => {
                            const el = document.getElementById('account-details-section');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }, 50);
                        }}
                        className="flex items-center gap-1 font-semibold text-sm opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <span>History</span>
                        <MdKeyboardArrowRight className="text-xl" />
                      </div>
                    </div>

                    {/* Amount + eye toggle + plus */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <p className="text-3xl font-bold">
                          {isVisible
                            ? `${getCurrencySymbol(currency)}${formatBalance(balance, currency)}`
                            : "••••••"}
                        </p>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBalanceVisibility(currency);
                          }}
                          className="cursor-pointer opacity-80 hover:opacity-100"
                        >
                          {isVisible ? <FiEyeOff className="text-2xl" /> : <FiEye className="text-2xl" />}
                        </div>
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAddMoneyModalOpen(true);
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${isActive ? "bg-black text-[#D4B139]" : "bg-[#D4B139] text-black"}`}
                      >
                        <FiPlus className="text-2xl font-bold" />
                      </div>
                    </div>

                    <div className={`h-[1px] w-full ${isActive ? "bg-black/20" : "bg-white/10"}`} />

                    {/* Rate + conversion button */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex flex-col gap-0.5">
                        <p className="font-semibold text-sm">
                          {currency} - NGN = {currency === "GBP" ? "₦2,150" : currency === "EUR" ? "₦1,850" : "₦1,680"}
                        </p>
                        <div className="flex items-center gap-1 opacity-70 text-xs text-white/70">
                          <FiArrowUp className={isActive ? "text-black" : "text-green-600"} />
                          <span className={isActive ? "text-black font-medium" : ""}>0.34% today</span>
                        </div>
                      </div>
                      <button className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-transform active:scale-95 ${isActive ? "bg-black text-[#D4B139]" : "bg-[#D4B139] text-black"}`}>
                        {currency} Conversion
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Create Account Card */}
              {currencyAccounts.length < 3 && (
                <div
                  onClick={() => setOpenCreate(true)}
                  className="bg-bg-600 dark:bg-bg-1100 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer border-2 border-dashed border-white/20 hover:border-white/40 hover:bg-white/5 transition-all min-h-[220px]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#D4B139]/20 grid place-items-center text-[#D4B139]">
                    <FiPlus className="text-2xl" />
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <p className="text-white text-lg font-semibold">Create Account</p>
                    <p className="text-white/40 text-sm">USD, EUR, or GBP</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Account Details Section */}
      <div id="account-details-section">
        {selectedCurrency ? (
          <MultiCurrencyAccountDetails currency={selectedCurrency} onRefetch={refetch} />
        ) : currencyAccounts.length === 0 ? (
          <div className="rounded-2xl bg-bg-600 dark:bg-bg-1100 border border-white/10 p-8 sm:p-12 flex flex-col items-center justify-center gap-4">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border-4 border-white/10">
              <FiPlus className="text-4xl text-white/40" />
            </div>
            <div className="text-center">
              <p className="text-white text-base sm:text-lg mb-2">No multi-currency accounts yet</p>
              <p className="text-white/60 text-sm mb-4">Create your first USD, EUR, or GBP account to get started</p>
              <button
                onClick={() => setOpenCreate(true)}
                className="bg-[#D4B139] hover:bg-[#c7a42f] text-black px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Create Account
              </button>
            </div>
          </div>
        ) : null}

        {/* Create Account Modal */}

        <CreateCurrencyAccountModal
          isOpen={openCreate}
          onClose={() => setOpenCreate(false)}
          onSuccess={handleCreateSuccess}
        />

        {/* 5. Render the AddMoneyModal */}
        <AddMoneyModal
          isOpen={isAddMoneyModalOpen}
          onClose={() => setIsAddMoneyModalOpen(false)}
        />

        <CurrencyAccountsListModal
          isOpen={openAccountsList}
          onClose={() => setOpenAccountsList(false)}
        />
      </div>
    </div>
  );
};

export default MultiCurrencyContent;
