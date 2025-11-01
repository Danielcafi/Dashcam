import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth'
import { generateSecureToken, hashToken } from '@/lib/auth-tokens'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, phone } = body

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Check if customer already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Generate email verification token
    const verificationToken = generateSecureToken()
    const hashedToken = hashToken(verificationToken)

    // Create customer
    const customer = await prisma.customer.create({
      data: {
        email: email.toLowerCase().trim(),
        name: name.trim(),
        passwordHash,
        phone: phone?.trim() || null,
        emailVerificationToken: hashedToken,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        createdAt: true,
        isEmailVerified: true,
      },
    })

    // Send verification email (don't block on error)
    try {
      await sendVerificationEmail(
        customer.email,
        customer.name,
        verificationToken
      )
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      // Continue with registration even if email fails
    }

    // Generate token and set cookie (user can still log in, but with limited access)
    const token = generateToken({
      userId: customer.id,
      email: customer.email,
    })
    await setAuthCookie(token)

    return NextResponse.json(
      {
        user: customer,
        token,
        message: 'Registration successful. Please check your email to verify your account.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error registering customer:', error)
    return NextResponse.json(
      { error: 'Failed to register. Please try again.' },
      { status: 500 }
    )
  }
}

