'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STEPS, TOTAL_STEPS, useWizard } from '@/components/wizard/wizard-context'

export function WizardProgress() {
  const { step } = useWizard()
  const percent = Math.round((step / TOTAL_STEPS) * 100)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-lg font-bold">Crear mi PQRS</h2>
        <p className="text-sm font-medium text-muted-foreground tabular-nums">
          Paso {step} de {TOTAL_STEPS}
        </p>
      </div>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={`Progreso: paso ${step} de ${TOTAL_STEPS}`}
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ol className="flex flex-wrap gap-x-5 gap-y-2">
        {STEPS.map((item) => {
          const done = item.id < step
          const active = item.id === step
          return (
            <li
              key={item.id}
              className={cn(
                'flex items-center gap-2 text-xs',
                active
                  ? 'font-semibold text-foreground'
                  : 'text-muted-foreground',
              )}
            >
              <span
                className={cn(
                  'grid size-5 shrink-0 place-items-center rounded-full border text-[10px] font-semibold tabular-nums',
                  done && 'border-transparent bg-accent text-accent-foreground',
                  active && 'border-transparent bg-primary text-primary-foreground',
                  !done && !active && 'border-border',
                )}
              >
                {done ? <Check className="size-3" /> : item.id}
              </span>
              {item.short}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
