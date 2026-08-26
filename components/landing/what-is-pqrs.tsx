import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { PQRS_KINDS } from '@/lib/pqrs/content'

export function WhatIsPqrs() {
  const kinds = PQRS_KINDS.filter((k) => k.value !== 'no-seguro')

  return (
    <section
      id="que-es-pqrs"
      className="scroll-mt-20 border-b border-border bg-muted/40"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-3xl font-extrabold text-balance sm:text-4xl">
            ¿Qué es una PQRS?
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
            Es la forma en que le pides algo formalmente a una empresa o entidad:
            una <strong className="font-semibold text-foreground">Petición</strong>
            , una <strong className="font-semibold text-foreground">Queja</strong>
            , un <strong className="font-semibold text-foreground">Reclamo</strong>{' '}
            o una{' '}
            <strong className="font-semibold text-foreground">Solicitud</strong> de
            información.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Presentarla bien importa: de la claridad de los hechos y de lo que
            pides depende que la entidad entienda tu caso y responda dentro de los
            términos legales.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card px-5 py-2">
          <Accordion>
            {kinds.map((kind) => (
              <AccordionItem key={kind.value}>
                <AccordionTrigger className="text-base">
                  {kind.label}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {kind.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
