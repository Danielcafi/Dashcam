'use client'

import Link from 'next/link'
import { Button } from './ui/Button'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getCurrentUser, logout as logoutUser, type User } from '@/lib/auth-client'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [adminEmail, setAdminEmail] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    loadAuth()
  }, [])

  const loadAuth = async () => {
    try {
      // Check admin login (localStorage)
      const adminLoggedIn = typeof window !== 'undefined' && localStorage.getItem('adminLoggedIn') === 'true'
      const email = typeof window !== 'undefined' ? localStorage.getItem('adminEmail') : null
      setAdminEmail(adminLoggedIn ? email : null)

      // Check customer login (API)
      const customer = await getCurrentUser()
      setUser(customer)
    } catch {
      setUser(null)
      setAdminEmail(null)
    }
  }

  const handleSignOut = async () => {
    try {
      // Sign out customer if logged in
      if (user) {
        await logoutUser()
        setUser(null)
      }
      
      // Sign out admin if logged in
      if (adminEmail) {
        localStorage.removeItem('adminLoggedIn')
        localStorage.removeItem('adminEmail')
        setAdminEmail(null)
      }
      
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const isAuthenticated = user || adminEmail
  const displayName = user?.name || user?.email || adminEmail

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/4e83712b-76bc-429d-979d-a056cdcf4c7f-removebg-preview.png"
              alt="DashCams Logo"
              width={200}
              height={200}
              className="h-50 w-50"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link 
              href="/" 
              className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 font-bold text-base pb-1 group" 
              prefetch={true}
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/shop" 
              className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 font-bold text-base pb-1 group" 
              prefetch={true}
            >
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/installers" 
              className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 font-bold text-base pb-1 group" 
              prefetch={true}
            >
              Find Installer
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/blog" 
              className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 font-bold text-base pb-1 group" 
              prefetch={true}
            >
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/contact" 
              className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 font-bold text-base pb-1 group" 
              prefetch={true}
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/shop">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            {!isHydrated ? (
              // Show loading state during hydration to prevent mismatch
              <div className="flex items-center space-x-2">
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Welcome, {displayName}</span>
                <Link href="/account">
                  <Button variant="outline" size="sm">Account</Button>
                </Link>
                {adminEmail && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">Admin</Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="primary" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile actions: Login/Admin + menu button */}
          <div className="md:hidden flex items-center gap-2">
            {!isHydrated ? (
              // Show loading state during hydration to prevent mismatch
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
            ) : isAuthenticated ? (
              adminEmail && (
                <Link href="/admin">
                  <Button variant="outline" size="sm">Admin</Button>
                </Link>
              )
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
              <Link 
                href="/" 
                className="relative block px-3 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-bold text-base group" 
                prefetch={true}
              >
                Home
                <span className="absolute bottom-2 left-3 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]"></span>
              </Link>
              <Link 
                href="/shop" 
                className="relative block px-3 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-bold text-base group" 
                prefetch={true}
              >
                Shop
                <span className="absolute bottom-2 left-3 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]"></span>
              </Link>
              <Link 
                href="/installers" 
                className="relative block px-3 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-bold text-base group" 
                prefetch={true}
              >
                Find Installer
                <span className="absolute bottom-2 left-3 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]"></span>
              </Link>
              <Link 
                href="/blog" 
                className="relative block px-3 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-bold text-base group" 
                prefetch={true}
              >
                Blog
                <span className="absolute bottom-2 left-3 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]"></span>
              </Link>
              <Link 
                href="/contact" 
                className="relative block px-3 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-bold text-base group" 
                prefetch={true}
              >
                Contact
                <span className="absolute bottom-2 left-3 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]"></span>
              </Link>
              {!isHydrated ? (
                // Show loading state during hydration to prevent mismatch
                <div className="pt-4 border-t">
                  <div className="px-3 py-2">
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ) : isAuthenticated ? (
                <div className="pt-4 border-t">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Welcome, {displayName}
                  </div>
                  {adminEmail && (
                    <Link href="/admin" className="block px-3 py-3 text-gray-700 hover:text-blue-600 font-bold text-base">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-3 text-gray-700 hover:text-blue-600 font-bold text-base"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login" className="block px-3 py-3 text-gray-700 hover:text-blue-600 font-bold text-base">
                    Login
                  </Link>
                  <Link href="/register" className="block px-3 py-3 text-gray-700 hover:text-blue-600 font-bold text-base">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
