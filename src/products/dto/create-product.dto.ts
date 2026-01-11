import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Bred Dog Adulto' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Premium dog food 10kg' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'https://image.url/product.jpg' })
  @IsString()
  image: string;

  @ApiProperty({ example: 'FOOD' })
  @IsString()
  category: string;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(0)
  stock: number;
}
