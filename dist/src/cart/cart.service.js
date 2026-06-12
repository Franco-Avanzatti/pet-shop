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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCart(userId) {
        return this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: { product: true },
                },
            },
        });
    }
    async addItem(userId, dto) {
        const { productId, quantity } = dto;
        const userExists = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        let cart;
        try {
            cart = await this.prisma.cart.upsert({
                where: { userId },
                update: {},
                create: { userId },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                cart = await this.prisma.cart.findUnique({
                    where: { userId },
                });
            }
            else {
                throw error;
            }
        }
        if (!cart) {
            throw new common_1.BadRequestException('Cart could not be created');
        }
        return this.prisma.cartItem.upsert({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
            update: {
                quantity: {
                    increment: quantity,
                },
            },
            create: {
                cartId: cart.id,
                productId,
                quantity,
            },
        });
    }
    async updateItem(userId, dto) {
        const cart = await this.ensureCart(userId);
        const cartItem = await this.prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId: dto.productId,
                },
            },
        });
        if (!cartItem) {
            throw new common_1.BadRequestException('Product is not in cart');
        }
        return this.prisma.cartItem.update({
            where: { id: cartItem.id },
            data: { quantity: dto.quantity },
        });
    }
    async removeItem(userId, productId) {
        const cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            return { message: 'Cart not found' };
        const deleted = await this.prisma.cartItem.deleteMany({
            where: {
                cartId: cart.id,
                productId,
            },
        });
        if (deleted.count === 0) {
            return { message: 'Item not found in cart' };
        }
        return { message: 'Item removed' };
    }
    async clearCart(userId) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
        });
        if (!cart) {
            return { message: 'Cart already empty' };
        }
        await this.prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
        });
        return { message: 'Cart cleared successfully' };
    }
    async ensureCart(userId) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
        });
        if (cart)
            return cart;
        return this.prisma.cart.create({
            data: { userId },
        });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map