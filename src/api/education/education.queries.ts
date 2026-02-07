/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEducationBillersRequest,
  getEducationBillerItemsRequest,
  verifyEducationCustomerRequest,
  payEducationRequest,
  payWaecRequest,
  payJambRequest,
  verifyEducationCustomerRemitaRequest,
} from "./education.apis";
import {
  IGetEducationBillerItems,
  IVerifyEducationCustomer,
} from "./education.types";

export const useGetEducationBillers = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["education-billers"],
    queryFn: () => getEducationBillersRequest(),
  });

  // Handle nested data structure: response.data.data.data.content
  const responseData = data?.data?.data?.data?.content || data?.data?.data?.data || data?.data?.data || [];
  const rawBillers: any[] = Array.isArray(responseData) ? responseData : [];

  // Map API response fields to component-expected fields
  // API returns: billerId, billerName, billerShortName
  // Component expects: billerCode, name, shortName
  const billers: any[] = rawBillers.map((biller: any) => ({
    ...biller,
    billerCode: biller.billerCode || biller.billerId,
    name: biller.name || biller.billerName,
    shortName: biller.shortName || biller.billerShortName || biller.billerName,
  }));

  return { isPending, isError, billers };
};

export const useGetEducationBillerItems = (
  payload: IGetEducationBillerItems
) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["education-biller-items", payload],
    queryFn: () => getEducationBillerItemsRequest(payload),
    enabled: !!payload.billerCode,
  });

  // Ensure items is always an array: response.data.data.data.products
  const itemsData = data?.data?.data?.products || data?.data?.data?.data?.products || data?.data?.data?.data || data?.data?.data;
  const items: any[] = Array.isArray(itemsData) ? itemsData : Array.isArray(itemsData?.products) ? itemsData.products : [];
  return { isLoading, isError, items };
};

export const useVerifyEducationCustomer = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  return useMutation({
    mutationFn: verifyEducationCustomerRequest,
    onError,
    onSuccess,
  });
};

import { getRemitaProvidersRequest, getRemitaProductsRequest } from "./education.apis";

export const useGetRemitaProviders = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["remita-providers"],
    queryFn: () => getRemitaProvidersRequest(),
  });
  // Handle various potential response structures
  // 1. { data: [...] }
  // 2. { data: { providers: [...] } }
  // 3. { data: { data: [...] } }
  const responseBody = data?.data;
  const dataField = responseBody?.data;

  let providers: any[] = [];

  if (Array.isArray(dataField)) {
    providers = dataField;
  } else if (Array.isArray(dataField?.providers)) {
    providers = dataField.providers;
  } else if (Array.isArray(responseBody?.providers)) {
    providers = responseBody.providers;
  } else if (Array.isArray(dataField?.content)) {
    providers = dataField.content;
  } else if (Array.isArray(dataField?.data)) {
    providers = dataField.data;
  }

  // Debug log
  if (process.env.NODE_ENV === "development" && data) {
    console.log("Remita Providers Response:", { body: responseBody, parsed: providers });
  }

  return { isPending, isError, providers };
};

export const useGetRemitaProducts = (provider: string) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["remita-products", provider],
    queryFn: () => getRemitaProductsRequest(provider),
    enabled: !!provider,
  });

  const responseBody = data?.data;
  const dataField = responseBody?.data;

  let products: any[] = [];

  // Structure: { data: { products: [...] } } based on API docs
  if (Array.isArray(dataField?.products)) {
    products = dataField.products;
  } else if (Array.isArray(dataField)) {
    products = dataField;
  } else if (Array.isArray(responseBody?.products)) {
    products = responseBody.products;
  } else if (Array.isArray(dataField?.data)) {
    products = dataField.data; // Handle double nesting if present
  }

  // Debug log
  if (process.env.NODE_ENV === "development" && data) {
    console.log(`Remita Products Response (${provider}):`, { body: responseBody, parsed: products });
  }

  return { isLoading, isError, products };
};

export const usePayForEducation = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payEducationRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-beneficiaries"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};

export const usePayForWaec = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payWaecRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-beneficiaries"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};

export const usePayForJamb = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payJambRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-beneficiaries"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};


