import { Locked, ProTag } from '@/components/marketing/ArchetypeCard'
import { SAMPLE_SECTIONS } from '@/lib/marketing'

/** The four report sections, each with one finding readable and the rest locked. */
export function ProfileSections() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
      {SAMPLE_SECTIONS.map((section) => (
        <div key={section.label} className="bg-surface p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="label-mono">{section.label}</p>
            <ProTag>{`${section.locked.length} more on Pro`}</ProTag>
          </div>
          <h3 className="mt-5 text-base">{section.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-fg">{section.visible}</p>
          <ul className="mt-3 space-y-3">
            {section.locked.map((line) => (
              <li key={line} className="text-sm leading-relaxed text-fg-muted">
                <Locked>{line}</Locked>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
