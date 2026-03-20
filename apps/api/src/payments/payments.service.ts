import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Stripe from 'stripe'

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name)
  private stripe: Stripe

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY')!, {
      apiVersion: '2024-04-10',
    })
  }

  async createCheckoutSession(params: {
    priceId: string
    userId: string
    email: string
    successUrl: string
    cancelUrl: string
  }) {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: params.email,
      line_items: [{ price: params.priceId, quantity: 1 }],
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: { userId: params.userId },
    })
  }

  async createPortalSession(customerId: string, returnUrl: string) {
    return this.stripe.billingPortal.sessions.create({ customer: customerId, return_url: returnUrl })
  }

  async handleWebhook(rawBody: Buffer, signature: string): Promise<void> {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET')!
    let event: Stripe.Event

    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
    } catch (err) {
      this.logger.error('Webhook signature verification failed', err)
      throw err
    }

    switch (event.type) {
      case 'customer.subscription.updated':
      case 'customer.subscription.created':
        this.logger.log('Subscription event:', event.type, (event.data.object as Stripe.Subscription).id)
        break
      case 'invoice.payment_succeeded':
        this.logger.log('Payment succeeded:', (event.data.object as Stripe.Invoice).id)
        break
      default:
        this.logger.debug('Unhandled Stripe event:', event.type)
    }
  }
}
