import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CartItemDto } from './dto/cart-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly service: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user cart' })
  @ApiResponse({ status: 200, description: 'User cart retrieved' })
  getCart(@Req() req: { user: { id: string } }) {
    return this.service.getCart(req.user.id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add product to cart' })
  @ApiResponse({ status: 201, description: 'Product added to cart' })
  addItem(@Req() req: { user: { id: string } }, @Body() dto: CartItemDto) {
    return this.service.addItem(req.user.id, dto);
  }

  @Patch('items')
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiResponse({ status: 200, description: 'Cart item updated' })
  updateItem(
    @Req() req: { user: { id: string } },
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.service.updateItem(req.user.id, dto);
  }

  // 🗑️ DELETE ITEM BY CartItem ID
  @Delete('items/:productId')
  @ApiOperation({ summary: 'Remove item from cart by productId' })
  @ApiParam({
    name: 'productId',
    description: 'Product ID to remove from cart',
    example: 'a3f6d1b2-1234-4bcd-9abc-123456789abc',
  })
  @ApiResponse({ status: 200, description: 'Cart item removed' })
  removeItem(
    @Req() req: { user: { id: string } },
    @Param('productId') productId: string,
  ) {
    return this.service.removeItem(req.user.id, productId);
  }

  // 🧹 CLEAR ENTIRE CART
  @Delete()
  @ApiOperation({ summary: 'Clear current user cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared' })
  clearCart(@Req() req: { user: { id: string } }) {
    return this.service.clearCart(req.user.id);
  }
}
