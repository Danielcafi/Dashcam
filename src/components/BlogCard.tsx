import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  id: string
  title: string
  excerpt: string
  image?: string
  createdAt: Date
  slug: string
}

export default function BlogCard({ title, excerpt, image, createdAt, slug }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden group hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image
          src={image || '/placeholder-blog.jpg'}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">
          {new Date(createdAt).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <Link 
          href={`/blog/${slug}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-2 transition-transform duration-300"
        >
          Read More
          <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
