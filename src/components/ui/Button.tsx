import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    // Use simple, static class names to avoid hydration issues
    let classes = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
    
    // Add variant classes
    if (variant === 'primary') {
      classes += ' bg-blue-600 text-white hover:bg-blue-700'
    } else if (variant === 'secondary') {
      classes += ' bg-gray-100 text-gray-900 hover:bg-gray-200'
    } else if (variant === 'outline') {
      classes += ' border border-gray-300 bg-transparent hover:bg-gray-50'
    } else if (variant === 'ghost') {
      classes += ' hover:bg-gray-100'
    }
    
    // Add size classes
    if (size === 'sm') {
      classes += ' h-8 px-3 text-sm'
    } else if (size === 'md') {
      classes += ' h-10 px-4 py-2'
    } else if (size === 'lg') {
      classes += ' h-12 px-6 text-lg'
    }
    
    // Add custom className if provided
    if (className) {
      classes += ' ' + className
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
