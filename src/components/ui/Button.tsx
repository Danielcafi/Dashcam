import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    // Create deterministic class names to avoid hydration mismatches
    const getVariantClasses = (variant: string) => {
      switch (variant) {
        case 'primary':
          return 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/25'
        case 'secondary':
          return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 hover:shadow-md'
        case 'outline':
          return 'border border-gray-300 bg-transparent hover:bg-gray-50 hover:border-gray-400 hover:shadow-md'
        case 'ghost':
          return 'hover:bg-gray-100 hover:shadow-sm'
        default:
          return 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/25'
      }
    }

    const getSizeClasses = (size: string) => {
      switch (size) {
        case 'sm':
          return 'h-8 px-3 text-sm'
        case 'md':
          return 'h-10 px-4 py-2'
        case 'lg':
          return 'h-12 px-6 text-lg'
        default:
          return 'h-10 px-4 py-2'
      }
    }

    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform hover:scale-105 active:scale-95'
    
    const finalClassName = `${baseClasses} ${getVariantClasses(variant)} ${getSizeClasses(size)} ${className}`.trim()

    return (
      <button
        className={finalClassName}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
