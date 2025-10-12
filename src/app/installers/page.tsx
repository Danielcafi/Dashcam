'use client'

import { useState } from 'react'
import InstallerCard from '@/components/InstallerCard'
import { Button } from '@/components/ui/Button'
import { Search, MapPin, Filter } from 'lucide-react'

// Mock data - in real app, this would come from your database
const installers = [
  {
    id: '1',
    name: 'AutoTech Solutions',
    location: 'London, UK',
    email: 'contact@autotechsolutions.co.uk',
    phone: '020 7123 4567',
    description: 'Professional dashcam installation specialists with over 10 years experience. We specialize in Nextbase, Garmin, and Thinkware dashcams with hardwiring services.',
    latitude: 51.5074,
    longitude: -0.1278
  },
  {
    id: '2',
    name: 'Car Security Pro',
    location: 'Manchester, UK',
    email: 'info@carsecuritypro.co.uk',
    phone: '0161 234 5678',
    description: 'Expert installation of premium dashcams and security systems. Certified installers for all major brands with same-day service available.',
    latitude: 53.4808,
    longitude: -2.2426
  },
  {
    id: '3',
    name: 'DashCam Installers UK',
    location: 'Birmingham, UK',
    email: 'hello@dashcaminstallers.co.uk',
    phone: '0121 345 6789',
    description: 'Professional dashcam installation across the Midlands. We offer mobile installation services and specialize in hardwiring kits.',
    latitude: 52.4862,
    longitude: -1.8904
  },
  {
    id: '4',
    name: 'Vehicle Security Solutions',
    location: 'Leeds, UK',
    email: 'contact@vehiclesecurity.co.uk',
    phone: '0113 456 7890',
    description: 'Complete vehicle security solutions including dashcam installation, hardwiring, and maintenance. Serving Yorkshire and surrounding areas.',
    latitude: 53.8008,
    longitude: -1.5491
  },
  {
    id: '5',
    name: 'Pro Install Services',
    location: 'Glasgow, UK',
    email: 'info@proinstallservices.co.uk',
    phone: '0141 567 8901',
    description: 'Professional installation services for all types of vehicle electronics. Specializing in dashcams, parking sensors, and security systems.',
    latitude: 55.8642,
    longitude: -4.2518
  },
  {
    id: '6',
    name: 'Auto Electronics Centre',
    location: 'Bristol, UK',
    email: 'sales@autoelectronicscentre.co.uk',
    phone: '0117 678 9012',
    description: 'Family-run business with 15+ years experience in vehicle electronics installation. We provide comprehensive dashcam installation and support.',
    latitude: 51.4545,
    longitude: -2.5879
  }
]

export default function InstallersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [showMap, setShowMap] = useState(false)

  const filteredInstallers = installers.filter(installer => {
    const matchesSearch = installer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         installer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         installer.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesLocation = selectedLocation === '' || installer.location.includes(selectedLocation)
    
    return matchesSearch && matchesLocation
  })

  const locations = ['All', 'London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Bristol']

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find a Professional Installer</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with certified dashcam installers across the UK for professional installation services
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, location, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location} value={location === 'All' ? '' : location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setShowMap(!showMap)}
              className="flex items-center justify-center"
            >
              <Filter className="h-5 w-5 mr-2" />
              {showMap ? 'Hide Map' : 'Show Map'}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Popular searches:</span>
            {['Nextbase Installation', 'Hardwiring Service', 'Same Day Install', 'Mobile Service'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {filteredInstallers.length} Installers Found
            </h2>
            <p className="text-gray-600">
              {selectedLocation ? `in ${selectedLocation}` : 'across the UK'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>Distance</option>
              <option>Rating</option>
              <option>Name</option>
            </select>
          </div>
        </div>

        {/* Map and Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Installers List */}
          <div className="lg:col-span-2">
            {filteredInstallers.length > 0 ? (
              <div className="space-y-6">
                {filteredInstallers.map((installer) => (
                  <InstallerCard key={installer.id} {...installer} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <MapPin className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No installers found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or location
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedLocation('')
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Map or Additional Info */}
          <div className="lg:col-span-1">
            {showMap ? (
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h3 className="text-lg font-semibold mb-4">Map View</h3>
                <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive map would be displayed here</p>
                    <p className="text-sm">Google Maps integration</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Map shows installer locations and allows you to see distances from your location.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h3 className="text-lg font-semibold mb-4">Why Choose Professional Installation?</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Expert knowledge of vehicle electrical systems</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Proper hardwiring for parking mode functionality</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Clean, professional installation with no visible wires</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Warranty protection for installation work</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Testing and configuration of all features</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Need Help Choosing?</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Our installers can help you choose the right dashcam for your vehicle and needs.
                  </p>
                  <Button size="sm" className="w-full">
                    Get Expert Advice
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
