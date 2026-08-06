import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
  compact?: boolean
}

export function EmptyState({ title, description, action, className, compact = false }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-2 rounded-md border border-dashed border-line px-5',
        compact ? 'py-6' : 'py-10',
        className,
      )}
    >
      <p className="text-sm text-fg-muted">{title}</p>
      {description && <p className="max-w-md text-sm leading-relaxed text-fg-faint">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}
