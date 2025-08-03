import { memo } from 'react'
import type { ButtonProps } from '../types/button'
// import { ButtonProps } from './Button.types'

// import clsx from 'clsx'
/**
 * Botón estilizado y reutilizable.
 */
export const Button = memo(function Button({
  children,
  onClick,
  disabled = false,
  className = '',
  variant = 'primary',
  ...rest
}: ButtonProps) {
  const baseStyle =
    'px-3 py-1 rounded text-sm transition-colors focus:outline-none'

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${className} ${baseStyle}`}
      {...rest}
    >
      {children}
    </button>
  )
})
