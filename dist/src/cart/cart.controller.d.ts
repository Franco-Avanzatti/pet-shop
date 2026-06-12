import { CartService } from './cart.service';
import { CartItemDto } from './dto/cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartController {
    private readonly service;
    constructor(service: CartService);
    getCart(req: {
        user: {
            id: string;
        };
    }): Promise<({
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
    addItem(req: {
        user: {
            id: string;
        };
    }, dto: CartItemDto): Promise<{
        id: string;
        quantity: number;
        cartId: string;
        productId: string;
    }>;
    updateItem(req: {
        user: {
            id: string;
        };
    }, dto: UpdateCartItemDto): Promise<{
        id: string;
        quantity: number;
        cartId: string;
        productId: string;
    }>;
    removeItem(req: {
        user: {
            id: string;
        };
    }, productId: string): Promise<{
        message: string;
    }>;
    clearCart(req: {
        user: {
            id: string;
        };
    }): Promise<{
        message: string;
    }>;
}
