import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">DashCams</h3>
            <p className="text-gray-300 mb-4">
              Your trusted partner for premium dashcams and professional installation services. 
              We provide high-quality products and expert installers across the UK.
            </p>
            <div className="text-gray-300">
              <p>📧 info@dashcams.co.uk</p>
              <p>📞 0800 123 4567</p>
              <p>📍 London, UK</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-blue-400 transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/installers" className="text-gray-300 hover:text-blue-400 transition">
                  Find Installer
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-blue-400 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?category=dashcam" className="text-gray-300 hover:text-blue-400 transition">
                  Dashcams
                </Link>
              </li>
              <li>
                <Link href="/shop?category=hardwiring-kit" className="text-gray-300 hover:text-blue-400 transition">
                  Hardwiring Kits
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessory" className="text-gray-300 hover:text-blue-400 transition">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 DashCams. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-blue-400 text-sm transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-blue-400 text-sm transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
