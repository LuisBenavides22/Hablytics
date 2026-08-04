import { Lock, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PlatformMark } from '@/components/PlatformMark'
import { INTEGRATIONS } from '@/lib/integrations'
import type { WorkspaceConnection } from '@/types'

const connections: WorkspaceConnection[] = []

const AUDIENCE_LABEL: Record<string, string> = {
  college: 'Coursework',
  career: 'Workplace',
  both: 'Either',
}

export function Connections() {
  const connectedPlatforms = new Set(connections.map((c) => c.platform))

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Connections"
        title="Choose what we read"
        description="Every source is read-only and scoped to what you approve. Disconnect any of them at any time."
      />

      <Panel className="mb-6 flex items-start gap-4 p-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/8 bg-strong-400/10">
          <ShieldCheck className="size-4.5 text-strong-400" strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-sm font-medium text-ash-100">Your data stays yours</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ash-400">
            Hablytics reads your work to generate your report. It is never sold, never shown to
            employers, and never used to identify you to another user.
          </p>
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2">
        {INTEGRATIONS.map((i) => {
          const isConnected = connectedPlatforms.has(i.platform)

          return (
            <Panel key={i.platform} className="flex flex-col p-5">
              <div className="flex items-start gap-4">
                <PlatformMark platform={i.platform} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base">{i.name}</h3>
                    <Badge tone="neutral">{AUDIENCE_LABEL[i.audience]}</Badge>
                    {isConnected && (
                      <Badge tone="strong" dot>
                        Connected
                      </Badge>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ash-400">{i.reads}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/6 pt-4">
                <span className="label-mono flex items-center gap-1.5 text-ash-500">
                  <Lock className="size-3" strokeWidth={2} />
                  Read-only
                </span>

                {!i.available ? (
                  <Button size="sm" variant="ghost" disabled>
                    Coming soon
                  </Button>
                ) : isConnected ? (
                  <Button size="sm" variant="danger">
                    Disconnect
                  </Button>
                ) : (
                  <Button size="sm" variant="outline">
                    Connect
                  </Button>
                )}
              </div>
            </Panel>
          )
        })}
      </div>
    </div>
  )
}
