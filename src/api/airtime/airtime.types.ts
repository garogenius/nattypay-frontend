export type IInternationalAirtimePlan = {
  phone: string;
};

export type IInternationalAirtimeFxRate = {
  operatorId: number;
  amount: number;
};

export type IAirtimePayPayload = {
  phone: string;
  amount: number;
  currency: string;
  operatorId: number;
  walletPin: string;
  addBeneficiary?: boolean;
};

export type IInternationalAirtimePayPayload = {
  phone: string;
  currency: string;
  operatorId: number;
  amount: number;
  addBeneficiary?: boolean;
  walletPin: string;
};

export type IInternationalAirtimeFxRateResponse = {
  amount: number;
  operatorId: number;
  exchangeRate: number;
  convertedAmount: number;
  currency: string;
};
