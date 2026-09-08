import { FileText, HelpCircle, MessageSquareText, Send } from 'lucide-react'
import { HOW_IT_WORKS } from '@/lib/pqrs/content'

const ICONS = [MessageSquareText, HelpCircle, FileText, Send]

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-20 border-b border-border bg-muted/40"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="font-display text-3xl font-extrabold text-balance sm:text-4xl">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
            Cuatro pasos guiados, en lenguaje cotidiano.
          </p>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step, index) => {
            const Icon = ICONS[index]
            return (
              <li
                key={step.title}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-lg bg-secondary text-secondary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-display text-sm font-bold text-muted-foreground">
                    {index + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-base font-bold">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
