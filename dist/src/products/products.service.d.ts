import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { FilterProductDto } from './dto/filter-product.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(dto: PaginationDto, filters?: FilterProductDto, onSale?: boolean): Promise<{
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
    findOne(id: string): Prisma.Prisma__ProductClient<{
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
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    create(dto: CreateProductDto, file?: Express.Multer.File): Promise<{
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
    update(id: string, data: Prisma.ProductUpdateInput): Promise<{
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
