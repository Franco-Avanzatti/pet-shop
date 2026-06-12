"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoService = void 0;
const common_1 = require("@nestjs/common");
const mercadopago_1 = require("mercadopago");
const env_config_1 = require("../config/env.config");
let MercadoPagoService = class MercadoPagoService {
    preference;
    constructor() {
        const client = new mercadopago_1.MercadoPagoConfig({
            accessToken: env_config_1.env.MP_ACCESS_TOKEN,
        });
        this.preference = new mercadopago_1.Preference(client);
    }
    async createPreference(items, orderId) {
        const response = await this.preference.create({
            body: {
                items,
                external_reference: orderId,
                back_urls: {
                    success: `${env_config_1.env.MP_FRONTEND_URL}/checkout/success`,
                    failure: `${env_config_1.env.MP_FRONTEND_URL}/checkout/failure`,
                    pending: `${env_config_1.env.MP_FRONTEND_URL}/checkout/pending`,
                },
                auto_return: 'approved',
                notification_url: `${env_config_1.env.BACKEND_URL}/api/payments/webhook`,
            },
        });
        return {
            id: response.id,
            init_point: response.init_point,
            sandbox_init_point: response.sandbox_init_point,
        };
    }
};
exports.MercadoPagoService = MercadoPagoService;
exports.MercadoPagoService = MercadoPagoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MercadoPagoService);
//# sourceMappingURL=mercadopago.service.js.map