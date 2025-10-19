import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AppointmentStatus } from '@prisma/client'

// GET /api/appointments - Get all appointments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const installerId = searchParams.get('installerId')
    const status = searchParams.get('status') as AppointmentStatus | null
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = {
      ...(installerId && { installerId }),
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
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}

// POST /api/appointments - Create new appointment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customerName,
      customerEmail,
      customerPhone,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      serviceType,
      preferredDate,
      notes,
      address,
      postcode,
      installerId,
    } = body

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !vehicleMake || 
        !vehicleModel || !vehicleYear || !serviceType || !preferredDate || 
        !address || !postcode || !installerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

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

    const appointment = await prisma.appointment.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        vehicleMake,
        vehicleModel,
        vehicleYear: parseInt(vehicleYear),
        serviceType,
        preferredDate: new Date(preferredDate),
        notes,
        address,
        postcode,
        installerId,
      },
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
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}
