import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'ghost' | 'outline' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const base =
  'relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-40 whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary:
    'bg-linear-to-r from-signal-400 to-flux-400 text-void hover:brightness-115 hover:shadow-[0_0_28px_-6px_var(--color-signal-400)] active:brightness-95',
  outline:
    'border border-white/12 bg-white/3 text-white hover:border-signal-400/50 hover:bg-signal-400/8',
  ghost: 'text-ash-300 hover:bg-white/6 hover:text-white',
  danger:
    'border border-red-500/25 bg-red-500/10 text-red-300 hover:border-red-500/45 hover:bg-red-500/16',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

interface ButtonProps extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {}

export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  )
}

interface ButtonLinkProps extends CommonProps {
  to: string
}

export function ButtonLink({ to, variant = 'primary', size = 'md', className, children }: ButtonLinkProps) {
  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  )
}
