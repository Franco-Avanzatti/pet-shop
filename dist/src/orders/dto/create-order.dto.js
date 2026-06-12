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
exports.CreateOrderDto = exports.ShippingAddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ShippingAddressDto {
    fullName;
    address;
    city;
    province;
    postalCode;
    phone;
}
exports.ShippingAddressDto = ShippingAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Juan Pérez' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Av. Corrientes 1234' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Buenos Aires' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Buenos Aires' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "province", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1043' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1134567890' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "phone", void 0);
class CreateOrderDto {
    shippingAddress;
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: ShippingAddressDto }),
    __metadata("design:type", ShippingAddressDto)
], CreateOrderDto.prototype, "shippingAddress", void 0);
//# sourceMappingURL=create-order.dto.js.map