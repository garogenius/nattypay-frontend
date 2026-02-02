/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  dataPaymentRequest,
  dataPlanNetworkRequest,
  dataPlanRequest,
  dataVariationRequest,
  palmPayDataPaymentRequest,
} from "./data.apis";
import { IDataPlan, IDataVariationPayload } from "./data.types";
import { NetworkPlan } from "@/constants/types";

const validatePhone = (phone: string, currency: string) => {
  if (currency === "NGN") {
    // Accept 10 digits (without leading 0) or 11 digits (with leading 0)
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length === 11 || cleaned.length === 10;
  }
  return false;
};

// Format phone number for API: convert to +234 format
// e.g., 07043742886 -> +2347043742886 or 7043742886 -> +2347043742886
// Format phone number for API: use local 0... format for PalmPay detection
const formatPhoneForAPI = (phone: string): string => {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    cleaned = `0${cleaned}`;
  }
  return cleaned;
};

const prefixMap: Record<string, string[]> = {
  MTN: ["0803", "0806", "0703", "0706", "0813", "0816", "0810", "0814", "0903", "0906"],
  AIRTEL: ["0802", "0808", "0708", "0812", "0902", "0907", "0901"],
  GLO: ["0805", "0807", "0705", "0815", "0811", "0905"],
  "9MOBILE": ["0809", "0817", "0818", "0909", "0908"],
};

export const useGetDataPlan = ({
  phone,
  network: selectedNetwork,
}: {
  phone?: string;
  currency?: string;
  network?: string;
}) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["data-plan"],
    queryFn: () => dataPlanRequest({ phone: "", currency: "NGN" }),
  });

  const res = data?.data?.data;
  let allPlans: any[] = res?.billers || res || [];

  let detectedNetwork = "";

  // 1. Detect network from phone if phone is valid (11 digits, starts with 0)
  // Or just use the first 4 chars if length >= 4
  if (phone && phone.length >= 4) {
    const prefix = phone.substring(0, 4);
    for (const [net, prefixes] of Object.entries(prefixMap)) {
      if (prefixes.includes(prefix)) {
        detectedNetwork = net;
        break;
      }
    }
  }

  // 2. Determine effective network (Manual selection takes precedence if provided? 
  // actually usually manual selection is for when phone detection fails or user wants to browse)
  // BUT if user enters a phone, we usually override manual selection with the detected one to avoid mismatch.
  // Let's stick to: if detected, use detected. If not, use selected.
  const effectiveNetwork = detectedNetwork || selectedNetwork || "";

  // 3. Filter plans if we have a network
  let networkPlans = allPlans;
  if (effectiveNetwork) {
    // case insensitive match
    // The API returns planName like "MTN", "GLO" etc.
    networkPlans = allPlans.filter(
      (plan) =>
        plan.network?.toUpperCase() === effectiveNetwork.toUpperCase() ||
        plan.planName?.toUpperCase().includes(effectiveNetwork.toUpperCase())
    );
  }

  return { isLoading, isError, networkPlans, network: effectiveNetwork };
};

export const useGetDataVariation = (payload: IDataVariationPayload) => {
  console.log("🔍 [DATA VARIATION] Hook called with payload:", payload);
  console.log("🔍 [DATA VARIATION] Query enabled:", !!payload.operatorId);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["data-variation", payload],
    queryFn: () => {
      console.log("📡 [DATA VARIATION] Fetching variations for operatorId:", payload.operatorId);
      return dataVariationRequest(payload);
    },
    enabled: !!payload.operatorId,
  });

  console.log("📊 [DATA VARIATION] Query state:", { isPending, isError, hasData: !!data });
  if (isError) {
    console.error("❌ [DATA VARIATION] Query error:", error);
  }

  const res = data?.data?.data;
  console.log("📦 [DATA VARIATION] Response data:", res);

  let variations: { amount: string; name: string }[] = [];

  // Support multiple possible response fields
  // Check if res is an array directly, or look for common keys
  const rawData = Array.isArray(res) ? res : (res?.fixedAmountsDescriptions || res?.variations || res?.data);
  console.log("🔍 [DATA VARIATION] Raw data extracted:", rawData);

  if (rawData && typeof rawData === "object") {
    if (Array.isArray(rawData)) {
      // If it's an array of objects, map to standard structure
      rawData.forEach((item: any) => {
        const amount = item?.amount || item?.price || item?.value || item?.payAmount || item?.amount_ngn;
        const desc = item?.description || item?.name || item?.planName || item?.label || item?.name_en || item?.variation_name;
        if (amount !== undefined && desc) {
          variations.push({ amount: String(amount), name: String(desc) });
        }
      });
    } else {
      // If it's already an object map (legacy format?), convert to array
      Object.entries(rawData).forEach(([key, value]) => {
        variations.push({ amount: String(key), name: String(value) });
      });
    }
  }

  console.log("✅ [DATA VARIATION] Processed variations count:", variations.length);
  if (variations.length > 0) {
    console.log("📋 [DATA VARIATION] Sample variation:", variations[0]);
  }

  return { isPending, isError, variations };
};

export const usePayForData = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dataPaymentRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-beneficiaries"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};

export const usePayForPalmPayData = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: palmPayDataPaymentRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-beneficiaries"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};

export const useGetDataPlanByNetwork = (network: string) => {
  return useQuery({
    queryKey: ["data-plan-by-network", network],
    queryFn: () => dataPlanNetworkRequest(network),
    enabled: !!network,
  });
};


import { queryPalmPayRechargeAccountRequest } from "../bill/bill.apis";

export const useGetDataPlanByPhone = (phone: string) => {
  return useQuery({
    queryKey: ["data-plan-by-phone", phone],
    queryFn: () => queryPalmPayRechargeAccountRequest({ mobileNumber: phone }),
    enabled: !!phone && phone.length === 11,
  });
};
