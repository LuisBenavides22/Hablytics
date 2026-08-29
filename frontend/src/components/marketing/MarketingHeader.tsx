interface MarketingHeaderProps {
  eyebrow: string
  title: string
  lead?: string
}

export function MarketingHeader({ eyebrow, title, lead }: MarketingHeaderProps) {
  return (
    <section className="px-5 pt-20 pb-4 sm:pt-24">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl animate-rise">
          <p className="label-mono">{eyebrow}</p>
          <h1 className="mt-5 text-[2rem] leading-[1.1] sm:text-[2.75rem]">{title}</h1>
          {lead && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted">{lead}</p>
          )}
        </div>
      </div>
    </section>
  )
}
