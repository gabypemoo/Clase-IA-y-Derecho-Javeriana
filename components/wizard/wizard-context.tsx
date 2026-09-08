'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { EMPTY_DRAFT, type PqrsDraftData } from '@/lib/pqrs/types'

export const STEPS = [
  { id: 1, title: 'Cuéntanos qué ocurrió', short: 'Tu problema' },
  { id: 2, title: 'Información sobre la entidad', short: 'Entidad' },
  { id: 3, title: 'Tipo de solicitud', short: 'Tipo' },
  { id: 4, title: 'Información adicional', short: 'Detalles' },
  { id: 5, title: 'Tu PQRS', short: 'Resultado' },
] as const

export const TOTAL_STEPS = STEPS.length

interface WizardContextValue {
  step: number
  data: PqrsDraftData
  update: (patch: Partial<PqrsDraftData>) => void
  next: () => void
  back: () => void
  goTo: (step: number) => void
  reset: () => void
  canContinue: boolean
}

const WizardContext = createContext<WizardContextValue | null>(null)

function validate(step: number, data: PqrsDraftData) {
  switch (step) {
    case 1:
      return data.story.trim().length >= 20
    case 2:
      return data.entityKind !== '' && data.entityName.trim().length > 1
    case 3:
      return data.pqrsKind !== ''
    case 4:
      return data.expectedOutcome.trim().length >= 10
    default:
      return true
  }
}

export function WizardProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<PqrsDraftData>(EMPTY_DRAFT)

  const update = useCallback((patch: Partial<PqrsDraftData>) => {
    setData((prev) => ({ ...prev, ...patch }))
  }, [])

  const goTo = useCallback((target: number) => {
    setStep(Math.min(Math.max(target, 1), TOTAL_STEPS))
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const next = useCallback(() => goTo(step + 1), [goTo, step])
  const back = useCallback(() => goTo(step - 1), [goTo, step])

  const reset = useCallback(() => {
    setData(EMPTY_DRAFT)
    setStep(1)
  }, [])

  const value = useMemo(
    () => ({
      step,
      data,
      update,
      next,
      back,
      goTo,
      reset,
      canContinue: validate(step, data),
    }),
    [step, data, update, next, back, goTo, reset],
  )

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
}

export function useWizard() {
  const ctx = useContext(WizardContext)
  if (!ctx) throw new Error('useWizard debe usarse dentro de WizardProvider')
  return ctx
}
