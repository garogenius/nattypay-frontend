"use client";

import React from "react";
import { CgClose } from "react-icons/cg";
import { useCreateCurrencyAccountPayoutDestination, useGetBanksByCurrency } from "@/api/currency/currency.queries";
import { useVerifyAccount, useGetMatchedBanks } from "@/api/wallet/wallet.queries";
import { verifyAccountRequest } from "@/api/wallet/wallet.apis";
import CustomButton from "@/components/shared/Button";
import SpinnerLoader from "@/components/Loader/SpinnerLoader";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import { ICurrencyAccount } from "@/api/currency/currency.types";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { FiChevronDown, FiCheckCircle } from "react-icons/fi";
import SearchableDropdown from "@/components/shared/SearchableDropdown";

interface CreatePayoutDestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: ICurrencyAccount;
  onSuccess: () => void;
  initialType?: "wire" | "nip" | "stablecoin";
}

const CreatePayoutDestinationModal: React.FC<CreatePayoutDestinationModalProps> = ({
  isOpen,
  onClose,
  account,
  onSuccess,
  initialType = "wire",
}) => {
  const [type, setType] = React.useState<"wire" | "nip" | "stablecoin">(initialType);

  // Common State
  const [label, setLabel] = React.useState("");

  // NIP / Wire State
  const [accountNumber, setAccountNumber] = React.useState("");
  const [accountType, setAccountType] = React.useState<"personal" | "business">("personal");
  const [beneficiaryName, setBeneficiaryName] = React.useState("");
  const [bankName, setBankName] = React.useState(""); // For Wire manual entry
  const [routingNumber, setRoutingNumber] = React.useState("");
  const [beneficiaryAddress, setBeneficiaryAddress] = React.useState("");

  // NIP Specific
  const [nipCurrency, setNipCurrency] = React.useState("NGN");
  const [selectedBank, setSelectedBank] = React.useState<{ code: string; name: string } | null>(null);
  const [bankOpen, setBankOpen] = React.useState(false);
  const bankRef = React.useRef<HTMLDivElement>(null);
  const [isDetectingBank, setIsDetectingBank] = React.useState(false);
  const detectReqIdRef = React.useRef(0);
  const [matchedBanks, setMatchedBanks] = React.useState<Array<{ bankCode: string; name: string }>>([]);

  // Stablecoin State
  const [stablecoinCurrency, setStablecoinCurrency] = React.useState("USDC");
  const [stablecoinNetwork, setStablecoinNetwork] = React.useState("POL");
  const [addressCode, setAddressCode] = React.useState("");

  useOnClickOutside(bankRef, () => setBankOpen(false));

  const currency = account?.currency || "USD";
  const banksCurrency = type === "nip" ? nipCurrency : currency;
  const { banks, isPending: banksLoading } = useGetBanksByCurrency(banksCurrency);

  React.useEffect(() => {
    setSelectedBank(null);
  }, [nipCurrency]);

  React.useEffect(() => {
    if (isOpen) {
      setType(initialType);
      resetForm();
    }
  }, [isOpen, initialType]);

  const resetForm = () => {
    setLabel("");
    setAccountNumber("");
    setAccountType("personal");
    setBeneficiaryName("");
    setBankName("");
    setRoutingNumber("");
    setBeneficiaryAddress("");
    setNipCurrency("NGN");
    setSelectedBank(null);
    setBankOpen(false);
    setStablecoinCurrency("USDC");
    setStablecoinNetwork("POL");
    setAddressCode("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const onError = (error: any) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage)
      ? errorMessage
      : [errorMessage || "Failed to create payout destination"];
    ErrorToast({
      title: "Creation Failed",
      descriptions,
    });
  };

  const onSuccessCallback = () => {
    SuccessToast({
      title: "Destination Created",
      description: "Payout destination created successfully",
    });
    handleClose();
    onSuccess();
  };

  const { mutate: verifyAccount, isPending: verifyLoading } = useVerifyAccount(
    () => {
      setBeneficiaryName("");
    },
    (data: any) => {
      const responseData = data?.data?.data || data?.data || data;
      const accName = responseData?.accountName || responseData?.account_name || "";
      setBeneficiaryName(accName);
    }
  );

  const { mutate: getMatchedBanks, isPending: matchedBanksLoading } = useGetMatchedBanks(
    () => setMatchedBanks([]),
    (data: any) => {
      const raw = data?.data?.data ?? data?.data ?? data;
      const list = Array.isArray(raw) ? raw : Array.isArray(raw?.banks) ? raw.banks : [];
      const normalized = list.map((b: any) => ({
        bankCode: String(b?.bankCode ?? b?.code ?? b?.bank_code ?? ""),
        name: String(b?.name ?? b?.bankName ?? b?.bank_name ?? ""),
      })).filter((b: any) => !!b.bankCode && !!b.name);
      setMatchedBanks(normalized);
    }
  );

  const tryAutoDetectBank = async (acctNumber: string, candidates?: Array<{ bankCode: string; name: string }>) => {
    const reqId = ++detectReqIdRef.current;
    setIsDetectingBank(true);
    try {
      const sourceBanks = candidates && candidates.length > 0 ? candidates : (banks || []).map((b: any) => ({
        bankCode: String(b?.code ?? b?.bankCode ?? b?.bank_code ?? ""),
        name: String(b?.name ?? b?.bankName ?? b?.bank_name ?? ""),
      })).filter((b: any) => !!b.bankCode);

      for (const b of sourceBanks) {
        try {
          const res = await verifyAccountRequest({ accountNumber: acctNumber, bankCode: b.bankCode });
          if (detectReqIdRef.current !== reqId) return;
          const responseData = res?.data?.data || res?.data || {};
          const accName = responseData?.accountName || responseData?.account_name || "";
          if (accName) {
            setSelectedBank({ code: b.bankCode, name: b.name });
            setBeneficiaryName(accName);
            return;
          }
        } catch { /* continue */ }
      }
    } finally {
      if (detectReqIdRef.current === reqId) setIsDetectingBank(false);
    }
  };

  const handleAccountNumberChange = (val: string) => {
    const v = val.replace(/\D/g, "");
    setAccountNumber(v);
    setBeneficiaryName("");
    setMatchedBanks([]);
    if (type === "nip" && selectedBank) {
      // clear selected bank on number change to force re-verify? 
      // PaymentTransferForm clears bankCode if auto-detected. 
      // Here we can keep it if user manually selected it, but we need to re-verify.
      // Actually, better to reset verification state.
      // If it was auto-detected, we should probably clear it.
      if (isDetectingBank) {
        setSelectedBank(null);
      }
    }
  };

  // Fetch matched banks for NIP/NGN
  React.useEffect(() => {
    if (type !== "nip") return;
    if (nipCurrency !== "NGN") return;

    if (accountNumber && accountNumber.length === 10) {
      const t = setTimeout(() => {
        getMatchedBanks(accountNumber);
      }, 250);
      return () => clearTimeout(t);
    }

    setMatchedBanks([]);
  }, [accountNumber, getMatchedBanks, nipCurrency, type]);

  // Handle Verification / Auto-detect for NIP
  React.useEffect(() => {
    if (type !== "nip") return;
    if (accountNumber && accountNumber.length === 10) {
      if (selectedBank) {
        // If bank is selected, verify
        if (!beneficiaryName && !verifyLoading) {
          verifyAccount({ accountNumber, bankCode: selectedBank.code });
        }
      } else {
        // If no bank, try auto-detect
        if (nipCurrency === "NGN" && matchedBanksLoading) return; // wait for match

        const t = setTimeout(() => {
          // If we have matched banks, use them. If not, if currency is not NGN, we might try all banks (though expensive)
          // PaymentTransferForm logic:
          const candidates = matchedBanks.length > 0 ? matchedBanks : undefined;
          if ((candidates && candidates.length > 0) || nipCurrency !== "NGN") {
            tryAutoDetectBank(accountNumber, candidates);
          }
        }, 350);
        return () => clearTimeout(t);
      }
    } else {
      // invalid account number
      detectReqIdRef.current += 1;
      setIsDetectingBank(false);
      setBeneficiaryName("");
    }
  }, [accountNumber, selectedBank, matchedBanks, matchedBanksLoading, nipCurrency, type, verifyAccount, beneficiaryName, verifyLoading]);

  const { mutate: createDestination, isPending } = useCreateCurrencyAccountPayoutDestination(
    onError,
    onSuccessCallback
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = { type };

    if (type === "stablecoin") {
      if (!stablecoinCurrency || !stablecoinNetwork || !addressCode.trim()) return;
      payload.label = label.trim();
      payload.currency = stablecoinCurrency;
      payload.address_network = stablecoinNetwork;
      payload.address_code = addressCode.trim();
    } else if (type === "nip") {
      if (!accountNumber.trim() || !beneficiaryName.trim() || !selectedBank || !selectedBank.code) return;
      // Payload for NIP
      payload.label = label.trim();
      // payload.type set above
      payload.account_type = accountType;
      payload.account_number = accountNumber.trim();
      payload.bank_code = String(selectedBank.code);
      payload.beneficiary_name = beneficiaryName.trim();
    } else if (type === "wire") {
      if (!accountNumber.trim() || !beneficiaryName.trim() || !routingNumber.trim() || !bankName.trim() || !label.trim()) return;
      // Payload for Wire
      // payload.type set above
      payload.label = label.trim();
      payload.account_number = accountNumber.trim();
      payload.routing_number = routingNumber.trim();
      payload.beneficiary_name = beneficiaryName.trim();
      payload.beneficiary_address = beneficiaryAddress.trim();
      payload.bank_name = bankName.trim();
      payload.wire_type = "swift";
      payload.account_type = "personal";
    }

    createDestination({ currency, formdata: payload });
  };

  const canSubmit = React.useMemo(() => {
    if (!label.trim()) return false;

    if (type === "stablecoin") {
      return !!stablecoinCurrency && !!stablecoinNetwork && !!addressCode.trim();
    }
    if (type === "nip") {
      return !!accountNumber.trim() && !!beneficiaryName.trim() && !!selectedBank && !!selectedBank.code;
    }
    if (type === "wire") {
      return (
        !!accountNumber.trim() &&
        !!beneficiaryName.trim() &&
        !!routingNumber.trim() &&
        !!bankName.trim() &&
        !!beneficiaryAddress.trim()
      );
    }
    return false;
  }, [
    type,
    label,
    stablecoinCurrency,
    stablecoinNetwork,
    addressCode,
    accountNumber,
    beneficiaryName,
    selectedBank,
    routingNumber,
    bankName,
    beneficiaryAddress,
  ]);

  if (!isOpen || !account) return null;

  return (
    <div className="z-[999999] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 flex justify-center items-center w-full md:inset-0 h-[100dvh]">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-black/80 dark:bg-black/60" onClick={handleClose} />
      </div>
      <div className="relative mx-2.5 2xs:mx-4 bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 px-0 py-4 w-full max-w-lg max-h-[92vh] rounded-2xl overflow-hidden flex flex-col">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 cursor-pointer bg-bg-1400 rounded-full hover:bg-bg-1200 transition-colors z-10"
        >
          <CgClose className="text-xl text-text-200 dark:text-text-400" />
        </button>

        <div className="px-5 sm:px-6 pt-1 pb-4 flex-shrink-0">
          <h2 className="text-white text-base sm:text-lg font-semibold">
            {type === "stablecoin" ? "Add Stablecoin Wallet" : "Add Bank Account"}
          </h2>
          <p className="text-white/60 text-sm mt-1">Add a new destination for your payments</p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-4 pb-4">
            {/* Type Selection Tabs */}
            <div className="flex p-1 bg-black/20 rounded-lg">
              {[
                { value: "wire", label: "Wire Transfer" },
                { value: "nip", label: "NIP" },
                { value: "stablecoin", label: "Stablecoin" },
              ].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value as any)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${type === t.value
                    ? "bg-bg-1400 text-white shadow-sm"
                    : "text-white/60 hover:text-white"
                    }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Common Label Field */}
            <div>
              <label className="block text-sm text-white/80 mb-1.5">Label</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Supplier Payment"
                className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-3 text-white placeholder:text-white/30 outline-none focus:border-primary text-sm"
              />
            </div>

            {/* STABLECOIN FORM */}
            {type === "stablecoin" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-1.5">Currency</label>
                    <div className="relative">
                      <select
                        value={stablecoinCurrency}
                        onChange={(e) => setStablecoinCurrency(e.target.value)}
                        className="w-full appearance-none bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-3 text-white outline-none focus:border-primary text-sm"
                      >
                        <option value="USDC">USDC</option>
                        <option value="USDT">USDT</option>
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/80 mb-1.5">Network</label>
                    <div className="relative">
                      <select
                        value={stablecoinNetwork}
                        onChange={(e) => setStablecoinNetwork(e.target.value)}
                        className="w-full appearance-none bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-3 text-white outline-none focus:border-primary text-sm"
                      >
                        <option value="POL">Polygon (POL)</option>
                        <option value="ETH">Ethereum (ETH)</option>
                        <option value="SOL">Solana (SOL)</option>
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/80 mb-1.5">Wallet Address</label>
                  <input
                    type="text"
                    value={addressCode}
                    onChange={(e) => setAddressCode(e.target.value)}
                    placeholder="0x..."
                    className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-3 text-white placeholder:text-white/30 outline-none focus:border-primary text-sm font-mono"
                  />
                </div>
              </>
            )}

            {/* NIP FORM */}
            {type === "nip" && (
              <>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-1.5">Account Type</label>
                    <div className="relative">
                      <select
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value as any)}
                        className="w-full appearance-none bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-3 text-white outline-none focus:border-primary text-sm"
                      >
                        <option value="personal">Personal</option>
                        <option value="business">Business</option>
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-1.5">Account Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => handleAccountNumberChange(e.target.value)}
                      placeholder="Enter account number"
                      maxLength={10}
                      className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-3 pr-10 text-white placeholder:text-white/30 outline-none focus:border-primary text-sm"
                    />
                    {(verifyLoading || isDetectingBank || matchedBanksLoading) && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <SpinnerLoader width={18} height={18} color="#D4B139" />
                      </div>
                    )}
                  </div>
                  {type === "nip" && accountNumber.length === 10 && !selectedBank && !isDetectingBank && !beneficiaryName && (
                    <p className="text-white/50 text-xs mt-1">
                      {matchedBanksLoading
                        ? "Finding matched banks..."
                        : matchedBanks.length > 0
                          ? "Auto-detecting bank..."
                          : "No matched banks found. Please select the bank manually."}
                    </p>
                  )}
                  {beneficiaryName && (
                    <div className="w-full rounded-md bg-[#0E2C25] text-emerald-200 text-sm px-3 py-2 flex items-center gap-2 mt-2">
                      <FiCheckCircle className="text-emerald-400" />
                      <span className="truncate">{beneficiaryName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-1.5">Bank</label>
                  <div className="relative" ref={bankRef}>
                    <button
                      type="button"
                      onClick={() => setBankOpen(!bankOpen)}
                      className="w-full flex items-center justify-between bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-3 text-white text-sm"
                    >
                      <span className="truncate">{selectedBank?.name || "Select Bank"}</span>
                      <FiChevronDown className={`transition-transform ${bankOpen ? "rotate-180" : ""}`} />
                    </button>
                    {bankOpen && (
                      <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto bg-bg-600 dark:bg-bg-1100 border border-border-600 rounded-lg shadow-lg">
                        {banksLoading ? (
                          <div className="p-3 text-white/60 text-xs">Loading banks for {nipCurrency}...</div>
                        ) : banks?.length === 0 ? (
                          <div className="p-3 text-white/60 text-xs">No banks found for {nipCurrency}</div>
                        ) : (
                          <SearchableDropdown
                            items={banks || []}
                            searchKey="name"
                            displayFormat={(bank: any) => (
                              <div className="text-white text-sm">{bank.name}</div>
                            )}
                            onSelect={(bank: any) => {
                              setSelectedBank(bank);
                              setBankOpen(false);
                              if (accountNumber.length === 10) {
                                verifyAccount({ accountNumber, bankCode: bank.code });
                              }
                            }}
                            placeholder="Search bank..."
                            isOpen={bankOpen}
                            onClose={() => setBankOpen(false)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* WIRE FORM */}
            {type === "wire" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-1.5">Bank Name</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="Bank Name"
                      className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-3 text-white placeholder:text-white/30 outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/80 mb-1.5">Routing Number</label>
                    <input
                      type="text"
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value)}
                      placeholder="Routing / SWIFT Code"
                      className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-3 text-white placeholder:text-white/30 outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-1.5">Account Number</label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Account Number"
                      className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-3 text-white placeholder:text-white/30 outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/80 mb-1.5">Beneficiary Name</label>
                    <input
                      type="text"
                      value={beneficiaryName}
                      onChange={(e) => setBeneficiaryName(e.target.value)}
                      placeholder="Beneficiary Name"
                      className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-3 text-white placeholder:text-white/30 outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-1.5">Beneficiary Address</label>
                  <input
                    type="text"
                    value={beneficiaryAddress}
                    onChange={(e) => setBeneficiaryAddress(e.target.value)}
                    placeholder="e.g. 456 Main Street, City, Country"
                    className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3 px-3 text-white placeholder:text-white/30 outline-none focus:border-primary text-sm"
                  />
                </div>
              </>
            )}
          </form>
        </div>

        <div className="px-5 sm:px-6 py-4 flex-shrink-0 bg-bg-600 dark:bg-bg-1100 border-t border-white/5 flex gap-3">
          <CustomButton
            type="button"
            onClick={handleClose}
            className="flex-1 bg-transparent border border-border-600 text-white hover:bg-white/5 py-3 rounded-lg transition-colors"
          >
            Cancel
          </CustomButton>
          <CustomButton
            type="button"
            onClick={handleSubmit}
            isLoading={isPending}
            disabled={!canSubmit || isPending}
            className="flex-1 bg-primary hover:bg-primary/90 text-black font-medium py-3 rounded-lg transition-colors"
          >
            Create Destination
          </CustomButton>

        </div>
      </div>
    </div>
  );
};

export default CreatePayoutDestinationModal;
