import { request } from "@/utils/axios-utils";
import {
  IDataPayPayload,
  IDataVariationPayload,
} from "./data.types";

export const dataPlanRequest = async () => {
  return request({
    url: `/bill/data/palmpay/get-plan`,
    method: "get",
  });
};

export const dataVariationRequest = async (formdata: IDataVariationPayload) => {
  return request({
    url: `/bill/data/get-variation?operatorId=${formdata.operatorId}`,
    method: "get",
  });
};

export const palmPayDataPaymentRequest = async (formdata: IDataPayPayload) => {
  return request({
    url: `/bill/data/palmpay/pay`,
    method: "post",
    data: formdata,
  });
};
