import type { ReactNode } from 'react'
import { Logo } from '@/components/Logo'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm animate-rise">
        <div className="mb-10 flex justify-center">
          <Logo />
        </div>

        <h1 className="text-xl">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-fg-subtle">{subtitle}</p>

        <div className="mt-8">{children}</div>

        {footer && <div className="mt-8 text-center text-sm text-fg-subtle">{footer}</div>}
      </div>
    </div>
  )
}
