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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const mercadopago_service_1 = require("../mercadopago/mercadopago.service");
let OrdersService = class OrdersService {
    prisma;
    mpService;
    constructor(prisma, mpService) {
        this.prisma = prisma;
        this.mpService = mpService;
    }
    async create(userId, dto) {
        const { shippingAddress } = dto;
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: { product: true },
                },
            },
        });
        if (!cart || cart.items.length === 0) {
            throw new Error('Cart is empty');
        }
        const total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const shippingAddressJson = {
            ...shippingAddress,
        };
        const order = await this.prisma.order.create({
            data: {
                userId,
                status: 'PENDING',
                total,
                shippingAddress: shippingAddressJson,
                items: {
                    create: cart.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price,
                    })),
                },
            },
        });
        const mpItems = cart.items.map((item) => ({
            id: item.product.id,
            title: item.product.name,
            quantity: item.quantity,
            unit_price: item.product.price,
        }));
        const preference = await this.mpService.createPreference(mpItems, order.id);
        return {
            orderId: order.id,
            init_point: preference.init_point,
            sandbox_init_point: preference.sandbox_init_point,
        };
    }
    async findByUser(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mercadopago_service_1.MercadoPagoService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map