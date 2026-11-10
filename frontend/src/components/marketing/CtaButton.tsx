import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

interface CtaButtonProps {
  to: string
  children: ReactNode
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'lg'
  className?: string
  onClick?: () => void
}

const base =
  'group inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,transform] duration-150 active:scale-[0.985]'

/** Pill call to action for the marketing site. The primary carries its arrow in a disc. */
export function CtaButton({
  to,
  children,
  variant = 'primary',
  size = 'lg',
  className,
  onClick,
}: CtaButtonProps) {
  const lg = size === 'lg'

  if (variant === 'outline') {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={cn(
          base,
          'gap-2 border border-line-strong text-fg hover:border-fg-faint hover:bg-raised',
          lg ? 'h-12 px-6 text-sm' : 'h-9 px-4 text-[0.8125rem]',
          className,
        )}
      >
        {children}
        <ArrowRight
          className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
          strokeWidth={2}
          aria-hidden
        />
      </Link>
    )
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        base,
        'bg-accent text-void hover:bg-accent-hover active:bg-accent-press',
        lg ? 'h-12 gap-4 pr-1.5 pl-6 text-sm' : 'h-9 gap-2.5 pr-1 pl-4 text-[0.8125rem]',
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          'grid place-items-center rounded-full bg-void/20 transition-transform duration-150 group-hover:translate-x-0.5',
          lg ? 'size-9' : 'size-7',
        )}
      >
        <ChevronRight className={lg ? 'size-4' : 'size-3.5'} strokeWidth={2.25} />
      </span>
    </Link>
  )
}
