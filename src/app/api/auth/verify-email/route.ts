import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashToken } from '@/lib/auth-tokens'
import { sendWelcomeEmail } from '@/lib/email'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Hash the token to compare with stored hash
    const hashedToken = hashToken(token)

    // Find customer with this verification token
    const customer = await prisma.customer.findFirst({
      where: {
        emailVerificationToken: hashedToken,
        isEmailVerified: false,
      },
    })

    if (!customer) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Verify email and clear token
    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        isEmailVerified: true,
        emailVerificationToken: null,
      },
    })

    // Send welcome email (non-blocking)
    try {
      await sendWelcomeEmail(customer.email, customer.name)
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
    }

    return NextResponse.json({
      message: 'Email verified successfully!',
      verified: true,
    })
  } catch (error) {
    console.error('Error verifying email:', error)
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    )
  }
}

