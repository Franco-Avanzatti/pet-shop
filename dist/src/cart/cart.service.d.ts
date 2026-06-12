import { PrismaService } from '../../prisma/prisma.service';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    getCart(userId: string): Promise<({
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
            quantity: number;
            cartId: string;
            productId: string;
        })[];
    } & {
        id: string;
        userId: string;
    }) | null>;
    addItem(userId: string, dto: {
        productId: string;
        quantity: number;
    }): Promise<{
        id: string;
        quantity: number;
        cartId: string;
        productId: string;
    }>;
    updateItem(userId: string, dto: {
        productId: string;
        quantity: number;
    }): Promise<{
        id: string;
        quantity: number;
        cartId: string;
        productId: string;
    }>;
    removeItem(userId: string, productId: string): Promise<{
        message: string;
    }>;
    clearCart(userId: string): Promise<{
        message: string;
    }>;
    private ensureCart;
}
