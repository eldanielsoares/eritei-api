export type PaymentDataDto = {
  transaction_amount: number; // O valor da transação
  token: string; // Token gerado pelo Mercado Pago (cartão ou outro método)
  description: string; // Descrição do item/serviço
  installments: number; // Número de parcelas
  payment_method_id: string; // ID do método de pagamento (ex: visa, master, etc.)
  issuer_id?: string; // (Opcional) ID do emissor do cartão
  payer: {
    email: string; // E-mail do pagador
  };
};

export type PurchasePackDto = {
  userId: string;
  packId: string;
};
