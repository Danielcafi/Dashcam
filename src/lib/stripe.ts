import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-09-30.clover',
  typescript: true,
})

export const formatAmountForDisplay = (amount: number, currency: string): string => {
  const numberFormat = new Intl.NumberFormat(['en-GB'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  return numberFormat.format(amount)
}

export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100)
}
