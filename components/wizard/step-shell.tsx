'use client'

import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useWizard } from '@/components/wizard/wizard-context'

interface StepShellProps {
  title: string
  description?: string
  children: ReactNode
  continueLabel?: string
}

export function StepShell({
  title,
  description,
  children,
  continueLabel = 'Continuar',
}: StepShellProps) {
  const { step, next, back, canContinue } = useWizard()

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (canContinue) next()
      }}
      className="flex flex-col gap-8 rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-extrabold text-balance sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
        ) : null}
      </header>

      {children}

      <footer className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 1 ? (
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="h-11 px-4"
            onClick={back}
          >
            <ArrowLeft data-icon="inline-start" />
            Atrás
          </Button>
        ) : (
          <span className="hidden sm:block" />
        )}

        <Button
          type="submit"
          size="lg"
          className="h-11 px-5 text-base"
          disabled={!canContinue}
        >
          {continueLabel}
          <ArrowRight data-icon="inline-end" />
        </Button>
      </footer>
    </form>
  )
}
