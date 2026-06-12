import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { FilterProductDto } from './dto/filter-product.dto';
export declare class ProductsController {
    private readonly service;
    constructor(service: ProductsService);
    findAll(pagination: PaginationDto, filters: FilterProductDto, onSale?: string): Promise<{
        data: {
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
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ProductClient<{
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
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    create(file: Express.Multer.File, dto: CreateProductDto): Promise<{
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
    }>;
    update(id: string, dto: UpdateProductDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
