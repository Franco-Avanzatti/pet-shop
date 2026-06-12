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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const mercadopago_1 = require("mercadopago");
const env_config_1 = require("../config/env.config");
let PaymentsService = class PaymentsService {
    prisma;
    payment;
    constructor(prisma) {
        this.prisma = prisma;
        const client = new mercadopago_1.MercadoPagoConfig({
            accessToken: env_config_1.env.MP_ACCESS_TOKEN,
        });
        this.payment = new mercadopago_1.Payment(client);
    }
    async handleWebhook(body) {
        const type = body.type;
        if (type !== 'payment')
            return { received: true };
        const data = body.data;
        const paymentId = data?.id;
        if (!paymentId)
            return { received: true };
        const payment = await this.payment.get({ id: paymentId });
        const orderId = payment.external_reference;
        const status = payment.status;
        if (!orderId)
            return { received: true };
        if (status === 'approved') {
            await this.prisma.order.update({
                where: { id: orderId },
                data: { status: 'PAID' },
            });
        }
        if (status === 'rejected') {
            await this.prisma.order.update({
                where: { id: orderId },
                data: { status: 'CANCELLED' },
            });
        }
        return { received: true };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map