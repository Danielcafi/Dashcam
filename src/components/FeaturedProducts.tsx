'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getProducts } from '@/lib/firestore'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Array<{
    id: string;
    name?: string;
    price?: number;
    image?: string;
    category?: string;
    brand?: string;
    rating?: number;
    reviews?: number;
  }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts()
        setProducts(productsData.slice(0, 3))
      } catch (error) {
        console.error('Error loading products:', error)
        // Use mock data if Firebase fails
        setProducts([
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
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
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
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={product.image || '/cam1.webp'}
              alt={product.name || 'Dashcam'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
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
              <Link href={`/products/${product.id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                  View
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
