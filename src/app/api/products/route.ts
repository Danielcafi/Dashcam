import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products - list products
export async function GET() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const products = await (prisma as any).product.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

// POST /api/products - create product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, price, brand, category, description, images } = body

    if (!name || typeof price !== 'number') {
      return NextResponse.json({ error: 'name and price are required' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const created = await (prisma as any).product.create({
      data: {
        name,
        price,
        brand,
        category,
        description,
        images: Array.isArray(images) ? images : [],
      },
    })
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}


