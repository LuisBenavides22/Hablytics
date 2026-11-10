import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface MarqueeProps {
  children: ReactNode
  className?: string
}

/** Endless horizontal strip. The content is rendered twice so the loop has no seam. */
export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        'overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]',
        className,
      )}
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center gap-3 pr-3">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-3 pr-3">
          {children}
        </div>
      </div>
    </div>
  )
}
