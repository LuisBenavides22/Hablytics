import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

interface LogoProps {
  className?: string
  to?: string
  showWordmark?: boolean
}

export function Logo({ className, to = '/', showWordmark = true }: LogoProps) {
  return (
    <Link to={to} className={cn('group inline-flex items-center gap-2.5', className)}>
      <span className="relative grid size-8 place-items-center rounded-lg border border-white/10 bg-linear-to-br from-signal-400/20 to-flux-500/20">
        <svg viewBox="0 0 32 32" className="size-5" fill="none" aria-hidden>
          <path
            d="M6 21.5 L12 21.5 L15 11.5 L18.5 24.5 L21.5 17 L26 17"
            stroke="url(#logo-stroke)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="logo-stroke" x1="6" y1="24" x2="26" y2="11">
              <stop stopColor="var(--color-signal-300)" />
              <stop offset="1" stopColor="var(--color-flux-300)" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 rounded-lg opacity-0 shadow-[0_0_20px_-2px_var(--color-signal-400)] transition-opacity duration-300 group-hover:opacity-100" />
      </span>
      {showWordmark && (
        <span className="text-[1.0625rem] font-semibold tracking-tight text-white">
          Hablytics
        </span>
      )}
    </Link>
  )
}
