// Service Worker for caching
const CACHE_NAME = 'dashcams-v3'
const STATIC_CACHE = 'dashcams-static-v3'
const DYNAMIC_CACHE = 'dashcams-dynamic-v3'

// Static assets to cache
const STATIC_ASSETS = [
  '/',
  '/shop',
  '/installers',
  '/blog',
  '/contact',
  '/cam2.webp',
  '/cam3.webp',
  '/mercedes1.webp',
  '/phone1.webp'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete ALL old caches to remove Firebase
            return caches.delete(cacheName)
          })
        )
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return
  }

  // Skip Next.js chunks and static files (they have hashes and should be fresh)
  if (url.pathname.startsWith('/_next/static/')) {
    // Let Next.js handle its own chunks - fetch directly without caching
    event.respondWith(fetch(request))
    return
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }

        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Only cache static assets (images, videos), not JS/CSS chunks
            if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|mp4|avif|ico)$/i)) {
              const responseToCache = response.clone()
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache)
                })
            }

            return response
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match('/')
            }
          })
      })
  )
})

