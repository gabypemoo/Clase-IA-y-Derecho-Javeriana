import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NAV_LINKS } from '@/lib/pqrs/content'
import { BrandMark } from '@/components/brand-mark'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <BrandMark />
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-extrabold tracking-tight">
              DiloBien
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Tú cuentas lo que pasó. Nosotros te ayudamos a decirlo bien.
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="ml-auto hidden items-center gap-1 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          size="lg"
          nativeButton={false}
          className="ml-auto lg:ml-2"
          render={<Link href="/crear">Crear mi PQRS</Link>}
        />
      </div>
    </header>
  )
}
