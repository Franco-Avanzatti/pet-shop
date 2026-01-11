import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  // 🌍 PUBLIC
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAll() {
    return this.service.findAll();
  }

  // 🌍 PUBLIC
  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // 🔒 ADMIN ONLY
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a product (ADMIN)' })
  @ApiResponse({ status: 201, description: 'Product created' })
  @ApiForbiddenResponse({ description: 'Admin only' })
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  // 🔒 ADMIN ONLY
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product (ADMIN)' })
  @ApiForbiddenResponse({ description: 'Admin only' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.service.update(id, dto);
  }

  // 🔒 ADMIN ONLY
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product (ADMIN)' })
  @ApiForbiddenResponse({ description: 'Admin only' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
