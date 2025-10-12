import BlogCard from '@/components/BlogCard'
import { Button } from '@/components/ui/Button'
import { Search, Calendar, User } from 'lucide-react'

// Mock data - in real app, this would come from your database
const blogPosts = [
  {
    id: '1',
    title: 'How to Choose the Right Dashcam for Your Vehicle',
    excerpt: 'Learn about the key features to consider when selecting a dashcam that meets your needs and budget. From resolution and viewing angles to storage and connectivity options.',
    image: '/blog-1.jpg',
    createdAt: new Date('2024-01-15'),
    slug: 'how-to-choose-right-dashcam',
    author: 'John Smith',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Professional Installation vs DIY: What You Need to Know',
    excerpt: 'Discover the benefits of professional dashcam installation and when DIY might be sufficient. We break down the pros and cons of each approach.',
    image: '/blog-2.jpg',
    createdAt: new Date('2024-01-10'),
    slug: 'professional-vs-diy-installation',
    author: 'Sarah Johnson',
    readTime: '7 min read'
  },
  {
    id: '3',
    title: 'Understanding Dashcam Hardwiring: A Complete Guide',
    excerpt: 'Everything you need to know about hardwiring your dashcam for parking mode functionality. Step-by-step guide with safety tips and best practices.',
    image: '/blog-3.jpg',
    createdAt: new Date('2024-01-05'),
    slug: 'dashcam-hardwiring-complete-guide',
    author: 'Mike Wilson',
    readTime: '8 min read'
  },
  {
    id: '4',
    title: 'Best Dashcams for 2024: Our Top Picks',
    excerpt: 'Our comprehensive review of the best dashcams available in 2024, covering different price ranges and use cases. Find the perfect dashcam for your needs.',
    image: '/blog-4.jpg',
    createdAt: new Date('2024-01-01'),
    slug: 'best-dashcams-2024-top-picks',
    author: 'Emma Davis',
    readTime: '12 min read'
  },
  {
    id: '5',
    title: 'Dashcam Legal Requirements in the UK',
    excerpt: 'Understanding the legal aspects of using dashcams in the UK, including data protection, privacy laws, and what footage can be used as evidence.',
    image: '/blog-5.jpg',
    createdAt: new Date('2023-12-28'),
    slug: 'dashcam-legal-requirements-uk',
    author: 'David Brown',
    readTime: '6 min read'
  },
  {
    id: '6',
    title: 'Maintaining Your Dashcam: Tips for Longevity',
    excerpt: 'Keep your dashcam in top condition with our maintenance guide. Learn about cleaning, storage, firmware updates, and troubleshooting common issues.',
    image: '/blog-6.jpg',
    createdAt: new Date('2023-12-20'),
    slug: 'maintaining-dashcam-tips-longevity',
    author: 'Lisa Anderson',
    readTime: '4 min read'
  }
]

const categories = [
  { name: 'All', count: 24 },
  { name: 'Buying Guides', count: 8 },
  { name: 'Installation', count: 6 },
  { name: 'Reviews', count: 5 },
  { name: 'Legal', count: 3 },
  { name: 'Maintenance', count: 2 }
]

export default function BlogPage() {
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
                <img
                  src="/blog-featured.jpg"
                  alt="Featured post"
                  className="w-full h-full object-cover"
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
