import { Controller, Post, Body, Headers, RawBodyRequest, Req, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import type { Request } from 'express'
import { PaymentsService } from './payments.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CurrentUser } from '../auth/decorators/current-user.decorator'

class CreateCheckoutDto {
  @ApiProperty() @IsString() priceId!: string
  @ApiProperty() @IsString() successUrl!: string
  @ApiProperty() @IsString() cancelUrl!: string
}

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Stripe checkout session' })
  createCheckout(@Body() dto: CreateCheckoutDto, @CurrentUser() user: { id: string; email: string }) {
    return this.paymentsService.createCheckoutSession({
      priceId: dto.priceId,
      userId: user.id,
      email: user.email,
      successUrl: dto.successUrl,
      cancelUrl: dto.cancelUrl,
    })
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Stripe webhook handler' })
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string
  ) {
    await this.paymentsService.handleWebhook(req.rawBody!, signature)
    return { received: true }
  }
}
