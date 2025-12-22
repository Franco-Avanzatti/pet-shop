import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItemDto } from './dto/cart-item.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('cart')
export class CartController {
  constructor(private readonly service: CartService) {}

  @Get()
  getCart(@Req() req: { user: { sub: string } }) {
    return this.service.getCart(req.user.sub);
  }

  @Post('items')
  addItem(@Req() req: { user: { sub: string } }, @Body() dto: CartItemDto) {
    return this.service.addItem(req.user.sub, dto);
  }

  @Patch('items')
  updateItem(@Req() req: { user: { sub: string } }, @Body() dto: CartItemDto) {
    return this.service.updateItem(req.user.sub, dto);
  }
}
