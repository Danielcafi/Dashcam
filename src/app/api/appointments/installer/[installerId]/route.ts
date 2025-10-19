import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AppointmentStatus } from '@prisma/client'

// GET /api/appointments/installer/[installerId] - Get appointments by installer
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ installerId: string }> }
) {
  try {
    const { installerId } = await params
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as AppointmentStatus | null
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Check if installer exists
    const installer = await prisma.user.findUnique({
      where: { id: installerId },
    })

    if (!installer) {
      return NextResponse.json(
        { error: 'Installer not found' },
        { status: 404 }
      )
    }

    const where = {
      installerId,
      ...(status && { status }),
    }

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: {
          installer: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              location: true,
              rating: true,
            },
          },
        },
        orderBy: {
          preferredDate: 'asc',
        },
        skip,
        take: limit,
      }),
      prisma.appointment.count({ where }),
    ])

    return NextResponse.json({
      appointments,
      installer: {
        id: installer.id,
        name: installer.name,
        email: installer.email,
        phone: installer.phone,
        location: installer.location,
        rating: installer.rating,
      },
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching installer appointments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch installer appointments' },
      { status: 500 }
    )
  }
}
