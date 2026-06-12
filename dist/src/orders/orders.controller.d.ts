import { Request } from 'express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
interface JwtRequest extends Request {
    user: {
        id: string;
    };
}
export declare class OrdersController {
    private readonly service;
    constructor(service: OrdersService);
    create(req: JwtRequest, dto: CreateOrderDto): Promise<{
        orderId: string;
        init_point: string | undefined;
        sandbox_init_point: string | undefined;
    }>;
    findMyOrders(req: JwtRequest): Promise<({
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                category: string;
                price: number;
                stock: number;
                isOnSale: boolean;
                image: string;
            };
        } & {
            id: string;
            price: number;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        total: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue;
    })[]>;
}
export {};
