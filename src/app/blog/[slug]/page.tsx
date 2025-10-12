import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Calendar, User, Clock, Share2, Heart } from 'lucide-react'

// Mock data - in real app, this would come from your database
const blogPost = {
  id: '1',
  title: 'How to Choose the Right Dashcam for Your Vehicle',
  content: `
    <p>Choosing the right dashcam for your vehicle can be overwhelming with so many options available. In this comprehensive guide, we'll walk you through the key factors to consider when selecting a dashcam that meets your specific needs and budget.</p>

    <h2>Understanding Your Needs</h2>
    <p>Before diving into specifications, it's important to understand what you want from your dashcam. Are you looking for basic recording capabilities, or do you need advanced features like parking mode, GPS tracking, or WiFi connectivity?</p>

    <h3>Key Questions to Ask Yourself:</h3>
    <ul>
      <li>What's your primary use case? (Daily commuting, long trips, security monitoring)</li>
      <li>Do you need parking mode functionality?</li>
      <li>How important is video quality to you?</li>
      <li>Do you want features like GPS or WiFi?</li>
      <li>What's your budget range?</li>
    </ul>

    <h2>Video Quality and Resolution</h2>
    <p>Video quality is one of the most important factors when choosing a dashcam. Higher resolution means clearer footage, which is crucial for identifying license plates and other details in case of an incident.</p>

    <h3>Resolution Options:</h3>
    <ul>
      <li><strong>1080p (Full HD):</strong> Good quality for most situations, smaller file sizes</li>
      <li><strong>1440p (2K):</strong> Better detail capture, especially for license plates</li>
      <li><strong>4K:</strong> Highest detail, but larger file sizes and storage requirements</li>
    </ul>

    <h2>Viewing Angle</h2>
    <p>The viewing angle determines how much of the road your dashcam can capture. A wider angle means more coverage but may result in some distortion at the edges.</p>

    <h3>Common Viewing Angles:</h3>
    <ul>
      <li><strong>120°:</strong> Standard coverage, good for most vehicles</li>
      <li><strong>140°:</strong> Wide coverage, popular choice</li>
      <li><strong>160°+:</strong> Ultra-wide, may have some distortion</li>
    </ul>

    <h2>Storage and Memory</h2>
    <p>Dashcams use loop recording, which means they continuously overwrite the oldest footage. The amount of storage you need depends on your usage patterns and video quality settings.</p>

    <h3>Storage Considerations:</h3>
    <ul>
      <li>Higher resolution = larger file sizes</li>
      <li>Longer commutes = more storage needed</li>
      <li>Parking mode = continuous recording</li>
      <li>Consider high-endurance microSD cards</li>
    </ul>

    <h2>Additional Features</h2>
    <p>Modern dashcams come with a variety of additional features that can enhance your experience and provide better protection.</p>

    <h3>Popular Features:</h3>
    <ul>
      <li><strong>GPS:</strong> Speed and location tracking</li>
      <li><strong>WiFi:</strong> Easy file transfer to your phone</li>
      <li><strong>G-Sensor:</strong> Automatic incident detection</li>
      <li><strong>Parking Mode:</strong> Continuous monitoring when parked</li>
      <li><strong>Night Vision:</strong> Enhanced low-light recording</li>
    </ul>

    <h2>Installation Considerations</h2>
    <p>Some dashcams are easier to install than others. Consider whether you want to install it yourself or have it professionally installed.</p>

    <h3>Installation Types:</h3>
    <ul>
      <li><strong>Suction Cup:</strong> Easy to install and remove</li>
      <li><strong>Adhesive Mount:</strong> More permanent, cleaner look</li>
      <li><strong>Hardwired:</strong> Professional installation, parking mode capability</li>
    </ul>

    <h2>Budget Considerations</h2>
    <p>Dashcams range from budget-friendly options under £50 to premium models over £300. Determine your budget and prioritize features that matter most to you.</p>

    <h3>Price Ranges:</h3>
    <ul>
      <li><strong>Budget (£50-£100):</strong> Basic recording, good for simple needs</li>
      <li><strong>Mid-range (£100-£200):</strong> Better quality, additional features</li>
      <li><strong>Premium (£200+):</strong> Best quality, advanced features, professional installation</li>
    </ul>

    <h2>Final Recommendations</h2>
    <p>For most drivers, we recommend starting with a mid-range dashcam that offers good video quality, essential features, and reliable performance. Consider your specific needs and don't be afraid to invest in quality - a good dashcam can provide invaluable protection and peace of mind.</p>

    <p>Remember to check reviews, compare specifications, and consider professional installation for the best results. Your dashcam is an investment in your safety and protection on the road.</p>
  `,
  image: '/blog-1.jpg',
  createdAt: new Date('2024-01-15'),
  slug: 'how-to-choose-right-dashcam',
  author: 'John Smith',
  readTime: '5 min read',
  category: 'Buying Guides',
  tags: ['dashcam', 'buying guide', 'video quality', 'features', 'installation']
}

const relatedPosts = [
  {
    id: '2',
    title: 'Professional Installation vs DIY: What You Need to Know',
    excerpt: 'Discover the benefits of professional dashcam installation and when DIY might be sufficient.',
    image: '/blog-2.jpg',
    createdAt: new Date('2024-01-10'),
    slug: 'professional-vs-diy-installation'
  },
  {
    id: '3',
    title: 'Understanding Dashcam Hardwiring: A Complete Guide',
    excerpt: 'Everything you need to know about hardwiring your dashcam for parking mode functionality.',
    image: '/blog-3.jpg',
    createdAt: new Date('2024-01-05'),
    slug: 'dashcam-hardwiring-complete-guide'
  },
  {
    id: '4',
    title: 'Best Dashcams for 2024: Our Top Picks',
    excerpt: 'Our comprehensive review of the best dashcams available in 2024.',
    image: '/blog-4.jpg',
    createdAt: new Date('2024-01-01'),
    slug: 'best-dashcams-2024-top-picks'
  }
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
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
              <span>{new Date(blogPost.createdAt).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{blogPost.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full h-full object-cover"
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
            {blogPost.tags.map((tag) => (
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
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
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
