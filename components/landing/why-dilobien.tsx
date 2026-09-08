import { Info, Scale, Sparkles, Wand2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { WHY_DILOBIEN } from '@/lib/pqrs/content'

const ICONS = [Sparkles, Wand2, Scale]

export function WhyDiloBien() {
  return (
    <section
      id="sobre-dilobien"
      className="scroll-mt-20 border-b border-border"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="font-display text-3xl font-extrabold text-balance sm:text-4xl">
            ¿Por qué DiloBien?
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
            Una herramienta pensada para quien nunca ha presentado una PQRS.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {WHY_DILOBIEN.map((card, index) => {
            const Icon = ICONS[index]
            return (
              <div
                key={card.title}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-lg font-bold">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <Alert>
          <Info />
          <AlertDescription>
            DiloBien brinda orientación y apoyo en la redacción. No reemplaza la
            asesoría jurídica profesional.
          </AlertDescription>
        </Alert>
      </div>
    </section>
  )
}
