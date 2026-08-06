import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

interface LogoProps {
  className?: string
  to?: string
  showWordmark?: boolean
}

export function Logo({ className, to = '/', showWordmark = true }: LogoProps) {
  return (
    <Link to={to} className={cn('inline-flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 24 24" className="size-5 text-fg" fill="none" aria-hidden>
        <path
          d="M2 16.5 L7 16.5 L10 7 L13.5 19 L16.5 12.5 L22 12.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showWordmark && (
        <span className="text-[0.9375rem] font-medium tracking-tight text-fg">Hablytics</span>
      )}
    </Link>
  )
}
