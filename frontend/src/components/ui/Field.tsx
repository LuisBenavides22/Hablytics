import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

const control =
  'w-full rounded-md border border-line bg-surface px-3 text-sm text-fg transition-colors placeholder:text-fg-faint hover:border-line-strong focus:border-fg-faint focus:outline-none'

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string
  hint?: ReactNode
  className?: string
}

export function Field({ label, hint, className, id, ...rest }: FieldProps) {
  const fieldId = id ?? `f-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={fieldId} className="label-mono block">
        {label}
      </label>
      <input id={fieldId} className={cn(control, 'h-10')} {...rest} />
      {hint && <p className="text-xs leading-relaxed text-fg-faint">{hint}</p>}
    </div>
  )
}

interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label: string
  className?: string
  children: ReactNode
}

export function SelectField({ label, className, children, id, ...rest }: SelectFieldProps) {
  const fieldId = id ?? `s-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={fieldId} className="label-mono block">
        {label}
      </label>
      <div className="relative">
        <select id={fieldId} className={cn(control, 'h-10 appearance-none pr-9')} {...rest}>
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-fg-faint"
          strokeWidth={1.5}
        />
      </div>
    </div>
  )
}
