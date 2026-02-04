/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  IGetInternetPlans,
  IGetInternetVariationsPayload,
} from "./internet.types";
import {
  internetPaymentRequest,
  getInternetPlansRequest,
  getInternetVariationsRequest,
} from "./internet.apis";
import { InternetPlan, InternetVariationProps } from "@/constants/types";

export const useGetInternetPlans = (payload: IGetInternetPlans) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["internet-plan", payload],
    queryFn: () => getInternetPlansRequest(payload),
    enabled: payload.isEnabled,
  });

  if (data) {
    console.log("🌐 [API] Internet Plans Response:", data);
  }
  if (isError) {
    console.error("🌐 [API] Internet Plans Error:", error);
  }

  // Handle different possible response structures
  const responseData = data?.data?.data || data?.data || data;
  const internetPlans: InternetPlan[] = Array.isArray(responseData) ? responseData : [];

  return { isPending, isError, internetPlans };
};

export const useGetInternetVariations = (
  payload: IGetInternetVariationsPayload
) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["internet-variation", payload],
    queryFn: () => getInternetVariationsRequest(payload),
    enabled: !!payload.billerCode,
    retry: false, // Don't retry 404s - ISP simply has no bundles
  });

  if (data) {
    console.log("🌐 [API] Internet Variations Response:", data);
  }

  // Only log non-404 errors (404 is expected for ISPs with no bundles)
  if (isError && error) {
    const status = (error as any)?.response?.status;
    if (status !== 404) {
      console.error("🌐 [API] Internet Variations Error:", error);
    }
  }

  // Handle different possible response structures
  const responseData = data?.data?.data || data?.data || data;
  const variations: InternetVariationProps[] = Array.isArray(responseData) ? responseData : [];

  return { isLoading, isError, variations };
};

export const usePayForInternet = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: internetPaymentRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-beneficiaries"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};
