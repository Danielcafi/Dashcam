'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Calendar, User, Clock, Share2, Heart } from 'lucide-react'
export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [blogPost, setBlogPost] = useState<{ title: string; content: string; author: string; date: string; image: string; category: string; slug: string; createdAt?: string; readTime?: string; tags?: string[] } | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<Array<{ id: string; title: string; content: string; author: string; date: string; image: string; category: string; slug: string; excerpt?: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        const resolvedParams = await params
        const [postsResponse] = await Promise.all([
          fetch('/api/blog-posts')
        ])
        
        if (!postsResponse.ok) throw new Error('Failed to fetch blog posts')
        const allPosts = await postsResponse.json()
        
        const post = (allPosts as unknown[]).find((p: unknown) => (p as { slug: string }).slug === resolvedParams.slug)
        
        setBlogPost(post as unknown as { title: string; content: string; author: string; date: string; image: string; category: string; slug: string; createdAt?: string; readTime?: string; tags?: string[] } | null)
        // Get 3 related posts (excluding current one)
        setRelatedPosts((allPosts as unknown[]).filter((p: unknown) => (p as { slug: string }).slug !== resolvedParams.slug).slice(0, 3) as unknown as Array<{ id: string; title: string; content: string; author: string; date: string; image: string; category: string; slug: string; excerpt?: string }>)
      } catch (error) {
        console.error('Error loading blog post:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogPost()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {blogPost.category}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {blogPost.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{blogPost.createdAt ? new Date(blogPost.createdAt).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : blogPost.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{blogPost.readTime || '5 min read'}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8">
            <Image
              src={blogPost.image}
              alt={blogPost.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </article>

        {/* Tags */}
        <div className="mt-12 mb-8">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blogPost.tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt || post.content.substring(0, 150) + '...'}
                  </p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Choose Your Dashcam?</h3>
          <p className="text-gray-600 mb-6">
            Browse our selection of premium dashcams and find the perfect one for your vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg">Shop Dashcams</Button>
            </Link>
            <Link href="/installers">
              <Button variant="outline" size="lg">Find an Installer</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
