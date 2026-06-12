import { PrismaService } from '../../prisma/prisma.service';
import { MercadoPagoService } from '../mercadopago/mercadopago.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private readonly prisma;
    private readonly mpService;
    constructor(prisma: PrismaService, mpService: MercadoPagoService);
    create(userId: string, dto: CreateOrderDto): Promise<{
        orderId: string;
        init_point: string | undefined;
        sandbox_init_point: string | undefined;
    }>;
    findByUser(userId: string): Promise<({
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
