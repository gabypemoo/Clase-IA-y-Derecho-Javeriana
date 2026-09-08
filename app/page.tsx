import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/landing/hero'
import { HowItWorks } from '@/components/landing/how-it-works'
import { WhyDiloBien } from '@/components/landing/why-dilobien'
import { WhatIsPqrs } from '@/components/landing/what-is-pqrs'
import { LegalSources } from '@/components/legal-sources'

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <WhyDiloBien />
        <WhatIsPqrs />

        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <LegalSources />
          </div>
        </section>

        <section>
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-20">
            <div className="flex max-w-xl flex-col gap-2">
              <h2 className="font-display text-3xl font-extrabold text-balance sm:text-4xl">
                Cuéntanos qué ocurrió y qué solución estás buscando.
              </h2>
              <p className="leading-relaxed text-muted-foreground text-pretty">
                Te acompañamos en cinco pasos hasta tener tu PQRS lista para
                radicar.
              </p>
            </div>
            <Button
              size="lg"
              nativeButton={false}
              className="h-11 shrink-0 px-5 text-base"
              render={
                <Link href="/crear">
                  Crear mi PQRS
                  <ArrowRight data-icon="inline-end" />
                </Link>
              }
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
