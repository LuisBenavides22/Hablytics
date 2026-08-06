import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { Field, SelectField } from '@/components/ui/Field'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { AuditLog, Plan } from '@/types'

const auditLogs: AuditLog[] = []
const currentPlan = 'FREE' as Plan

const PLAN_COPY: Record<Plan, { name: string; price: string }> = {
  FREE: { name: 'Snapshot', price: 'Free' },
  PRO: { name: 'Tracking', price: '$12/mo' },
  ELITE: { name: 'Benchmark', price: '$15/mo' },
}

const ROLES = ['Student', 'Software Engineer', 'Data / Analytics', 'Product', 'Design', 'Other']

export function Settings() {
  const plan = PLAN_COPY[currentPlan]

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Account"
        description="Your profile, plan, and record of everything Hablytics has done."
      />

      <div className="space-y-4">
        <Panel>
          <PanelHeader label="Profile" title="Who you are" />
          <div className="space-y-5 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="firstName" placeholder="Not set" />
              <Field label="Last name" name="lastName" placeholder="Not set" />
            </div>
            <Field label="Email" name="email" type="email" placeholder="Not set" />
            <SelectField label="Current role" name="role" defaultValue="">
              <option value="" disabled>
                Select a role
              </option>
              {ROLES.map((r) => (
                <option key={r} value={r} className="bg-surface">
                  {r}
                </option>
              ))}
            </SelectField>
            <div className="flex justify-end">
              <Button>Save changes</Button>
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHeader label="Billing" title="Your plan" />
          <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-[0.9375rem] text-fg">{plan.name}</p>
                <Badge>{plan.price}</Badge>
              </div>
              <p className="mt-2 text-sm text-fg-subtle">
                {currentPlan === 'FREE'
                  ? 'One source and a single snapshot.'
                  : 'Weekly tracking is active.'}
              </p>
            </div>
            <Button variant={currentPlan === 'FREE' ? 'primary' : 'outline'}>
              {currentPlan === 'FREE' ? 'Upgrade' : 'Manage billing'}
            </Button>
          </div>
        </Panel>

        <Panel>
          <PanelHeader label="Activity" title="What Hablytics has done" />
          <div className="p-5">
            {auditLogs.length > 0 ? (
              <ul className="divide-y divide-line">
                {auditLogs.map((log) => (
                  <li key={log.id} className="flex items-center justify-between gap-4 py-3">
                    <span className="font-mono text-xs text-fg-muted">{log.action}</span>
                    <span className="label-mono shrink-0">{log.createdAt}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                compact
                title="No activity recorded"
                description="Every scan, connection, and export gets logged here."
              />
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader label="Danger zone" title="Delete your account" />
          <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
            <p className="max-w-md text-sm leading-relaxed text-fg-subtle">
              Deletes your account, every report, and every connected source. This cannot be undone.
            </p>
            <Button variant="danger" className="shrink-0">
              Delete account
            </Button>
          </div>
        </Panel>
      </div>
    </div>
  )
}
