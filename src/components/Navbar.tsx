'use client'

import Link from 'next/link'
import { Button } from './ui/Button'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import Image from 'next/image'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

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
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition font-bold text-base" prefetch={true}>
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-blue-600 transition font-bold text-base" prefetch={true}>
              Shop
            </Link>
            <Link href="/installers" className="text-gray-700 hover:text-blue-600 transition font-bold text-base" prefetch={true}>
              Find Installer
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition font-bold text-base" prefetch={true}>
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition font-bold text-base" prefetch={true}>
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Welcome, {user.email}</span>
                <Link href="/admin">
                  <Button variant="outline" size="sm">Admin</Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/admin/login">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile actions: Login/Admin + menu button */}
          <div className="md:hidden flex items-center gap-2">
            {user ? (
              <Link href="/admin">
                <Button variant="outline" size="sm">Admin</Button>
              </Link>
            ) : (
              <Link href="/admin/login">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
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
              <Link href="/" className="block px-3 py-3 text-gray-700 hover:text-blue-600 font-bold text-base" prefetch={true}>
                Home
              </Link>
              <Link href="/shop" className="block px-3 py-3 text-gray-700 hover:text-blue-600 font-bold text-base" prefetch={true}>
                Shop
              </Link>
              <Link href="/installers" className="block px-3 py-3 text-gray-700 hover:text-blue-600 font-bold text-base" prefetch={true}>
                Find Installer
              </Link>
              <Link href="/blog" className="block px-3 py-3 text-gray-700 hover:text-blue-600 font-bold text-base" prefetch={true}>
                Blog
              </Link>
              <Link href="/contact" className="block px-3 py-3 text-gray-700 hover:text-blue-600 font-bold text-base" prefetch={true}>
                Contact
              </Link>
              {user ? (
                <div className="pt-4 border-t">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Welcome, {user.email}
                  </div>
                  <Link href="/admin" className="block px-3 py-3 text-gray-700 hover:text-blue-600 font-bold text-base">
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-3 text-gray-700 hover:text-blue-600 font-bold text-base"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link href="/admin/login" className="block px-3 py-3 text-gray-700 hover:text-blue-600 font-bold text-base">
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
