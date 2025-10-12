import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import ProductCard from '@/components/ProductCard'
import BlogCard from '@/components/BlogCard'
import { Search, Shield, Wrench, Star } from 'lucide-react'

// Mock data - in real app, this would come from your database
const featuredProducts = [
  {
    id: '1',
    name: 'Nextbase 622GW 4K Ultra HD Dash Cam',
    price: 299.99,
    images: ['/dashcam-1.jpg'],
    stock: 15,
    brand: 'Nextbase'
  },
  {
    id: '2',
    name: 'Garmin Dash Cam 67W',
    price: 249.99,
    images: ['/dashcam-2.jpg'],
    stock: 8,
    brand: 'Garmin'
  },
  {
    id: '3',
    name: 'Thinkware U1000 4K Dash Cam',
    price: 399.99,
    images: ['/dashcam-3.jpg'],
    stock: 12,
    brand: 'Thinkware'
  }
]

const recentBlogPosts = [
  {
    id: '1',
    title: 'How to Choose the Right Dashcam for Your Vehicle',
    excerpt: 'Learn about the key features to consider when selecting a dashcam that meets your needs and budget.',
    image: '/blog-1.jpg',
    createdAt: new Date('2024-01-15'),
    slug: 'how-to-choose-right-dashcam'
  },
  {
    id: '2',
    title: 'Professional Installation vs DIY: What You Need to Know',
    excerpt: 'Discover the benefits of professional dashcam installation and when DIY might be sufficient.',
    image: '/blog-2.jpg',
    createdAt: new Date('2024-01-10'),
    slug: 'professional-vs-diy-installation'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Premium Dashcams & Professional Installation
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Protect your vehicle with our range of high-quality dashcams and expert installation services across the UK.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <Button size="lg" className="w-full sm:w-auto">
                    Shop Dashcams
                  </Button>
                </Link>
                <Link href="/installers">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                    Find Installer
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <h3 className="text-2xl font-semibold mb-4">Quick Search</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search dashcams, brands, or features..."
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500">
                      <option>All Categories</option>
                      <option>Dashcams</option>
                      <option>Hardwiring Kits</option>
                      <option>Accessories</option>
                    </select>
                    <select className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500">
                      <option>All Brands</option>
                      <option>Nextbase</option>
                      <option>Garmin</option>
                      <option>Thinkware</option>
                    </select>
                  </div>
                  <Button className="w-full">Search Products</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the best dashcams from trusted brands with full warranties.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Installation</h3>
              <p className="text-gray-600">Professional installers across the UK for perfect setup every time.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">5-Star Service</h3>
              <p className="text-gray-600">Rated excellent by thousands of satisfied customers nationwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Discover our most popular dashcams and accessories</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Find Installer CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Professional Installation?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Find certified installers near you for expert dashcam setup
          </p>
          <Link href="/installers">
            <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Find an Installer
            </Button>
          </Link>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest from Our Blog</h2>
            <p className="text-xl text-gray-600">Tips, guides, and industry insights</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentBlogPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button variant="outline" size="lg">View All Posts</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}