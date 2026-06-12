import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min } from 'class-validator';

export class CartItemDto {
  @ApiProperty({
    description: 'Product ID',
    example: 'a3f6d1b2-1234-4bcd-9abc-123456789abc',
  })
  @IsUUID()
  productId!: string;

  @ApiProperty({
    description: 'Quantity to add',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity!: number;
}
