import { PageHeader } from '@/components/PageHeader'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PlatformTile } from '@/components/PlatformLogo'
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
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Choose what we read"
        description="Every source is read only and scoped to what you approve. Disconnect any of them at any time."
      />

      <Panel className="mb-4 p-5">
        <p className="text-sm text-fg">Your data stays yours</p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-subtle">
          Hablytics reads your work to generate your report. It is never sold, never shown to
          employers, and never used to identify you to another user.
        </p>
      </Panel>

      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
        {INTEGRATIONS.map((i) => {
          const isConnected = connectedPlatforms.has(i.platform)

          return (
            <div key={i.platform} className="flex flex-col bg-surface p-5">
              <div className="flex items-start gap-4">
                <PlatformTile platform={i.platform} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[0.9375rem]">{i.name}</h3>
                    <Badge>{AUDIENCE_LABEL[i.audience]}</Badge>
                    {isConnected && <Badge tone="positive">Connected</Badge>}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-fg-subtle">{i.reads}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                <span className="label-mono">Read only</span>

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
            </div>
          )
        })}
      </div>
    </div>
  )
}
