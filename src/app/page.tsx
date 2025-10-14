'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Search } from 'lucide-react'
import { getProducts, getBlogPosts } from '@/lib/firestore'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Array<{
    id: string;
    name?: string;
    price?: number;
    image?: string;
    category?: string;
    brand?: string;
    rating?: number;
    reviews?: number;
  }>>([])
  const [recentBlogPosts, setRecentBlogPosts] = useState<Array<{
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const [products, blogPosts] = await Promise.all([
          getProducts(),
          getBlogPosts()
        ])
        
        // Get first 3 products as featured
        setFeaturedProducts(products.slice(0, 3))
        // Get first 2 blog posts as recent
        setRecentBlogPosts(blogPosts.slice(0, 2))
      } catch (error) {
        console.error('Error loading data:', error)
        // Use mock data if Firebase fails
        setFeaturedProducts([
          {
            id: '1',
            name: 'Premium Dashcam Pro',
            price: 299.99,
            image: '/cam1.webp',
            category: 'dashcam',
            brand: 'Premium',
            rating: 4.8,
            reviews: 124
          },
          {
            id: '2',
            name: '4K Ultra HD Camera',
            price: 399.99,
            image: '/cam2.webp',
            category: 'dashcam',
            brand: 'Ultra',
            rating: 4.9,
            reviews: 89
          },
          {
            id: '3',
            name: 'Night Vision Dashcam',
            price: 249.99,
            image: '/cam3.webp',
            category: 'dashcam',
            brand: 'NightPro',
            rating: 4.7,
            reviews: 156
          }
        ])
        setRecentBlogPosts([
          {
            id: '1',
            title: 'How to Choose the Right Dashcam',
            excerpt: 'Everything you need to know about selecting the perfect dashcam for your vehicle.',
            slug: 'how-to-choose-dashcam',
            createdAt: new Date(),
            publishedAt: new Date(),
            author: 'DashCam Expert',
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
      }
    }

    loadData()
  }, [])
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden min-h-screen flex items-center">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/cam1.webp"
      >
        <source src="/hero-new.mp4" type="video/mp4" />
        {/* Fallback for older browsers */}
      </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8">
                Premium Dashcams & Professional Installation
              </h1>
              <p className="text-2xl md:text-3xl mb-10 text-blue-100 leading-relaxed">
                Protect your vehicle with our range of high-quality dashcams and expert installation services across the UK.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/shop" prefetch={true}>
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                    Shop Dashcams
                  </Button>
                </Link>
                <Link href="/installers" prefetch={true}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
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

      {/* Shop By Vehicle Brands Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">Shop By Vehicle Brands</h2>
            <p className="text-xl text-gray-600">Find the perfect dashcam for your vehicle</p>
          </div>
          
          {/* Professional Product Showcase */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="text-center group">
                <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <Image
                        src="/cam2.webp"
                        alt="Premium Dashcam"
                        width={400}
                        height={320}
                        className="w-full h-80 object-cover"
                      />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold">4K Ultra HD</h4>
                    </div>
                    <p className="text-sm opacity-90">Premium Dashcam</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Dashcam</h3>
                <p className="text-sm text-gray-600">Professional grade 4K recording with night vision</p>
              </div>
              
              <div className="text-center group">
                <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Image
                    src="/mercedes1.webp"
                    alt="Mercedes AMG GT"
                    width={400}
                    height={320}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold">Luxury Vehicle</h4>
                    </div>
                    <p className="text-sm opacity-90">Mercedes AMG GT</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mercedes AMG GT</h3>
                <p className="text-sm text-gray-600">Perfect fit for luxury sports cars</p>
              </div>
              
              <div className="text-center group">
                <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Image
                    src="/phone1.webp"
                    alt="Mobile App Interface"
                    width={400}
                    height={320}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.666.804 4.329A1 1 0 0113 21H7a1 1 0 01-.707-1.005l.804-4.329L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold">Smart App</h4>
                    </div>
                    <p className="text-sm opacity-90">Mobile Interface</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile App Interface</h3>
                <p className="text-sm text-gray-600">Control and monitor your dashcam remotely</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/shop" prefetch={true} className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Explore All Products
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/cam1.webp" 
            alt="Featured Products Background"
            width={1200}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            {/* Centered Text Content */}
            <div className="text-white flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto px-8">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4 text-center leading-tight">
                Featured Products
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed max-w-2xl mx-auto text-center">
                Discover our most popular dashcams and accessories, carefully selected for their exceptional quality and performance
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link href="/shop" prefetch={true} className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl group">
                  View All Products
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/contact" prefetch={true} className="inline-flex items-center justify-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Get Expert Advice
                </Link>
              </div>
            </div>
            
            {/* Product Cards Below */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {featuredProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="group">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 overflow-hidden">
                    <div className="relative">
                      <Image
                        src={product.image || '/placeholder.jpg'}
                        alt={product.name || 'Product'}
                        width={300}
                        height={192}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      </div>
                      <div className="absolute top-3 left-3">
                        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                          <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {product.brand}
                        </span>
                        <span className="text-xs text-gray-500">{product.reviews} reviews</span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-gray-900">
                          £{product.price}
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Installation CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch min-h-[600px]">
            {/* Left Side - Download Image - Full Height */}
            <div className="w-full lg:w-1/2 lg:min-h-[600px]">
              <div className="relative h-96 lg:h-full w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/download.avif"
              alt="Professional Installation"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left px-8">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Need Professional Installation?
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Our certified installers provide expert dashcam setup with professional-grade installation and comprehensive warranty coverage
              </p>

              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <Link href="/installers" prefetch={true}>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Find an Installer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Blog Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-xl mb-6 p-3">
            <Image
              src="/6114045-removebg-preview.png"
              alt="Blog Icon"
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Latest from Our Blog
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Expert insights, installation guides, and industry updates to help you make informed decisions about your dashcam setup
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {recentBlogPosts.map((post) => (
              <div key={post.id} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                  <div className="relative">
                    <Image
                      src={post.image || '/blog-placeholder.jpg'}
                      alt={post.title || 'Blog Post'}
                      width={400}
                      height={256}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category || 'Article'}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{post.createdAt ? post.createdAt.toLocaleDateString() : 'Recent'}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime || '5 min read'}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {post.excerpt || post.content?.substring(0, 150) + '...'}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{post.author || 'DashCam Expert'}</p>
                          <p className="text-xs text-gray-500">Technical Writer</p>
                        </div>
                      </div>
                      
                      <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group">
                        Read More
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-6 p-3">
            <Image
              src="/oSEr6GptMtuy-removebg-preview.png"
              alt="Expert Insights Icon"
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated with Expert Insights</h3>
              <p className="text-gray-600 mb-6">
                Get the latest tips, installation guides, and industry updates delivered to your inbox
              </p>
              <Link href="/blog" prefetch={true}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  View All Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}