import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Field } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { FormAlert } from '@/components/ui/FormAlert'
import { OAuthButtons } from '@/components/OAuthButtons'
import { useAuth } from '@/lib/auth'
import { ApiError } from '@/lib/api'

interface FromState {
  from?: { pathname: string }
}

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const from = (location.state as FromState | null)?.from?.pathname ?? '/app'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(email.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      footer={
        <>
          No account yet?{' '}
          <Link to="/signup" className="link-accent">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <FormAlert>{error}</FormAlert>}

        <Field
          variant="filled"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
        <Field
          variant="filled"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitting}
        />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-fg-subtle hover:text-fg">
            Forgot password?
          </Link>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            className="!h-12 w-full !rounded-lg !text-[0.9375rem]"
            disabled={submitting}
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </Button>
        </div>
      </form>

      <div className="mt-8">
        <OAuthButtons label="Or log in with" disabled={submitting} />
      </div>
    </AuthLayout>
  )
}
