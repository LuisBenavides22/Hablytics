import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
      <div className="min-w-0">
        <h1 className="text-2xl">{title}</h1>
        {description && (
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-fg-subtle">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
