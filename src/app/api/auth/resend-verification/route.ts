import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { generateSecureToken, hashToken } from '@/lib/auth-tokens'
import { sendVerificationEmail } from '@/lib/email'

export async function POST() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const customer = await prisma.customer.findUnique({ where: { id: user.userId } })
    if (!customer) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (customer.isEmailVerified) {
      return NextResponse.json({ message: 'Email already verified' })
    }

    const token = generateSecureToken()
    const hashed = hashToken(token)

    await prisma.customer.update({
      where: { id: customer.id },
      data: { emailVerificationToken: hashed },
    })

    await sendVerificationEmail(customer.email, customer.name, token)

    return NextResponse.json({ message: 'Verification email sent' })
  } catch (error) {
    console.error('Error resending verification email:', error)
    return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 })
  }
}

