import { BookOpen } from 'lucide-react'
import { LEGAL_SOURCES } from '@/lib/pqrs/content'
import type { LegalSource } from '@/lib/pqrs/types'
import { cn } from '@/lib/utils'

interface LegalSourcesProps {
  sources?: LegalSource[]
  className?: string
  heading?: string
  compact?: boolean
}

export function LegalSources({
  sources = LEGAL_SOURCES,
  className,
  heading = '¿En qué normas se basa DiloBien?',
  compact = false,
}: LegalSourcesProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <div className="flex items-center gap-2">
        <BookOpen className="size-4 text-primary" />
        <h3
          className={cn(
            'font-display font-bold',
            compact ? 'text-sm' : 'text-2xl sm:text-3xl',
          )}
        >
          {heading}
        </h3>
      </div>

      <ul className={cn('grid gap-3', !compact && 'md:grid-cols-3')}>
        {sources.map((source) => (
          <li
            key={source.id}
            className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4"
          >
            <p className="font-display text-sm font-bold">{source.title}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {source.summary}
            </p>
          </li>
        ))}
      </ul>

      <p className="text-xs leading-relaxed text-muted-foreground">
        La herramienta utiliza estas normas como fuente de orientación y no debe
        inventar artículos, leyes o derechos.
      </p>
    </div>
  )
}
