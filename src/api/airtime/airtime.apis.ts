import { request } from "@/utils/axios-utils";
import {
  IAirtimePayPayload,
  IInternationalAirtimeFxRate,
  IInternationalAirtimePlan,
  IInternationalAirtimePayPayload,
} from "./airtime.types";

export const airtimePaymentRequest = async (formdata: IAirtimePayPayload) => {
  return request({
    url: `/bill/airtime/auto/pay`,
    method: "post",
    data: formdata,
  });
};

export const airtimeNetworkProviderRequest = async () => {
  return request({
    url: `/bill/airtime/palmpay/network-providers`,
    method: "get",
  });
};

export const internationalAirtimePlanRequest = async (
  formdata: IInternationalAirtimePlan
) => {
  return request({
    url: `/bill/reloadly/airtime/international/get-plan?phone=${formdata.phone}`,
    method: "get",
  });
};

export const internationalAirtimeFxRateRequest = async (
  formdata: IInternationalAirtimeFxRate
) => {
  return request({
    url: `/bill/reloadly/airtime/international/get-fx-rate?amount=${formdata.amount}&operatorId=${formdata.operatorId}`,
    method: "get",
  });
};

export const internationalAirtimePaymentRequest = async (
  formdata: IInternationalAirtimePayPayload
) => {
  return request({
    url: `/bill/airtime/international/pay`,
    method: "post",
    data: formdata,
  });
};


