import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
  compact?: boolean
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/2 text-center',
        compact ? 'gap-2 px-5 py-8' : 'gap-3 px-6 py-14',
        className,
      )}
    >
      {icon && (
        <div className="mb-1 grid size-11 place-items-center rounded-xl border border-white/8 bg-white/4 text-signal-400/70">
          {icon}
        </div>
      )}
      <p className="font-medium text-ash-100">{title}</p>
      {description && <p className="max-w-sm text-sm text-ash-400">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
