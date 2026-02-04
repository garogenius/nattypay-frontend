/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  dataPlanRequest,
  dataVariationRequest,
  palmPayDataPaymentRequest,
} from "./data.apis";
import { IDataVariationPayload, IDataPayPayload } from "./data.types";

// Reuse prefix map from Airtime logic
const prefixMap: Record<string, string[]> = {
  MTN: ["0803", "0806", "0703", "0706", "0813", "0816", "0810", "0814", "0903", "0906", "0913", "0916", "07025", "07026", "0704"],
  AIRTEL: ["0802", "0808", "0708", "0812", "0902", "0907", "0901", "0904", "0701", "0912"],
  GLO: ["0805", "0807", "0705", "0815", "0811", "0905", "0915", "08070", "08050"],
  "9MOBILE": ["0809", "0817", "0818", "0909", "0908"],
};

export const useGetNetworkProviders = () => {
  return useQuery({
    queryKey: ["data-network-providers"],
    queryFn: dataPlanRequest,
  });
};

/**
 * Compatible hook for existing StageOne components.
 * Performs network detection from phone prefix.
 */
export const useGetDataPlan = ({
  phone,
  network: selectedNetwork,
}: {
  phone?: string;
  currency?: string;
  network?: string;
}) => {
  const { isLoading, isError, data } = useGetNetworkProviders();

  const rawData = data?.data?.data || data?.data || [];
  const allBillers = Array.isArray(rawData?.billers) ? rawData.billers : Array.isArray(rawData) ? rawData : [];

  let detectedNetwork = "";
  const cleaned = phone?.replace(/\D/g, "") || "";

  if (cleaned.length >= 4) {
    let phoneForPrefix = cleaned;
    if (phoneForPrefix.startsWith('234')) phoneForPrefix = '0' + phoneForPrefix.slice(3);

    const prefix = phoneForPrefix.startsWith('0')
      ? phoneForPrefix.substring(0, 4)
      : '0' + phoneForPrefix.substring(0, 3);

    for (const [net, prefixes] of Object.entries(prefixMap)) {
      if (prefixes.includes(prefix)) {
        detectedNetwork = net;
        break;
      }
    }
  }

  const effectiveNetwork = detectedNetwork || selectedNetwork || "";

  // Map billers to legacy "networkPlans" structure
  const networkPlans = allBillers
    .filter((b: any) => {
      const name = (b.billerName || b.network || "").toUpperCase();
      return name.includes(effectiveNetwork.toUpperCase());
    })
    .map((b: any) => ({
      operatorId: Number(b.billerId || b.operatorId || b.id),
      planName: b.billerName || b.network,
      network: effectiveNetwork
    }));

  return { isLoading, isError, networkPlans, network: effectiveNetwork };
};

export const useGetDataVariation = (payload: IDataVariationPayload) => {
  return useQuery({
    queryKey: ["data-variations", payload.operatorId],
    queryFn: () => dataVariationRequest(payload),
    enabled: !!payload.operatorId,
    select: (data) => {
      const res = data?.data?.data;
      let variations: { amount: string; name: string }[] = [];
      const rawData = res?.fixedAmountsDescriptions || res?.variations || res?.data || res;

      if (Array.isArray(rawData)) {
        rawData.forEach((item: any) => {
          const amount = item?.amount || item?.price || item?.value || item?.payAmount;
          const name = item?.description || item?.name || item?.planName || item?.label;
          if (amount !== undefined && name) {
            variations.push({ amount: String(amount), name: String(name) });
          }
        });
      } else if (rawData && typeof rawData === "object") {
        Object.entries(rawData).forEach(([key, value]) => {
          if (value && typeof value === "string") {
            variations.push({ amount: key, name: value });
          }
        });
      }
      return variations;
    }
  });
};

export const usePayForData = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IDataPayPayload) => palmPayDataPaymentRequest(payload),
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-beneficiaries"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};
