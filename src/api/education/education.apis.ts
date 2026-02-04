import { request } from "@/utils/axios-utils";
import {
  IGetEducationBillers,
  IGetEducationBillerItems,
  IVerifyEducationCustomer,
  IPayEducation,
} from "./education.types";

export const getEducationBillersRequest = async () => {
  return request({
    url: `/bill/remita/school/billers`,
    method: "get",
  });
};

export const getEducationBillerItemsRequest = async (
  formdata: IGetEducationBillerItems
) => {
  return request({
    url: `/bill/remita/school/biller-items?billerCode=${formdata.billerCode}`,
    method: "get",
  });
};

export const verifyEducationCustomerRequest = async (
  formdata: IVerifyEducationCustomer
) => {
  return request({
    url: `/bill/remita/education/verify-customer`,
    method: "post",
    data: formdata,
  });
};

export const payEducationRequest = async (formdata: IPayEducation) => {
  return request({
    url: `/bill/education/school-fee/pay`,
    method: "post",
    data: formdata,
  });
};

export const getRemitaProvidersRequest = async () => {
  return request({
    url: `/bill/remita/vending/providers`,
    method: "get",
  });
};

export const getRemitaProductsRequest = async (provider: string) => {
  return request({
    url: `/bill/remita/vending/products?provider=${provider}`,
    method: "get",
  });
};

export const verifyEducationCustomerRemitaRequest = async (
  formdata: IVerifyEducationCustomer
) => {
  return request({
    url: `/bill/remita/education/verify-customer`,
    method: "post",
    data: formdata,
  });
};






