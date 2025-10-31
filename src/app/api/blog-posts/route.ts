import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/blog-posts - list posts
export async function GET() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts = await (prisma as any).blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

// POST /api/blog-posts - create post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, excerpt, content, image } = body

    if (!title || !slug) {
      return NextResponse.json({ error: 'title and slug are required' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const created = await (prisma as any).blogPost.create({
      data: { title, slug, excerpt, content, image },
    })
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}


