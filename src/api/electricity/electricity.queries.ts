/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  IGetElectricityPlans,
  IGetElectricityVariationsPayload,
} from "./electricity.types";
import {
  electricityPaymentRequest,
  getElectricityPlansRequest,
  getElectricityVariationsRequest,
  verifyElectricityNumberRequest,
} from "./electricity.apis";
import { ElectricityVariationProps } from "@/constants/types";
import { ElectricityPlan } from "@/constants/types";

export const useGetElectricityPlans = (payload: IGetElectricityPlans) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["electricity-plan", payload],
    queryFn: () => getElectricityPlansRequest(payload),
    enabled: payload.isEnabled,
  });

  // Handle different possible response structures
  const responseData = data?.data?.data || data?.data || data;
  const electricityPlans: ElectricityPlan[] = Array.isArray(responseData) ? responseData : [];

  // Debug logging (remove in production if needed)
  if (isError && error) {
    console.error("Electricity plans fetch error:", error);
  }

  return { isPending, isError, electricityPlans };
};

export const useGetElectricityVariations = (
  payload: IGetElectricityVariationsPayload
) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["electricity-variation", payload],
    queryFn: () => getElectricityVariationsRequest(payload),
    enabled: !!payload.billerCode,
  });

  if (data) {
    console.log("⚡ [API] Electricity Variations Response:", data);
  }
  if (isError) {
    console.error("⚡ [API] Electricity Variations Error:", error);
  }

  // Handle different possible response structures
  // Flutterwave biller items usually come in data.data or just data
  const responseData = data?.data?.data || data?.data || data;
  const variations: ElectricityVariationProps[] = Array.isArray(responseData) ? responseData : [];

  return { isLoading, isError, variations };
};

export const usePayForElectricity = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: electricityPaymentRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-beneficiaries"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};

export const useVerifyElectricityNumber = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  return useMutation({
    mutationFn: verifyElectricityNumberRequest,
    onError,
    onSuccess: (data) => {
      onSuccess(data);
    },
  });
};
