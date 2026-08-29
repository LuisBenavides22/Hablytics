import type { ReactNode } from 'react'
import { Logo } from '@/components/Logo'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
  /** Wrap the heading and form in a subtle raised card. */
  card?: boolean
}

export function AuthLayout({ title, subtitle, children, footer, card = false }: AuthLayoutProps) {
  const content = (
    <>
      <h1 className="text-xl">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-fg-subtle">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </>
  )

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm animate-rise">
        <div className="mb-10 flex justify-center">
          <Logo />
        </div>

        {card ? (
          <div className="relative overflow-hidden rounded-lg border border-line bg-raised p-6 sm:p-8 lit-top">
            {content}
          </div>
        ) : (
          content
        )}

        {footer && <div className="mt-8 text-center text-sm text-fg-subtle">{footer}</div>}
      </div>
    </div>
  )
}
