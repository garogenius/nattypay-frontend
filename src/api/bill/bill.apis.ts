import { request } from "@/utils/axios-utils";

export const getFlutterwaveBillTypesRequest = async () => {
    return request({
        url: `/bill/flutterwave/bill-types`,
        method: "get",
    });
};

export const getFlutterwaveBillersForTypeRequest = async (billTypeCode: string) => {
    return request({
        url: `/bill/flutterwave/bill-types/${billTypeCode}/billers`,
        method: "get",
    });
};

export const getFlutterwaveBillerItemsRequest = async (billerCode: string) => {
    return request({
        url: `/bill/flutterwave/billers/${billerCode}/items`,
        method: "get",
    });
};

export const getFlutterwaveBillerOptionsRequest = async () => {
    return request({
        url: `/bill/flutterwave/billers/options`,
        method: "get",
    });
};

export const validateCustomerFlutterwaveRequest = async (data: any) => {
    return request({
        url: `/bill/flutterwave/validate-customer`,
        method: "post",
        data,
    });
};

export const queryPalmPayBillersRequest = async (data: any) => {
    return request({
        url: `/bill/palmpay/billers/query`,
        method: "post",
        data,
    });
};

export const queryPalmPayItemsRequest = async (data: any) => {
    return request({
        url: `/bill/palmpay/items/query`,
        method: "post",
        data,
    });
};

export const queryPalmPayOrderRequest = async (data: any) => {
    return request({
        url: `/bill/palmpay/order/query`,
        method: "post",
        data,
    });
};

export const queryPalmPayRechargeAccountRequest = async (data: any) => {
    return request({
        url: `/bill/palmpay/recharge-account/query`,
        method: "post",
        data,
    });
};
