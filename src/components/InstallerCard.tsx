import { MapPin, Phone, Mail } from 'lucide-react'
import { Button } from './ui/Button'

interface InstallerCardProps {
  id: string
  name: string
  location: string
  email: string
  phone: string
  description: string
}

export default function InstallerCard({ name, location, email, phone, description }: InstallerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <div className="flex items-center text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {description}
      </p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="h-4 w-4 mr-2" />
          <span>{email}</span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1">
          View Profile
        </Button>
        <Button variant="primary" size="sm" className="flex-1">
          Contact
        </Button>
      </div>
    </div>
  )
}
