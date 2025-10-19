import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/installers/[id] - Get single installer
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const installer = await prisma.user.findUnique({
      where: { id },
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
        updatedAt: true,
        _count: {
          select: {
            appointments: true,
          },
        },
      },
    })

    if (!installer) {
      return NextResponse.json(
        { error: 'Installer not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(installer)
  } catch (error) {
    console.error('Error fetching installer:', error)
    return NextResponse.json(
      { error: 'Failed to fetch installer' },
      { status: 500 }
    )
  }
}

// PUT /api/installers/[id] - Update installer
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, email, phone, location, bio, rating, isActive } = body

    // Check if installer exists
    const existingInstaller = await prisma.user.findUnique({
      where: { id },
    })

    if (!existingInstaller) {
      return NextResponse.json(
        { error: 'Installer not found' },
        { status: 404 }
      )
    }

    // If changing email, check if new email already exists
    if (email && email !== existingInstaller.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      })

      if (emailExists) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 409 }
        )
      }
    }

    const updateData: {
      name?: string
      email?: string
      phone?: string | null
      location?: string | null
      bio?: string | null
      rating?: number
      isActive?: boolean
    } = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (phone !== undefined) updateData.phone = phone
    if (location !== undefined) updateData.location = location
    if (bio !== undefined) updateData.bio = bio
    if (rating !== undefined) updateData.rating = parseFloat(rating)
    if (isActive !== undefined) updateData.isActive = isActive

    const installer = await prisma.user.update({
      where: { id },
      data: updateData,
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
        updatedAt: true,
      },
    })

    return NextResponse.json(installer)
  } catch (error) {
    console.error('Error updating installer:', error)
    return NextResponse.json(
      { error: 'Failed to update installer' },
      { status: 500 }
    )
  }
}

// DELETE /api/installers/[id] - Delete installer (soft delete by setting isActive to false)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if installer exists
    const existingInstaller = await prisma.user.findUnique({
      where: { id },
    })

    if (!existingInstaller) {
      return NextResponse.json(
        { error: 'Installer not found' },
        { status: 404 }
      )
    }

    // Soft delete by setting isActive to false
    await prisma.user.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json(
      { message: 'Installer deactivated successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting installer:', error)
    return NextResponse.json(
      { error: 'Failed to delete installer' },
      { status: 500 }
    )
  }
}
