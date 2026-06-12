"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const fs = __importStar(require("fs"));
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(dto, filters, onSale) {
        const { page = 1, limit = 10 } = dto;
        const skip = (page - 1) * limit;
        const where = {
            ...(onSale ? { isOnSale: true } : {}),
            ...(filters?.category ? { category: filters.category } : {}),
            ...(filters?.search
                ? {
                    name: {
                        contains: filters.search,
                        mode: 'insensitive',
                    },
                }
                : {}),
            ...(filters?.precioMin !== undefined || filters?.precioMax !== undefined
                ? {
                    price: {
                        ...(filters?.precioMin !== undefined
                            ? { gte: filters.precioMin }
                            : {}),
                        ...(filters?.precioMax !== undefined
                            ? { lte: filters.precioMax }
                            : {}),
                    },
                }
                : {}),
        };
        const orderBy = filters?.orden === 'asc'
            ? { price: 'asc' }
            : filters?.orden === 'desc'
                ? { price: 'desc' }
                : filters?.orden === 'a-z'
                    ? { name: 'asc' }
                    : filters?.orden === 'z-a'
                        ? { name: 'desc' }
                        : { createdAt: 'desc' };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({ where, skip, take: limit, orderBy }),
            this.prisma.product.count({ where }),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    findOne(id) {
        return this.prisma.product.findUnique({
            where: { id },
        });
    }
    async create(dto, file) {
        let imageUrl = 'https://fake-image.test/default.jpg';
        if (file && process.env.NODE_ENV !== 'test') {
            const upload = await cloudinary_1.default.uploader.upload(file.path);
            try {
                await fs.promises.unlink(file.path);
            }
            catch (err) {
                console.warn('Temp file cleanup failed:', err);
            }
            imageUrl = upload.secure_url;
        }
        return this.prisma.product.create({
            data: {
                ...dto,
                image: imageUrl,
            },
        });
    }
    async update(id, data) {
        if (!Object.keys(data).length) {
            throw new common_1.BadRequestException('No data provided to update');
        }
        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return this.prisma.product.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.product.delete({
                where: { id },
            });
            return deleted;
        }
        catch (error) {
            console.log('[REFACT-SANSO][PRODUCTS][REMOVE] deleted.err', {
                id,
                error,
            });
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw new common_1.NotFoundException('Product not found');
            }
            throw error;
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map