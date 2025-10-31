'use client'

import { useEffect } from 'react'

export default function ServiceWorker() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Unregister all service workers first to clear old caches
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister())
      }).then(() => {
        // Register new service worker
        return navigator.serviceWorker.register('/sw.js')
      }).then((registration) => {
        console.log('SW registered: ', registration)
      }).catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
    }
  }, [])

  return null
}

