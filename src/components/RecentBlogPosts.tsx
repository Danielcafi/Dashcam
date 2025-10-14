'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts } from '@/lib/firestore'

export default function RecentBlogPosts() {
  const [posts, setPosts] = useState<Array<{
    id: string;
    title?: string;
    excerpt?: string;
    image?: string;
    slug?: string;
    createdAt?: Date;
    category?: string;
    readTime?: string;
    content?: string;
    author?: string;
    publishedAt?: Date;
  }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await getBlogPosts()
        setPosts(postsData.slice(0, 2))
      } catch (error) {
        console.error('Error loading blog posts:', error)
        // Use mock data if Firebase fails
        setPosts([
          {
            id: '1',
            title: 'How to Choose the Right Dashcam',
            excerpt: 'Everything you need to know about selecting the perfect dashcam for your vehicle.',
            slug: 'how-to-choose-dashcam',
            createdAt: new Date(),
            publishedAt: new Date(),
            author: 'Dashcam Expert',
            image: '/cam4.webp'
          },
          {
            id: '2',
            title: 'Professional Installation Guide',
            excerpt: 'Step-by-step guide to professional dashcam installation.',
            slug: 'professional-installation',
            createdAt: new Date(),
            publishedAt: new Date(),
            author: 'Installation Pro',
            image: '/cam5.webp'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="relative h-48">
            <Image
              src={post.image || '/cam4.webp'}
              alt={post.title || 'Blog post'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                {post.category || 'Guide'}
              </span>
              <span className="ml-2">{post.readTime || '5 min read'}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <span>By {post.author}</span>
              </div>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Read More →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
