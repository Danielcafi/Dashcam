import Stripe from 'stripe'

// Safe Stripe initialization that won't fail during build
export const createStripeInstance = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null
  }
  
  try {
    return new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-09-30.clover',
      typescript: true,
    })
  } catch (error) {
    console.error('Failed to initialize Stripe:', error)
    return null
  }
}

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
