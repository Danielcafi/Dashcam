import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/installers - Create new installer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, location, bio } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Check if installer with this email already exists
    const existingInstaller = await prisma.user.findUnique({
      where: { email },
    })

    if (existingInstaller) {
      return NextResponse.json(
        { error: 'Installer with this email already exists' },
        { status: 409 }
      )
    }

    const installer = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        location,
        bio,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        location: true,
        bio: true,
        rating: true,
        isActive: true,
        createdAt: true,
      },
    })

    return NextResponse.json(installer, { status: 201 })
  } catch (error) {
    console.error('Error creating installer:', error)
    return NextResponse.json(
      { error: 'Failed to create installer' },
      { status: 500 }
    )
  }
}