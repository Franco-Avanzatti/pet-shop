import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { env } from '../config/env.config';

interface PreferenceItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

@Injectable()
export class MercadoPagoService {
  private preference: Preference;

  constructor() {
    const client = new MercadoPagoConfig({
      accessToken: env.MP_ACCESS_TOKEN,
    });

    this.preference = new Preference(client);
  }

  async createPreference(items: PreferenceItem[], orderId: string) {
    const response = await this.preference.create({
      body: {
        items,

        external_reference: orderId,

        back_urls: {
          success: `${env.MP_FRONTEND_URL}/checkout/success`,
          failure: `${env.MP_FRONTEND_URL}/checkout/failure`,
          pending: `${env.MP_FRONTEND_URL}/checkout/pending`,
        },

        auto_return: 'approved',

        notification_url: `${env.BACKEND_URL}/api/payments/webhook`,
      },
    });

    return {
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    };
  }
}
