import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
}

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div className="min-w-0">
        <p className="label-mono text-signal-400">{eyebrow}</p>
        <h1 className="mt-3 text-2xl sm:text-3xl">{title}</h1>
        {description && (
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-ash-400">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
