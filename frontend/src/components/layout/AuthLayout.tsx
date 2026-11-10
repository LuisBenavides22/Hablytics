import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { cn } from '@/lib/cn'

const LINES = [
  ['Your resume says one thing.', 'Your work says another.'],
  ['Find out what is', 'carrying you.'],
  ['See the one habit', 'that gives you away.'],
]

const ROTATE_MS = 6000

interface AuthLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
  /** Shown directly under the heading, e.g. the link to the other auth page. */
  footer?: ReactNode
  /** No longer has a visual effect; kept so existing pages keep compiling. */
  card?: boolean
}

function BackToSite({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm text-fg transition-colors',
        className,
      )}
    >
      Back to website
      <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden />
    </Link>
  )
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  const [line, setLine] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => setLine((i) => (i + 1) % LINES.length), ROTATE_MS)
    return () => window.clearTimeout(timer)
  }, [line])

  return (
    <div className="grid min-h-screen gap-4 p-3 sm:p-4 lg:grid-cols-2">
      {/* Image panel */}
      <aside className="relative hidden overflow-hidden rounded-3xl border border-line bg-surface lg:sticky lg:top-4 lg:block lg:h-[calc(100vh-2rem)]">
        <img
          src="/auth-dune.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover"
          draggable={false}
        />
        {/* Darken the top for the logo and the bottom for the line of copy. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(9_9_11/0.55),transparent_28%,transparent_45%,rgb(9_9_11/0.88))]"
        />

        <div className="relative flex h-full flex-col justify-between p-8">
          <div className="flex items-center justify-between gap-4">
            <Logo />
            <BackToSite className="bg-void/45 backdrop-blur-md hover:bg-void/65" />
          </div>

          <div className="text-center">
            <p
              key={line}
              className="animate-rise text-[1.75rem] leading-tight font-medium tracking-tight text-fg xl:text-[2rem]"
            >
              {LINES[line][0]}
              <br />
              {LINES[line][1]}
            </p>
            <div className="mt-8 flex justify-center gap-2">
              {LINES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLine(i)}
                  aria-label={`Show message ${i + 1}`}
                  aria-current={i === line}
                  className="group py-2"
                >
                  <span
                    className={cn(
                      'block h-[3px] rounded-full transition-[width,background-color] duration-300',
                      i === line ? 'w-9 bg-accent' : 'w-6 bg-fg/35 group-hover:bg-fg/60',
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Form */}
      <main className="flex flex-col">
        <div className="flex items-center justify-between px-2 pt-2 lg:hidden">
          <Logo />
          <BackToSite className="border border-line hover:bg-raised" />
        </div>

        <div className="flex flex-1 items-center justify-center px-2 py-12 sm:px-8">
          <div className="w-full max-w-md animate-rise">
            <h1 className="text-4xl leading-[1.08] sm:text-5xl">{title}</h1>
            {subtitle && <p className="mt-4 leading-relaxed text-fg-muted">{subtitle}</p>}
            {footer && <p className="mt-4 text-fg-muted">{footer}</p>}
            <div className="mt-10">{children}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
