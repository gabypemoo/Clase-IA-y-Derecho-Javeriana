import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PqrsWizard } from '@/components/wizard/pqrs-wizard'

export const metadata: Metadata = {
  title: 'Crear mi PQRS — DiloBien',
  description:
    'Responde unas preguntas sencillas y DiloBien organiza tu información en una PQRS clara y lista para radicar.',
}

export default function CrearPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
          <PqrsWizard />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
