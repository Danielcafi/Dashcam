'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from './ui/Button'
import { Menu, X, ShoppingCart, User } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">DashCams</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-blue-600 transition">
              Shop
            </Link>
            <Link href="/installers" className="text-gray-700 hover:text-blue-600 transition">
              Find Installer
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {session ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Welcome, {session.user?.name}</span>
                {session.user?.role === 'ADMIN' && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">Admin</Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/admin/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/shop" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Shop
              </Link>
              <Link href="/installers" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Find Installer
              </Link>
              <Link href="/blog" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Blog
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Contact
              </Link>
              {session ? (
                <div className="pt-4 border-t">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Welcome, {session.user?.name}
                  </div>
                  {session.user?.role === 'ADMIN' && (
                    <Link href="/admin" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link href="/admin/login" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
