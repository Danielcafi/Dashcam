import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AppointmentStatus } from '@prisma/client'

// GET /api/appointments/[id] - Get single appointment
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const appointment = await prisma.appointment.findUnique({
      where: { id },
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

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(appointment)
  } catch (error) {
    console.error('Error fetching appointment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointment' },
      { status: 500 }
    )
  }
}

// PUT /api/appointments/[id] - Update appointment
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
      status,
      notes,
      address,
      postcode,
      installerId,
    } = body

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

    // If changing installer, verify installer exists
    if (installerId && installerId !== existingAppointment.installerId) {
      const installer = await prisma.user.findUnique({
        where: { id: installerId },
      })

      if (!installer) {
        return NextResponse.json(
          { error: 'Installer not found' },
          { status: 404 }
        )
      }
    }

    const updateData: {
      customerName?: string
      customerEmail?: string
      customerPhone?: string
      vehicleMake?: string
      vehicleModel?: string
      vehicleYear?: number
      serviceType?: string
      preferredDate?: Date
      status?: AppointmentStatus
      notes?: string | null
      address?: string
      postcode?: string
      installerId?: string
    } = {}
    if (customerName) updateData.customerName = customerName
    if (customerEmail) updateData.customerEmail = customerEmail
    if (customerPhone) updateData.customerPhone = customerPhone
    if (vehicleMake) updateData.vehicleMake = vehicleMake
    if (vehicleModel) updateData.vehicleModel = vehicleModel
    if (vehicleYear) updateData.vehicleYear = parseInt(vehicleYear)
    if (serviceType) updateData.serviceType = serviceType
    if (preferredDate) updateData.preferredDate = new Date(preferredDate)
    if (status) updateData.status = status as AppointmentStatus
    if (notes !== undefined) updateData.notes = notes
    if (address) updateData.address = address
    if (postcode) updateData.postcode = postcode
    if (installerId) updateData.installerId = installerId

    const appointment = await prisma.appointment.update({
      where: { id },
      data: updateData,
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
    console.error('Error updating appointment:', error)
    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 }
    )
  }
}

// DELETE /api/appointments/[id] - Delete appointment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

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

    await prisma.appointment.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Appointment deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting appointment:', error)
    return NextResponse.json(
      { error: 'Failed to delete appointment' },
      { status: 500 }
    )
  }
}
