"use client";
import { FaAngleLeft } from "react-icons/fa6";
import { GoShareAndroid } from "react-icons/go";
import cn from "classnames";
import useTransactionStore from "@/store/useTransaction.store";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";
import ReceiptContainer from "./ReceiptFields";
import { TRANSACTION_STATUS } from "@/constants/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ReceiptBackHeader = () => {
  const router = useRouter();
  const { transaction } = useTransactionStore();

  const handleShare = async () => {
    if (!transaction) {
      toast.error("No transaction found");
      return;
    }

    const toastId = toast.loading("Preparing receipt...");

    // Create a temporary div and render the receipt
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    tempDiv.style.width = "500px"; // Fixed width for consistent receipt size
    document.body.appendChild(tempDiv);

    // Create root and render the ReceiptContainer content into the temp div
    const root = createRoot(tempDiv);
    root.render(
      <div className="bg-white">
        <ReceiptContainer />
      </div>
    );

    try {
      // Wait for content and images to load
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(tempDiv, {
        scale: 3, // High quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to create blob"));
          }
        }, "image/png", 1.0);
      });

      // Check if Web Share API is available
      if (navigator.share && navigator.canShare) {
        const file = new File(
          [blob],
          `NattyPay_Receipt_${transaction.transactionRef || 'transaction'}.png`,
          {
            type: "image/png",
          }
        );

        // Check if files can be shared
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "NattyPay Transaction Receipt",
            text: `Transaction Receipt from NattyPay - Ref: ${transaction.transactionRef || 'N/A'}`,
          });
          toast.success("Receipt shared successfully!", { id: toastId });
        } else {
          // Fallback: try to copy image to clipboard or download
          throw new Error("Sharing files not supported");
        }
      } else {
        // Fallback: try to copy image to clipboard
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ]);
          toast.success("Receipt copied to clipboard!", { id: toastId });
        } catch (clipboardError) {
          // Final fallback: download
          const link = document.createElement("a");
          link.download = `NattyPay_Receipt_${transaction.transactionRef || 'transaction'}.png`;
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
          toast.success("Receipt downloaded!", { id: toastId });
        }
      }
    } catch (error: any) {
      // Don't show error if user cancelled the share
      if (error.name === 'AbortError') {
        toast.dismiss(toastId);
      } else {
        console.error("Error sharing receipt:", error);
        toast.error("Failed to share receipt", { id: toastId });
      }
    } finally {
      // Clean up: unmount the root and remove the temporary div
      root.unmount();
      document.body.removeChild(tempDiv);
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-2 text-text-200 dark:text-text-400 relative py-2">
      <div
        onClick={() => {
          router.back();
        }}
        className="flex items-center gap-1 sm:gap-1.5 cursor-pointer z-10"
      >
        <FaAngleLeft className="text-text-2100 text-xl" />
        <p className="block text-text-3700 text-lg">Back</p>
      </div>
      <button
        onClick={() => {
          if (transaction?.status === TRANSACTION_STATUS.success) {
            handleShare();
          }
        }}
        className={cn("flex items-center gap-1.5 ", {
          "text-text-200 dark:text-text-400 cursor-pointer":
            transaction?.status === TRANSACTION_STATUS.success,
          "opacity-50 cursor-not-allowed":
            transaction?.status !== TRANSACTION_STATUS.success,
        })}
      >
        <GoShareAndroid className="text-2xl" />
        <p className="text-base sm:text-lg font-medium ">Share Receipt</p>
      </button>
    </div>
  );
};

export default ReceiptBackHeader;
