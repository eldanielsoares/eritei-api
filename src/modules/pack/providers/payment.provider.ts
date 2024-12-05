import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment } from 'mercadopago';

@Injectable()
export class PaymentProvider {
  private readonly payment: Payment;

  constructor() {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
      options: {
        timeout: 5000,
      },
    });

    const payment = new Payment(client);

    this.payment = payment;
  }

  async processPayment(): Promise<any> {
    console.log('here');

    try {
      return this.payment.create({
        body: {
          transaction_amount: 1,
          description: 'Compra de produto',
          payment_method_id: 'pix',
          payer: {
            email: 'example@example.com',
            // identification: {
            //   type: 'CPF',
            //   number: '12345678901',
            // },
          },
        },
        requestOptions: { idempotencyKey: '<SOME_UNIQUE_VALUE>' },
      });
    } catch {
      console.log('error');
    }
  }
}
