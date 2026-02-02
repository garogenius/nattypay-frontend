import images from "../../../../public/images";

import Image from "next/image";
import { format } from "date-fns";
import useTransactionStore from "@/store/useTransaction.store";

import {
  BILL_TYPE,
  Transaction,
  TRANSACTION_CATEGORY,
} from "@/constants/types";
import { formatNumberWithCommas } from "@/utils/utilityFunctions";

type FieldMapping = {
  label: string;
  value: string;
};

export const statusStyles: Record<string, string> = {
  default: "px-3 py-1.5 rounded-full text-xs font-medium capitalize",
  defaultReceipt: "px-3 pb-3.5 rounded-full text-xs font-medium capitalize",
  success: "bg-green-400 text-green-800",
  pending: "bg-yellow-400 text-yellow-800",
  failed: "bg-red-400 text-red-800",
};

const formatSenderName = (senderName: string) => {
  return senderName?.replace(/^(NATTYPAY|NATTYPAYGLOBALS)\s*\/\s*/, '') || '';
};

export const getTransactionDetails = (
  transaction: Transaction,
  fields: FieldMapping[]
): {
  label: string;
  value: string;
  isStatus?: boolean;
  isReference?: boolean;
}[] => {
  const isFailedTransaction = transaction?.status?.toLowerCase() === "failed";

  return fields
    .filter((field) => {
      if (isFailedTransaction) {
        return !["Reference", "Transaction ID"].includes(field.label);
      }
      return true;
    })
    .map((field) => ({
      label: field.label,
      value: field.value.replace(/\{([^}]+)\}/g, (match, key: string) => {
        if (key === "createdAt") {
          return format(
            new Date(transaction.createdAt),
            "dd-MM-yyyy hh:mm a"
          ).toUpperCase();
        }

        if (field.label === "Transaction Date" && field.value === "{category}") {
          if (transaction.category === TRANSACTION_CATEGORY.TRANSFER) {
            const isInterBank = transaction.transferDetails?.beneficiaryBankName &&
              transaction.transferDetails.beneficiaryBankName.toLowerCase() !== 'nattypay';
            return isInterBank ? "Inter-bank Transfer" : "Intra-bank Transfer";
          }
          if (transaction.category === TRANSACTION_CATEGORY.DEPOSIT) return "Merchant Deposit";
          if (transaction.category === TRANSACTION_CATEGORY.BILL_PAYMENT) return transaction.billDetails?.type || "Bill Payment";
          return transaction.category;
        }

        // Handle nested properties with robust fallback
        const props = key.split(".");
        let value: any = transaction;

        for (const prop of props) {
          if (value && typeof value === "object") {
            let val = value[prop];

            // If value is missing or "0", check common aliases
            if (val === undefined || val === null || val === "" || val === "0" || val === 0) {
              const aliases: Record<string, string[]> = {
                billerName: ["network", "operator", "operatorName", "provider", "name"],
                recipientPhone: ["phone", "phoneNumber", "accountNumber", "customerID", "meterNumber", "smartCardNumber", "beneficiaryAccountNumber"],
                packageName: ["plan", "planName", "variationName", "bundleName", "description"],
                dataSize: ["size", "planSize", "description"],
                validity: ["duration", "period", "validityPeriod"],
                customerName: ["name", "fullName", "beneficiaryName"],
                token: ["pin", "rechargeCode"],
                beneficiaryBankName: ["beneficiaryBank", "bankName", "bank", "recipientBank"],
                country: ["countryName", "operatorCountry", "countryCode"],
              };

              if (aliases[prop]) {
                for (const alias of aliases[prop]) {
                  const aliasVal = value[alias];
                  if (aliasVal !== undefined && aliasVal !== null && aliasVal !== "" && aliasVal !== "0" && aliasVal !== 0) {
                    val = aliasVal;
                    break;
                  }
                }
              }
            }
            value = val;
          } else {
            value = undefined;
            break;
          }
        }

        if (field.label === "Sender Name" || field.label === "Beneficiary Name") {
          return formatSenderName(String(value ?? ""));
        }

        const currencyLabels = [
          "Amount", "Amount Paid", "Airtime Amount", "Card Value",
          "Amount Sent", "Amount Deposited",
          "Balance Before", "Balance After", "Fee", "Commission"
        ];

        if (currencyLabels.includes(field.label)) {
          return `₦${formatNumberWithCommas(String(value ?? "0"))}`;
        }

        // Use "-" instead of "0" for missing text fields
        return String(value ?? "-");
      }),
      isStatus: field.label === "Status" || field.label === "Transaction Status",
      isReference:
        field.label === "Transaction Ref" || field.label === "Reference" || field.label === "Transaction ID",
    }));
};

// Unified fields array to match the screenshot's exact order
export const defaultReceiptFields = [
  { label: "Amount", value: "{amount}" },
  { label: "Transaction Date", value: "{createdAt}" },
  { label: "Currency", value: "{currency}" },
  { label: "Narration", value: "{narration}" },
  { label: "Sender Name", value: "{senderName}" },
  { label: "Beneficiary Details", value: "{beneficiaryName}" },
  { label: "Beneficiary Bank", value: "{beneficiaryBank}" },
  { label: "Transaction ID", value: "{transactionRef}" },
  { label: "Status", value: "{status}" },
];

export const cableReceiptFields = [
  { label: "Amount Paid", value: "{amount}" },
  { label: "Date & Time", value: "{createdAt}" },
  { label: "Customer Name", value: "{billDetails.customerName}" },
  { label: "Smart Card / Decoder Number", value: "{billDetails.recipientPhone}" },
  { label: "Cable Provider", value: "{billDetails.billerName}" },
  { label: "Package Name", value: "{billDetails.packageName}" },
  { label: "Package Duration", value: "{billDetails.validity}" },
  { label: "Payment Method", value: "Wallet" },
  { label: "Transaction ID", value: "{transactionRef}" },
  { label: "Transaction Status", value: "{status}" },
];

export const electricityReceiptFields = [
  { label: "Amount Paid", value: "{amount}" },
  { label: "Date & Time", value: "{createdAt}" },
  { label: "Customer Name", value: "{billDetails.customerName}" },
  { label: "Meter Number", value: "{billDetails.recipientPhone}" },
  { label: "Meter Type", value: "{billDetails.meterType}" },
  { label: "Disco Name", value: "{billDetails.billerName}" },
  { label: "Token", value: "{billDetails.token}" },
  { label: "Units", value: "{billDetails.units}" },
  { label: "Payment Method", value: "Wallet" },
  { label: "Transaction ID", value: "{transactionRef}" },
  { label: "Transaction Status", value: "{status}" },
];

export const airtimeReceiptFields = [
  { label: "Airtime Amount", value: "{amount}" },
  { label: "Date & Time", value: "{createdAt}" },
  { label: "Network Provider", value: "{billDetails.billerName}" },
  { label: "Phone Number", value: "{billDetails.recipientPhone}" },
  { label: "Payment Method", value: "Wallet" },
  { label: "Transaction ID", value: "{transactionRef}" },
  { label: "Transaction Status", value: "{status}" },
];

export const dataReceiptFields = [
  { label: "Amount Paid", value: "{amount}" },
  { label: "Date & Time", value: "{createdAt}" },
  { label: "Network Provider", value: "{billDetails.billerName}" },
  { label: "Phone Number", value: "{billDetails.recipientPhone}" },
  // { label: "Data Plan Name", value: "{billDetails.packageName}" },
  // { label: "Data Size", value: "{billDetails.dataSize}" },
  // { label: "Validity Period", value: "{billDetails.validity}" },
  // { label: "Payment Method", value: "Wallet" },
  { label: "Transaction ID", value: "{transactionRef}" },
  { label: "Transaction Status", value: "{status}" },
];

export const giftCardReceiptFields = [
  { label: "Amount Paid", value: "{amount}" },
  { label: "Date & Time", value: "{createdAt}" },
  { label: "Gift Card Brand", value: "{billDetails.billerName}" },
  { label: "Card Type", value: "{billDetails.cardType}" },
  { label: "Card Value", value: "{billDetails.cardValue}" },
  { label: "Currency", value: "{billDetails.currency}" },
  { label: "Quantity", value: "{billDetails.quantity}" },
  { label: "Redemption Code", value: "{billDetails.token}" },
  { label: "Transaction ID", value: "{transactionRef}" },
  { label: "Transaction Status", value: "{status}" },
];

export const bettingReceiptFields = [
  { label: "Amount Paid", value: "{amount}" },
  { label: "Date & Time", value: "{createdAt}" },
  { label: "Betting Platform", value: "{billDetails.billerName}" },
  { label: "Customer ID / Bet ID", value: "{billDetails.recipientPhone}" },
  { label: "Phone Number or Username", value: "{billDetails.customerName}" },
  { label: "Payment Method", value: "Wallet" },
  { label: "Transaction ID", value: "{transactionRef}" },
  { label: "Transaction Status", value: "{status}" },
];

export const educationReceiptFields = [
  { label: "Amount Paid", value: "{amount}" },
  { label: "Date & Time", value: "{createdAt}" },
  { label: "Institution Name", value: "{billDetails.billerName}" },
  { label: "Student Name", value: "{billDetails.customerName}" },
  { label: "Student ID / Registration Number", value: "{billDetails.recipientPhone}" },
  { label: "Payment Purpose", value: "{billDetails.packageName}" },
  { label: "Academic Session", value: "{billDetails.session}" },
  { label: "Payment Method", value: "Wallet" },
  { label: "Transaction ID", value: "{transactionRef}" },
  { label: "Transaction Status", value: "{status}" },
];

export const examReceiptFields = [
  { label: "Amount Paid", value: "{amount}" },
  { label: "Date & Time", value: "{createdAt}" },
  { label: "Exam Type", value: "{billDetails.type}" },
  { label: "Candidate Name", value: "{billDetails.customerName}" },
  { label: "Profile Code / Registration Number", value: "{billDetails.recipientPhone}" },
  { label: "Exam Year", value: "{billDetails.year}" },
  { label: "PIN / Token", value: "{billDetails.token}" },
  { label: "Payment Method", value: "Wallet" },
  { label: "Transaction ID", value: "{transactionRef}" },
  { label: "Transaction Status", value: "{status}" },
];

export const schoolFeesReceiptFields = [
  { label: "Amount Paid", value: "{amount}" },
  { label: "Date & Time", value: "{createdAt}" },
  { label: "School Name", value: "{billDetails.billerName}" },
  { label: "Student Name", value: "{billDetails.customerName}" },
  { label: "Student ID / Matric Number", value: "{billDetails.recipientPhone}" },
  { label: "Level / Class", value: "{billDetails.level}" },
  { label: "Academic Session", value: "{billDetails.session}" },
  { label: "Term / Semester", value: "{billDetails.term}" },
  { label: "Payment Method", value: "Wallet" },
  { label: "Transaction ID", value: "{transactionRef}" },
  { label: "Transaction Status", value: "{status}" },
];

export const transferReceiptFields = [
  { label: "Amount Sent", value: "{amount}" },
  { label: "Date & Time", value: "{createdAt}" },
  { label: "Transfer Type", value: "{transferType}" },
  { label: "Sender Name", value: "{transferDetails.senderName}" },
  { label: "Sender Account Number / Wallet ID", value: "{transferDetails.senderAccountNumber}" },
  { label: "Sender Bank Name", value: "{transferDetails.senderBankName}" },
  { label: "Receiver Name", value: "{transferDetails.beneficiaryName}" },
  { label: "Receiver Account Number / Wallet ID", value: "{transferDetails.beneficiaryAccountNumber}" },
  { label: "Receiver Bank Name", value: "{transferDetails.beneficiaryBankName}" },
  { label: "Currency", value: "{currency}" },
  { label: "Transaction ID", value: "{transactionRef}" },
  { label: "Transaction Status", value: "{status}" },
];

export const internationalAirtimeReceiptFields = [
  { label: "Airtime Amount", value: "{amount}" },
  { label: "Date & Time", value: "{createdAt}" },
  { label: "Country", value: "{billDetails.country}" },
  { label: "Network Provider", value: "{billDetails.billerName}" },
  { label: "Phone Number", value: "{billDetails.recipientPhone}" },
  { label: "Payment Method", value: "Wallet" },
  { label: "Transaction ID", value: "{transactionRef}" },
  { label: "Transaction Status", value: "{status}" },
];

export const depositReceiptFields = [
  { label: "Amount Deposited", value: "{amount}" },
  { label: "Date & Time", value: "{createdAt}" },
  { label: "Deposit Type", value: "{depositType}" },
  { label: "Depositor Name", value: "{depositDetails.senderName}" },
  { label: "Currency", value: "{currency}" },
  { label: "Wallet / Account Credited", value: "{wallet.accountNumber}" },
  // { label: "Payment Channel", value: "{depositType}" },
  // { label: "Reference Number", value: "{transactionRef}" },
  { label: "Transaction ID", value: "{transactionRef}" },
  { label: "Transaction Status", value: "{status}" },
];

const ReceiptContainer = () => {
  const { transaction } = useTransactionStore();

  if (!transaction) return null;

  // Derive values for the unified fields
  const category = transaction.category;
  const amount = ((): string => {
    if (category === TRANSACTION_CATEGORY.TRANSFER) return transaction.transferDetails?.amountPaid ?? transaction.transferDetails?.amount ?? "0";
    if (category === TRANSACTION_CATEGORY.DEPOSIT) return transaction.depositDetails?.amountPaid ?? transaction.depositDetails?.amount ?? "0";
    if (category === TRANSACTION_CATEGORY.BILL_PAYMENT) return transaction.billDetails?.amountPaid ?? transaction.billDetails?.amount ?? "0";
    return "0";
  })();

  const walletName = transaction.wallet?.accountName || transaction.wallet?.user?.fullname || "-";
  const walletAccount = transaction.wallet?.accountNumber || "-";
  const walletBank = transaction.wallet?.bankName || "NattyPay";

  let senderName = "-";
  let beneficiaryName = "-";
  let beneficiaryBank = "-";
  let beneficiaryAccount = "";

  if (category === TRANSACTION_CATEGORY.TRANSFER) {
    senderName = transaction.transferDetails?.senderName || walletName;
    beneficiaryName = transaction.transferDetails?.beneficiaryName || "-";
    beneficiaryAccount = transaction.transferDetails?.beneficiaryAccountNumber || "";
    beneficiaryBank = transaction.transferDetails?.beneficiaryBankName || "-";
  } else if (category === TRANSACTION_CATEGORY.DEPOSIT) {
    senderName = transaction.depositDetails?.senderName || "-";
    beneficiaryName = walletName;
    beneficiaryAccount = walletAccount;
    beneficiaryBank = walletBank;
  } else if (category === TRANSACTION_CATEGORY.BILL_PAYMENT) {
    senderName = walletName;
    beneficiaryName = transaction.billDetails?.recipientPhone || transaction.billDetails?.billerName || "-";
    beneficiaryBank = transaction.billDetails?.billerName || "-";
  }

  const narration = transaction.description || transaction.billDetails?.type || "-";

  // Determine which field sequence to use
  let fields = defaultReceiptFields;
  let transferType = "-";
  let depositType = "Bank Transfer";

  if (category === TRANSACTION_CATEGORY.TRANSFER) {
    fields = transferReceiptFields;
    const isInterBank = transaction.transferDetails?.beneficiaryBankName &&
      transaction.transferDetails.beneficiaryBankName.toLowerCase() !== 'nattypay';
    transferType = isInterBank ? "Inter-bank Transfer" : "Intra-bank Transfer";
  } else if (category === TRANSACTION_CATEGORY.DEPOSIT) {
    fields = depositReceiptFields;
    depositType = transaction.depositDetails?.channel || "Bank Transfer";
    // Capitalize channel if it exists
    depositType = depositType.charAt(0).toUpperCase() + depositType.slice(1);
  } else if (category === TRANSACTION_CATEGORY.BILL_PAYMENT) {
    const billType = transaction.billDetails?.type?.toLowerCase();
    const billerName = transaction.billDetails?.billerName?.toLowerCase() || "";

    if (billType === "cable") fields = cableReceiptFields;
    else if (billType === "electricity") fields = electricityReceiptFields;
    else if (billType === "airtime") fields = airtimeReceiptFields;
    else if (billType === "international_airtime" || billType === "internationalairtime") fields = internationalAirtimeReceiptFields;
    else if (billType === "data") fields = dataReceiptFields;
    else if (billType === "giftcard") fields = giftCardReceiptFields;
    else if (billType === "betting" || billerName.includes("bet")) fields = bettingReceiptFields;
    else if (billType === "waec" || billType === "jamb" || billType === "neco") fields = examReceiptFields;
    else if (billType === "school_fees" || billType === "schoolfee") fields = schoolFeesReceiptFields;
    else if (billType === "education") fields = educationReceiptFields;
  }

  // Override transaction object temporarily for display mapping
  const displayTx = {
    ...transaction,
    amount,
    senderName,
    beneficiaryName,
    beneficiaryBank,
    narration,
    transferType,
    depositType,
    transactionRef: transaction.transactionRef || transaction.transferDetails?.sessionId || transaction.depositDetails?.reference || "-"
  };

  const details = getTransactionDetails(displayTx as any, fields);

  return (
    <div
      id="receipt-container"
      className="flex flex-col w-full max-w-[500px] mx-auto overflow-hidden bg-white dark:bg-[#0B0F1A] p-6 sm:p-8 transition-colors duration-200"
    >
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Image
            src={images.logo}
            alt="NattyPay Logo"
            width={140}
            height={48}
            className="h-9 w-auto object-contain dark:brightness-200"
          />
        </div>
        <div className="text-black dark:text-white text-sm font-medium">
          Smart Banking
        </div>
      </div>

      {/* Center Badge */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center justify-center bg-[#D4B139] text-white px-7 sm:px-10 py-3 sm:py-3.5 min-h-[52px] rounded-xl font-semibold text-base sm:text-lg leading-none shadow-sm whitespace-nowrap">
          Transaction Receipt
        </div>
      </div>

      {/* Transaction details list */}
      <div className="flex flex-col gap-0 w-full mb-8">
        {details.map((detail, index) => {
          let displayValue = detail.value;

          // Format beneficiary details to include account number in brackets if it exists
          if (detail.label === "Beneficiary Details" && beneficiaryAccount) {
            displayValue = `${detail.value} (${beneficiaryAccount})`;
          }

          return (
            <div key={index} className="w-full">
              <div className="w-full border-t border-dotted border-[#D4B139] border-[1.5px] opacity-100 my-0"></div>

              <div className={`flex items-center ${detail.label === "Transaction ID" ? "flex-nowrap" : ""} justify-between py-4 px-1 gap-2`}>
                <p className={`text-gray-500 dark:text-gray-400 text-sm font-normal ${detail.label === "Transaction ID" ? "flex-shrink-0" : ""}`}>
                  {detail.label}
                </p>
                {detail.isStatus ? (
                  <span className="text-[#068E44] dark:text-[#64D284] text-sm font-semibold">
                    {detail.value.toLowerCase() === "success" ? "Successful" : detail.value}
                  </span>
                ) : (
                  <p className={`text-black dark:text-white text-sm font-semibold text-right ${detail.label === "Transaction ID" || detail.label === "Transaction Ref" || detail.label === "Reference" ? "truncate min-w-0 flex-1 ml-4" : ""}`}>
                    {displayValue}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        <div className="w-full border-t border-dotted border-[#D4B139] border-[1.5px] opacity-100 my-0"></div>
      </div>

      {/* Footer with contact info */}
      <div className="mt-auto pt-4 text-left">
        <p className="text-[11px] sm:text-[12px] text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
          Thank you for banking with NattyPay. For support, contact us at{" "}
          <span className="font-semibold">Support@nattypay.com</span>, call{" "}
          <span className="font-semibold">+2348134146906</span> or Head Office:
          C3&C4 Suite 2nd Floor Ejison Plaza 9a New Market Road Main Market
          Onitsha
        </p>
      </div>
    </div>
  );
};

export default ReceiptContainer;
