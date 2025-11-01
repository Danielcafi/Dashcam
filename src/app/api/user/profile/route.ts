import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    const auth = await getCurrentUser()
    if (!auth) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const user = await prisma.customer.findUnique({
      where: { id: auth.userId },
      select: { id: true, email: true, name: true, phone: true, isEmailVerified: true, createdAt: true },
    })

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await getCurrentUser()
    if (!auth) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { name, phone } = await request.json()

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 })
    }

    const updated = await prisma.customer.update({
      where: { id: auth.userId },
      data: { name: name.trim(), phone: phone ? String(phone).trim() : null },
      select: { id: true, email: true, name: true, phone: true, isEmailVerified: true, createdAt: true },
    })

    return NextResponse.json({ user: updated })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}

