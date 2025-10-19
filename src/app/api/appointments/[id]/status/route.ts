import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AppointmentStatus } from '@prisma/client'

// PATCH /api/appointments/[id]/status - Update appointment status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }

    // Validate status
    const validStatuses = Object.values(AppointmentStatus)
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: ' + validStatuses.join(', ') },
        { status: 400 }
      )
    }

    // Check if appointment exists
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id },
    })

    if (!existingAppointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      )
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status: status as AppointmentStatus },
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

    return NextResponse.json(appointment)
  } catch (error) {
    console.error('Error updating appointment status:', error)
    return NextResponse.json(
      { error: 'Failed to update appointment status' },
      { status: 500 }
    )
  }
}
