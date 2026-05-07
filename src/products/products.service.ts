import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import cloudinary from '../config/cloudinary';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {} // ← constructor vacío y cerrado

  async findAll(
    dto: PaginationDto,
    filters?: FilterProductDto,
    onSale?: boolean,
  ) {
    const { page = 1, limit = 10 } = dto;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      ...(onSale ? { isOnSale: true } : {}),
      ...(filters?.category ? { category: filters.category } : {}),
      ...(filters?.search
        ? {
            name: {
              contains: filters.search,
              mode: 'insensitive', // 👈 case-insensitive
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

    const orderBy: Prisma.ProductOrderByWithRelationInput =
      filters?.orden === 'asc'
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
  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(dto: CreateProductDto, file?: Express.Multer.File) {
    let imageUrl = 'https://fake-image.test/default.jpg';

    if (file && process.env.NODE_ENV !== 'test') {
      const upload = await cloudinary.uploader.upload(file.path);

      try {
        await fs.promises.unlink(file.path);
      } catch (err) {
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

  async update(id: string, data: Prisma.ProductUpdateInput) {
    if (!Object.keys(data).length) {
      throw new BadRequestException('No data provided to update');
    }

    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.product.delete({
        where: { id },
      });

      return deleted;
    } catch (error: unknown) {
      console.log('[REFACT-SANSO][PRODUCTS][REMOVE] deleted.err', {
        id,
        error,
      });

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Product not found');
      }

      throw error;
    }
  }
}
