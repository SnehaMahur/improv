import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

export default function Button({ variant = 'primary', children, className = '', ...rest }: Props) {
  return (
    <button
      className={`${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
