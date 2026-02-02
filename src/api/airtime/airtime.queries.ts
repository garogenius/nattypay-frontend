/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  airtimeNetworkProviderRequest,
  airtimePaymentRequest,
  internationalAirtimeFxRateRequest,
  internationalAirtimePlanRequest,
  internationalAirtimePaymentRequest,
} from "./airtime.apis";
import {
  IInternationalAirtimeFxRate,
  IInternationalAirtimePlan,
} from "./airtime.types";

export const useGetInternationalAirtimePlan = (
  payload: IInternationalAirtimePlan
) => {
  return useQuery({
    queryKey: ["international-airtime-plan", payload],
    queryFn: () => internationalAirtimePlanRequest(payload),
    enabled: !!payload.phone,
  });
};

export const useGetInternationalAirtimeFxRate = (
  payload: IInternationalAirtimeFxRate
) => {
  return useQuery({
    queryKey: ["international-airtime-fx-rate", payload],
    queryFn: () => internationalAirtimeFxRateRequest(payload),
    enabled: !!payload.operatorId && !!payload.amount,
  });
};


export const usePayForAirtime = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: airtimePaymentRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-beneficiaries"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};

export const useGetAirtimeNetWorkProvider = () => {
  return useQuery({
    queryKey: ["airtime-network-provider"],
    queryFn: airtimeNetworkProviderRequest,
  });
};

export const usePayForInternationalAirtime = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: internationalAirtimePaymentRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-beneficiaries"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};


import { queryPalmPayRechargeAccountRequest } from "../bill/bill.apis";

export const useGetAirtimePlanByPhone = (phone: string, currency: string = "NGN") => {
  return useQuery({
    queryKey: ["airtime-plan-by-phone", phone],
    queryFn: () => queryPalmPayRechargeAccountRequest({ mobileNumber: phone }),
    enabled: phone.length === 11,
  });
};
