import { Injectable, Logger } from '@nestjs/common';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

@Injectable()
export class PaymentProvider {
  private readonly preference: Preference;

  constructor() {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN, // Use variável de ambiente
      options: {
        timeout: 5000, // Define timeout para requisições
      },
    });

    const preference = new Preference(client);

    // Inicializa o objeto Payment
    this.preference = preference;
  }

  /**
   * Processa um pagamento com os dados fornecidos
   */
  async processPayment(): Promise<any> {
    try {
      return this.preference.create({
        body: {
          items: [
            {
              id: '1',
              title: 'Meu produto',
              quantity: 1,
              unit_price: 25,
            },
          ],
        },
      });
    } catch (error) {
      throw new Error(`Payment failed: ${error.message}`);
    }
  }
}
