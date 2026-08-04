import { ScrollText, Trash2 } from 'lucide-react'
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

export function Settings() {
  const plan = PLAN_COPY[currentPlan]

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader eyebrow="Settings" title="Account" description="Your profile, plan, and record of everything Hablytics has done." />

      <div className="space-y-5">
        <Panel className="hairline-top">
          <PanelHeader label="Profile" title="Who you are" />
          <div className="space-y-5 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="firstName" placeholder="—" />
              <Field label="Last name" name="lastName" placeholder="—" />
            </div>
            <Field label="Email" name="email" type="email" placeholder="—" />
            <SelectField label="Current role" name="role" defaultValue="">
              <option value="" disabled>
                Select a role
              </option>
              <option value="Student" className="bg-carbon">
                Student
              </option>
              <option value="Software Engineer" className="bg-carbon">
                Software Engineer
              </option>
              <option value="Other" className="bg-carbon">
                Other
              </option>
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
              <div className="flex items-center gap-2.5">
                <p className="text-base text-white">{plan.name}</p>
                <Badge tone={currentPlan === 'FREE' ? 'neutral' : 'signal'}>{plan.price}</Badge>
              </div>
              <p className="mt-1.5 text-sm text-ash-400">
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
          <PanelHeader
            label="Activity"
            title="What Hablytics has done"
            action={<ScrollText className="size-4 text-ash-500" strokeWidth={1.75} />}
          />
          <div className="p-5">
            {auditLogs.length > 0 ? (
              <ul className="divide-y divide-white/6">
                {auditLogs.map((log) => (
                  <li key={log.id} className="flex items-center justify-between gap-4 py-3">
                    <span className="font-mono text-xs text-ash-200">{log.action}</span>
                    <span className="label-mono shrink-0 text-ash-500">{log.createdAt}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                compact
                icon={<ScrollText className="size-5" strokeWidth={1.5} />}
                title="No activity recorded"
                description="Every scan, connection, and export gets logged here."
              />
            )}
          </div>
        </Panel>

        <Panel className="border-red-500/20">
          <PanelHeader label="Danger zone" title="Delete your account" />
          <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
            <p className="max-w-md text-sm leading-relaxed text-ash-400">
              Deletes your account, every report, and every connected source. This cannot be
              undone.
            </p>
            <Button variant="danger" className="shrink-0">
              <Trash2 className="size-4" strokeWidth={1.75} />
              Delete account
            </Button>
          </div>
        </Panel>
      </div>
    </div>
  )
}
