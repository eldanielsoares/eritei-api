import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { PreferenceResponse } from 'mercadopago/dist/clients/preference/commonTypes';
import { PreferenceDto } from '../dtos/preference.dto';

import { v4 } from 'uuid';

@Injectable()
export class PaymentProvider {
  private readonly payment: Payment;
  private readonly preference: Preference;

  constructor() {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
      options: {
        timeout: 5000,
      },
    });

    const payment = new Payment(client);
    const preference = new Preference(client);

    this.payment = payment;
    this.preference = preference;
  }

  async createPreference(data: PreferenceDto): Promise<PreferenceResponse> {
    const { id, description, title, unit_price } = data;
    const preferenceResponse = await this.preference.create({
      body: {
        items: [
          {
            id,
            description,
            quantity: 1,
            title,
            currency_id: 'BRL',
            unit_price,
          },
        ],
      },
    });

    return preferenceResponse;
  }

  async processPayment(data: any) {
    try {
      const payment = await this.payment.create({
        body: {
          transaction_amount: data.transaction_amount,
          description: data.description,
          payment_method_id: data.payment_method_id,
          payer: data.payer,
          installments: data.installments,
          token: data.token,
          issuer_id: data.issuer_id,
        },
        requestOptions: { idempotencyKey: v4() },
      });

      return payment;
    } catch {
      console.log('error');
    }
  }
}
