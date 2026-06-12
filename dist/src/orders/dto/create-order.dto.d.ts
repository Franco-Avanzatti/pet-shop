export declare class ShippingAddressDto {
    fullName: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    phone: string;
}
export declare class CreateOrderDto {
    shippingAddress: ShippingAddressDto;
}
