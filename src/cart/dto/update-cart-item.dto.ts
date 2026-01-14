import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min } from 'class-validator';

export class UpdateCartItemDto {
  @ApiProperty({
    description: 'Product ID',
    example: 'a3f6d1b2-1234-4bcd-9abc-123456789abc',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    description: 'New quantity (must be >= 1)',
    example: 5,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
