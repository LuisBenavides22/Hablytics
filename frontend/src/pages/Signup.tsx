import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Field, SelectField } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { FormAlert } from '@/components/ui/FormAlert'
import { useAuth } from '@/lib/auth'
import { ApiError } from '@/lib/api'

const ROLES = [
  'Student',
  'Software Engineer',
  'Data / Analytics',
  'Product',
  'Design',
  'Finance',
  'Marketing',
  'Operations',
  'Other',
]

const EMPTY = { firstName: '', lastName: '', email: '', role: '', password: '', confirmPassword: '' }

export function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState<string | null>(null)
  const [mismatch, setMismatch] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function update(key: keyof typeof EMPTY) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (key === 'password' || key === 'confirmPassword') setMismatch(false)
      setForm((prev) => ({ ...prev, [key]: e.target.value }))
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (form.password !== form.confirmPassword) {
      setMismatch(true)
      return
    }

    setSubmitting(true)
    try {
      await signup({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        role: form.role,
        password: form.password,
        confirmPassword: form.confirmPassword,
      })
      navigate('/app', { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Connect one source and get your first honest read."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="link-accent">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <FormAlert>{error}</FormAlert>}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="First name"
            name="firstName"
            autoComplete="given-name"
            placeholder="Alex"
            required
            value={form.firstName}
            onChange={update('firstName')}
            disabled={submitting}
          />
          <Field
            label="Last name"
            name="lastName"
            autoComplete="family-name"
            placeholder="Rivera"
            required
            value={form.lastName}
            onChange={update('lastName')}
            disabled={submitting}
          />
        </div>

        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@school.edu"
          required
          value={form.email}
          onChange={update('email')}
          disabled={submitting}
        />

        <SelectField
          label="Where you are now"
          name="role"
          required
          value={form.role}
          onChange={update('role')}
          disabled={submitting}
        >
          <option value="" disabled>
            Select a role
          </option>
          {ROLES.map((r) => (
            <option key={r} value={r} className="bg-surface">
              {r}
            </option>
          ))}
        </SelectField>

        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder=""
          required
          minLength={8}
          value={form.password}
          onChange={update('password')}
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
          value={form.confirmPassword}
          onChange={update('confirmPassword')}
          disabled={submitting}
          error={mismatch ? 'The two passwords do not match.' : undefined}
        />

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>

        <p className="text-center text-xs leading-relaxed text-fg-faint">
          Read-only access to whatever you connect. Disconnect any source at any time.
        </p>
      </form>
    </AuthLayout>
  )
}
