import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post('webhook')
  @ApiOperation({ summary: 'Mercado Pago webhook' })
  async webhook(@Body() body: Record<string, unknown>) {
    return this.service.handleWebhook(body);
  }
}
