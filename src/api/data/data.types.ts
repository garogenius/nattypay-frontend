export type IDataVariationPayload = {
  operatorId?: number;
};

export type IDataPayPayload = {
  walletPin: string;
  amount: number;
  phoneNumber: string;
  network: string;
  currency: string;
};

export interface IDataVariation {
  amount: string;
  name: string;
}
