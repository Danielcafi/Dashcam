'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/Button'
import { Filter, Grid, List } from 'lucide-react'

// Mock data - in real app, this would come from your database
const products = [
  {
    id: '1',
    name: 'Nextbase 622GW 4K Ultra HD Dash Cam',
    price: 299.99,
    images: ['/dashcam-1.jpg'],
    stock: 15,
    brand: 'Nextbase',
    category: 'DASHCAM'
  },
  {
    id: '2',
    name: 'Garmin Dash Cam 67W',
    price: 249.99,
    images: ['/dashcam-2.jpg'],
    stock: 8,
    brand: 'Garmin',
    category: 'DASHCAM'
  },
  {
    id: '3',
    name: 'Thinkware U1000 4K Dash Cam',
    price: 399.99,
    images: ['/dashcam-3.jpg'],
    stock: 12,
    brand: 'Thinkware',
    category: 'DASHCAM'
  },
  {
    id: '4',
    name: 'Nextbase Hardwiring Kit',
    price: 49.99,
    images: ['/hardwiring-1.jpg'],
    stock: 25,
    brand: 'Nextbase',
    category: 'HARDWIRING_KIT'
  },
  {
    id: '5',
    name: 'Garmin Hardwiring Kit',
    price: 39.99,
    images: ['/hardwiring-2.jpg'],
    stock: 18,
    brand: 'Garmin',
    category: 'HARDWIRING_KIT'
  },
  {
    id: '6',
    name: 'MicroSD Card 128GB',
    price: 24.99,
    images: ['/accessory-1.jpg'],
    stock: 50,
    brand: 'SanDisk',
    category: 'ACCESSORY'
  }
]

const brands = ['All', 'Nextbase', 'Garmin', 'Thinkware', 'SanDisk']
const categories = ['All', 'Dashcams', 'Hardwiring Kits', 'Accessories']

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState('name')

  const filteredProducts = products
    .filter(product => selectedBrand === 'All' || product.brand === selectedBrand)
    .filter(product => {
      if (selectedCategory === 'All') return true
      if (selectedCategory === 'Dashcams') return product.category === 'DASHCAM'
      if (selectedCategory === 'Hardwiring Kits') return product.category === 'HARDWIRING_KIT'
      if (selectedCategory === 'Accessories') return product.category === 'ACCESSORY'
      return true
    })
    .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Dashcams & Accessories</h1>
          <p className="text-gray-600">Find the perfect dashcam and accessories for your vehicle</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={selectedBrand === brand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>£{priceRange[0]}</span>
                    <span>£{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedBrand('All')
                  setSelectedCategory('All')
                  setPriceRange([0, 500])
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Sort and View Controls */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {filteredProducts.length} products found
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  
                  <div className="flex border border-gray-300 rounded-md">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedBrand('All')
                    setSelectedCategory('All')
                    setPriceRange([0, 500])
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
