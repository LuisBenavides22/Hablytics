import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Field } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { FormAlert } from '@/components/ui/FormAlert'
import { api, ApiError } from '@/lib/api'

export function ResetPassword() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const email = params.get('email') ?? ''
  const token = params.get('token') ?? ''

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const linkOk = Boolean(email && token)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (newPassword !== confirmPassword) {
      setError('The two passwords do not match.')
      return
    }

    setSubmitting(true)
    try {
      await api.put('/auth/resetpassword', { email, token, newPassword }, { auth: false })
      navigate('/login', { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose something you haven't used anywhere else."
      footer={
        <Link to="/login" className="link-accent">
          Back to log in
        </Link>
      }
    >
      {!linkOk ? (
        <FormAlert>
          This reset link is missing information. Request a new one from the{' '}
          <Link to="/forgot-password" className="link-accent">
            forgot password
          </Link>{' '}
          page.
        </FormAlert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <FormAlert>{error}</FormAlert>}
          <Field
            label="New password"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            placeholder=""
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={submitting}
            hint="At least 8 characters, with upper, lower, a number, and a symbol."
          />
          <Field
            label="Confirm password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder=""
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={submitting}
          />
          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? 'Resetting…' : 'Reset password'}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
