import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/Button'
import { ShoppingCart, Eye } from 'lucide-react'

interface ProductCardProps {
  id: string
  name: string
  price: number
  images: string[]
  stock: number
  brand: string
}

export default function ProductCard({ id, name, price, images, stock, brand }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden group hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image
          src={images[0] || '/placeholder-product.jpg'}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm text-gray-500">{brand}</span>
          <span className="text-sm text-gray-500">{stock} in stock</span>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {name}
        </h3>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">
            £{price.toFixed(2)}
          </span>
        </div>
        
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link href={`/products/${id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full hover:bg-blue-50 hover:border-blue-300">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
          <Button 
            variant="primary" 
            size="sm" 
            disabled={stock === 0}
            className="flex-1"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
