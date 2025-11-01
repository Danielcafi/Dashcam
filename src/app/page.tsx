'use client'

import { Suspense, lazy } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
// import { Search } from 'lucide-react' // Removed unused import

// Lazy load heavy components
const FeaturedProducts = lazy(() => import('@/components/FeaturedProducts'))
const RecentBlogPosts = lazy(() => import('@/components/RecentBlogPosts'))

export default function Home() {
  // Cache busting update - Premium removed
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden min-h-screen flex items-center">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/f1e0e56b-9c59-46b6-ad78-fd67648017d4.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8">
                Dashcams & Professional Installation
              </h1>
              <p className="text-2xl md:text-3xl mb-10 text-blue-100 leading-relaxed">
                Protect your vehicle with our range of high-quality dashcams and expert installation services across the UK.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/shop" prefetch={true}>
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300">
                    Shop Dashcams
                  </Button>
                </Link>
                <Link href="/installers" prefetch={true}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 hover:border-blue-300 hover:shadow-2xl hover:shadow-white/20 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300">
                    Find Installers
                  </Button>
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our top-rated dashcams with cutting-edge technology and professional installation services.
            </p>
          </div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          }>
            <FeaturedProducts />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" className="text-lg px-8 py-4">
                View All Products
              </Button>
            </Link>
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
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
            
            {/* Right Side - Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12">
              <div className="max-w-lg">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Professional Installation Services
                </h2>
                <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                  Our certified technicians provide expert installation services across the UK. 
                  We ensure your dashcam is properly hardwired and configured for optimal performance.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Hardwiring & Configuration</h3>
                      <p className="text-blue-100">Professional hardwiring to your vehicle&apos;s electrical system for seamless operation.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Nationwide Coverage</h3>
                      <p className="text-blue-100">Installation services available across the UK with certified technicians.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Warranty & Support</h3>
                      <p className="text-blue-100">Full warranty on installation work with ongoing support and maintenance.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/installers">
                    <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
                      Find Installers
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
                      Get Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest dashcam technology, installation tips, and industry insights.
            </p>
          </div>
          
          <Suspense fallback={
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
          }>
            <RecentBlogPosts />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300">
                Read More Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Protect Your Vehicle?
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Get started with our premium dashcams and professional installation services today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/shop">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
                Shop Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
