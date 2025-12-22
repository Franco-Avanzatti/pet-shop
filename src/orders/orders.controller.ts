import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface JwtRequest extends Request {
  user: {
    sub: string;
  };
}

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  create(@Req() req: JwtRequest) {
    return this.service.create(req.user.sub);
  }

  @Get('me')
  findMyOrders(@Req() req: JwtRequest) {
    return this.service.findByUser(req.user.sub);
  }
}
