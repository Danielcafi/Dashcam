'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import BlogCard from '@/components/BlogCard'
import { Button } from '@/components/ui/Button'
import { Search, Calendar, User } from 'lucide-react'
export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<Array<{ id: string; title: string; content: string; author: string; date: string; image: string; category: string; slug: string; excerpt: string; createdAt: Date }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog-posts')
        if (!response.ok) throw new Error('Failed to fetch blog posts')
        const posts = await response.json()
        setBlogPosts(posts as unknown as Array<{ id: string; title: string; content: string; author: string; date: string; image: string; category: string; slug: string; excerpt: string; createdAt: Date }>)
      } catch (error) {
        console.error('Error loading blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogPosts()
  }, [])

  const categories = [
    { name: 'All', count: blogPosts.length },
    { name: 'Buying Guides', count: blogPosts.filter(p => p.category === 'Buying Guides').length },
    { name: 'Installation', count: blogPosts.filter(p => p.category === 'Installation').length },
    { name: 'Reviews', count: blogPosts.filter(p => p.category === 'Reviews').length },
    { name: 'Legal', count: blogPosts.filter(p => p.category === 'Legal').length },
    { name: 'Maintenance', count: blogPosts.filter(p => p.category === 'Maintenance').length }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashcam Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert advice, reviews, and guides to help you make the most of your dashcam
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <button className="flex justify-between items-center w-full text-left hover:text-blue-600 transition">
                      <span className="text-sm">{category.name}</span>
                      <span className="text-xs text-gray-500">({category.count})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['4K', 'Hardwiring', 'Parking Mode', 'GPS', 'WiFi', 'Night Vision', 'Wide Angle', 'Storage'].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="relative h-64">
                <Image
                  src="/blog-featured.jpg"
                  alt="Featured post"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <h2 className="text-2xl font-bold mt-2 mb-2">
                    The Complete Guide to Dashcam Installation
                  </h2>
                  <p className="text-gray-200 mb-4">
                    Everything you need to know about installing your dashcam professionally
                  </p>
                  <div className="flex items-center text-sm text-gray-300">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">John Smith</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Jan 20, 2024</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
