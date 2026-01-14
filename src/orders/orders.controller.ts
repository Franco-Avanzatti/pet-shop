import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Request } from 'express';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface JwtRequest extends Request {
  user: {
    id: string;
  };
}

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create order from current cart' })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    schema: {
      example: {
        id: 'uuid',
        userId: 'uuid',
        total: 15000,
        status: 'PENDING',
        createdAt: '2026-01-12T12:00:00.000Z',
      },
    },
  })
  create(@Req() req: JwtRequest) {
    return this.service.create(req.user.id);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get orders of current user' })
  @ApiResponse({
    status: 200,
    description: 'User orders retrieved',
  })
  findMyOrders(@Req() req: JwtRequest) {
    return this.service.findByUser(req.user.id);
  }
}
