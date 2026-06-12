import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ShippingAddressDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @MinLength(2)
  fullName!: string;

  @ApiProperty({ example: 'Av. Corrientes 1234' })
  @IsString()
  address!: string;

  @ApiProperty({ example: 'Buenos Aires' })
  @IsString()
  city!: string;

  @ApiProperty({ example: 'Buenos Aires' })
  @IsString()
  province!: string;

  @ApiProperty({ example: '1043' })
  @IsString()
  postalCode!: string;

  @ApiProperty({ example: '1134567890' })
  @IsString()
  phone!: string;
}

export class CreateOrderDto {
  @ApiProperty({ type: ShippingAddressDto })
  shippingAddress!: ShippingAddressDto;
}
