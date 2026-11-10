import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingCta } from '@/components/marketing/MarketingCta'
import { ArchetypeCard } from '@/components/marketing/ArchetypeCard'
import { ProfileSections } from '@/components/marketing/ProfileSections'
import { ButtonLink } from '@/components/ui/Button'

export function Sample() {
  return (
    <>
      <MarketingHeader
        eyebrow="Sample profile"
        title="This is what a read looks like"
        lead="An illustrative profile for a software engineer. Yours is built from your own work, so the type, the evidence, and the gaps will be different."
      />

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-14">
          <ArchetypeCard />

          <div className="lg:pt-6">
            <p className="label-mono">What is free, what is locked</p>
            <h2 className="mt-5 text-3xl">You see your type first. The rest is the reason why.</h2>
            <p className="mt-5 max-w-md text-fg-muted">
              The free read gives you your type, one strength, and one gap in full. Pro opens
              everything behind them: the blind spot, how you come across to people one level up,
              and the habit to break first.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/signup" size="lg">
                See my type
              </ButtonLink>
              <ButtonLink to="/pricing" variant="outline" size="lg">
                Compare plans
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="label-mono">Inside the report</p>
          <h2 className="mt-5 max-w-xl text-3xl">Four sections, all pointing at your own work</h2>
          <div className="mt-14">
            <ProfileSections />
          </div>
        </div>
      </section>

      <MarketingCta />
    </>
  )
}
