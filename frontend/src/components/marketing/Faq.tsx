import { Plus } from 'lucide-react'
import { FAQS } from '@/lib/marketing'

export function Faq() {
  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-line bg-surface">
      {FAQS.map(({ question, answer }) => (
        <details key={question} className="group border-b border-line last:border-b-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[0.9375rem] text-fg [&::-webkit-details-marker]:hidden">
            {question}
            <Plus
              className="size-4 shrink-0 text-fg-subtle transition-transform duration-200 group-open:rotate-45 group-open:text-accent"
              strokeWidth={2}
              aria-hidden
            />
          </summary>
          <p className="px-6 pb-6 text-sm leading-relaxed text-fg-muted">{answer}</p>
        </details>
      ))}
    </div>
  )
}
