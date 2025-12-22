import { Controller, Post, Get, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  create(@Req() req: any) {
    return this.service.create(req.user.sub);
  }

  @Get('me')
  findMyOrders(@Req() req: any) {
    return this.service.findByUser(req.user.sub);
  }
}
