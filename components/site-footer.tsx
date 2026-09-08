import { Info, ShieldCheck } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { DISCLAIMER, PRIVACY_NOTE } from '@/lib/pqrs/content'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex gap-3 rounded-xl border border-border bg-card p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-primary" />
            <div className="flex flex-col gap-1.5">
              <p className="font-display text-sm font-bold">Importante</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {DISCLAIMER}
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-xl border border-border bg-card p-5">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent-foreground" />
            <div className="flex flex-col gap-1.5">
              <p className="font-display text-sm font-bold">Privacidad</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {PRIVACY_NOTE}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BrandMark className="size-8 rounded-lg text-xs" />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-sm font-bold">DiloBien</span>
              <span className="text-xs text-muted-foreground">
                Tú cuentas lo que pasó. Nosotros te ayudamos a decirlo bien.
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Herramienta de orientación · Colombia
          </p>
        </div>
      </div>
    </footer>
  )
}
