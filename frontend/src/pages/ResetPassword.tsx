import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Field } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'

export function ResetPassword() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field
          label="New password"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          placeholder=""
          hint="At least 8 characters, with upper, lower, a number, and a symbol."
        />
        <Field
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder=""
        />
        <Button type="submit" size="lg" className="w-full">
          Reset password
        </Button>
      </form>
    </AuthLayout>
  )
}
