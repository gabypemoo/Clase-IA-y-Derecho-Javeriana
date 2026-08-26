import Link from 'next/link'
import { ArrowRight, FileCheck2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Orientación con normativa colombiana
          </span>

          <h1 className="font-display text-4xl leading-[1.08] font-extrabold text-balance sm:text-5xl lg:text-6xl">
            Convierte tu problema en una PQRS clara y lista para presentar.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            DiloBien te guía paso a paso para identificar, redactar y radicar una
            PQRS ante la entidad correspondiente, utilizando información jurídica
            colombiana como apoyo.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              nativeButton={false}
              className="h-11 px-5 text-base"
              render={
                <Link href="/crear">
                  Empezar mi PQRS
                  <ArrowRight data-icon="inline-end" />
                </Link>
              }
            />
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="h-11 px-5 text-base"
              render={<Link href="#como-funciona">¿Cómo funciona?</Link>}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Sin lenguaje jurídico. Sin formularios interminables.
          </p>
        </div>

        <DocumentPreview />
      </div>
    </section>
  )
}

function DocumentPreview() {
  return (
    <div className="relative">
      <div className="absolute inset-x-6 -bottom-3 h-full rounded-2xl border border-border bg-muted/60" />
      <div className="relative flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2 text-xs font-medium text-accent-foreground">
          <FileCheck2 className="size-4" />
          Vista previa de tu PQRS
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            Señores
          </p>
          <p className="font-display text-sm font-bold">
            Empresa de Telecomunicaciones S.A.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            Asunto
          </p>
          <p className="text-sm">Reclamo — Referencia 4482910</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            Hechos
          </p>
          <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
            <p>
              1. El 4 de marzo se registró en mi factura el cobro de un servicio
              adicional que no contraté.
            </p>
            <p>
              2. Me comuniqué con la línea de atención y hasta la fecha no he
              recibido respuesta.
            </p>
            <div className="flex flex-col gap-1.5" aria-hidden="true">
              <span className="h-2 w-full rounded-full bg-muted" />
              <span className="h-2 w-4/5 rounded-full bg-muted" />
              <span className="h-2 w-2/3 rounded-full bg-muted" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border pt-4">
          {['Art. 23 C.P.', 'Ley 1755 de 2015', 'Ley 1480 de 2011'].map(
            (source) => (
              <span
                key={source}
                className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
              >
                {source}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
