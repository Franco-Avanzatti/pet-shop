import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'Bred Dog Adulto' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Premium dog food 10kg' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 'FOOD' })
  @IsString()
  category!: string;

  @ApiProperty({ example: 1500 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: 20 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  stock!: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isOnSale?: boolean;
}
