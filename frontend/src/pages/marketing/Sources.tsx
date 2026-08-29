import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingCta } from '@/components/marketing/MarketingCta'
import { PlatformTile } from '@/components/PlatformLogo'
import { INTEGRATIONS, type IntegrationMeta } from '@/lib/integrations'

const GROUPS: { label: string; blurb: string; match: IntegrationMeta['audience'][] }[] = [
  {
    label: 'While you are in school',
    blurb: 'Your coursework is real output. Connect where it lives.',
    match: ['college', 'both'],
  },
  {
    label: 'Once you are working',
    blurb: 'The tools your day already runs through.',
    match: ['career', 'both'],
  },
]

function SourceCard({ integration }: { integration: IntegrationMeta }) {
  return (
    <div className="bg-surface p-5">
      <div className="flex items-center gap-3">
        <PlatformTile platform={integration.platform} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-sm text-fg">{integration.name}</p>
          <p className="label-mono mt-1">{integration.available ? 'Live' : 'Soon'}</p>
        </div>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-fg-faint">{integration.reads}</p>
    </div>
  )
}

export function Sources() {
  return (
    <>
      <MarketingHeader
        eyebrow="Sources"
        title="Wherever your work already lives"
        lead="Connect what is relevant to you and nothing else. Every source is read only and can be disconnected at any time."
      />

      {GROUPS.map((group) => {
        const items = INTEGRATIONS.filter((i) => group.match.includes(i.audience))
        return (
          <section key={group.label} className="border-t border-line px-5 py-20">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl">{group.label}</h2>
              <p className="mt-4 max-w-xl text-fg-muted">{group.blurb}</p>

              <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                {items.map((i) => (
                  <SourceCard key={i.platform} integration={i} />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <section className="border-t border-line px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="label-mono">How access works</p>
          <h2 className="mt-5 text-3xl">Read only, scoped, revocable</h2>
          <p className="mt-4 max-w-xl text-fg-muted">
            Hablytics never writes to a connected source and only reads what you approve during
            setup. Revoke any connection from settings and the data stops flowing immediately.
          </p>
        </div>
      </section>

      <MarketingCta />
    </>
  )
}
