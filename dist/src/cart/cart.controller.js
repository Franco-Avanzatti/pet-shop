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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cart_service_1 = require("./cart.service");
const cart_item_dto_1 = require("./dto/cart-item.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const update_cart_item_dto_1 = require("./dto/update-cart-item.dto");
let CartController = class CartController {
    service;
    constructor(service) {
        this.service = service;
    }
    getCart(req) {
        return this.service.getCart(req.user.id);
    }
    addItem(req, dto) {
        return this.service.addItem(req.user.id, dto);
    }
    updateItem(req, dto) {
        return this.service.updateItem(req.user.id, dto);
    }
    removeItem(req, productId) {
        return this.service.removeItem(req.user.id, productId);
    }
    clearCart(req) {
        return this.service.clearCart(req.user.id);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user cart' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User cart retrieved' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)('items'),
    (0, swagger_1.ApiOperation)({ summary: 'Add product to cart' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product added to cart' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cart_item_dto_1.CartItemDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addItem", null);
__decorate([
    (0, common_1.Patch)('items'),
    (0, swagger_1.ApiOperation)({ summary: 'Update cart item quantity' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart item updated' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_cart_item_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('items/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove item from cart by productId' }),
    (0, swagger_1.ApiParam)({
        name: 'productId',
        description: 'Product ID to remove from cart',
        example: 'a3f6d1b2-1234-4bcd-9abc-123456789abc',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart item removed' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Clear current user cart' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart cleared' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "clearCart", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map