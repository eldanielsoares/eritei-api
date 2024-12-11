import { PayerRequest } from 'mercadopago/dist/clients/payment/create/types';

export type PurchasePackPaymentDto = PurchasePackDto & {
  token: string;
  issuer_id: string;
  payment_method_id: string;
  transaction_amount: string;
  installments: number;
  payer: PayerRequest;
};

export type PurchasePackDto = {
  userId: string;
  packId: string;
  paymentId: string;
  deckId: string;
};
