export type IGCPayload = {
  productId: number;
  quantity: number;
  unitPrice: number;
  amount: number;
  currency: "NGN";
  walletPin: string;
  addBeneficiary: boolean;
};

export type IGetGCFxRate = {
  amount: number;
  currency: string;
};

export interface IGiftCardProduct {
  productId: number;
  productName: string;
  global: boolean;
  supportsQuantity: boolean;
  brandId: number;
  brandName: string;
  countryName: string;
  countryIsoName: string;
  currencyCode: string;
  denominationType: "FIXED" | "RANGE";
  minRecipientDenomination: number | null;
  maxRecipientDenomination: number | null;
  fixedRecipientDenominations: number[];
  logoUrls: string[];
  brandLogoUrls: string[];
}
