"use client";

import React from "react";
import { CgClose } from "react-icons/cg";
import { useGetCurrencyAccounts } from "@/api/currency/currency.queries";
import Image from "next/image";
import { getCurrencyIconByString } from "@/utils/utilityFunctions";
import { LuCopy } from "react-icons/lu";
import toast from "react-hot-toast";

interface CurrencyAccountsListModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CurrencyAccountsListModal: React.FC<CurrencyAccountsListModalProps> = ({
    isOpen,
    onClose,
}) => {
    const { accounts, isPending } = useGetCurrencyAccounts();
    const accountsList = Array.isArray(accounts) ? accounts : [];
    const currencyAccounts = accountsList.filter((acc: any) =>
        acc?.currency && ["USD", "EUR", "GBP"].includes(String(acc.currency).toUpperCase())
    );

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Account number copied!");
    };

    if (!isOpen) return null;

    return (
        <div className="z-[999999] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 flex justify-center items-center w-full md:inset-0 h-[100dvh]">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-black/80 dark:bg-black/60" onClick={onClose} />
            </div>
            <div className="relative mx-2.5 2xs:mx-4 bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 px-0 py-5 w-full max-w-lg max-h-[90vh] rounded-2xl overflow-hidden flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 cursor-pointer bg-bg-1400 rounded-full hover:bg-bg-1200 transition-colors z-10"
                >
                    <CgClose className="text-xl text-text-200 dark:text-text-400" />
                </button>

                <div className="px-5 sm:px-6 mb-6">
                    <h2 className="text-white text-lg font-semibold">Your Accounts</h2>
                    <p className="text-white/60 text-sm">View your available currency account details</p>
                </div>

                <div className="flex-1 overflow-y-auto px-5 sm:px-6 space-y-4 pb-4 no-scrollbar">
                    {isPending ? (
                        <div className="space-y-4 animate-pulse">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-24 bg-white/5 rounded-xl border border-white/10" />
                            ))}
                        </div>
                    ) : currencyAccounts.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-white/40 text-sm">No accounts found</p>
                        </div>
                    ) : (
                        currencyAccounts.map((account: any) => (
                            <div
                                key={account.id}
                                className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3 group hover:border-[#D4B139]/40 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={getCurrencyIconByString(String(account.currency).toLowerCase()) || ""}
                                            alt={account.currency}
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div>
                                            <p className="text-white font-medium">{account.label || `${account.currency} Account`}</p>
                                            <p className="text-white/40 text-xs">{account.bankName || "Digital Bank"}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[#D4B139] font-bold">
                                            {account.currency} {account.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                </div>

                                <div className="h-[1px] w-full bg-white/5" />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Account Number</p>
                                        <p className="text-white text-sm font-mono tracking-tight">{account.accountNumber}</p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(account.accountNumber)}
                                        className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-[#D4B139] hover:bg-[#D4B139]/10 transition-all"
                                    >
                                        <LuCopy className="text-lg" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CurrencyAccountsListModal;
