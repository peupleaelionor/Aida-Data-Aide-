import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
})

export const PRICE_IDS = {
  basic: process.env.STRIPE_BASIC_PRICE_ID ?? 'price_basic',
  pro: process.env.STRIPE_PRO_PRICE_ID ?? 'price_pro',
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID ?? 'price_enterprise',
} as const

export async function createCheckoutSession(params: {
  priceId: string
  userId: string
  email: string
  successUrl: string
  cancelUrl: string
}) {
  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email: params.email,
    line_items: [{ price: params.priceId, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: { userId: params.userId },
    subscription_data: { metadata: { userId: params.userId } },
  })
}

export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}
