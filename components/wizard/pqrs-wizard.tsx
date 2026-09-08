'use client'

import { cn } from '@/lib/utils'
import { WizardProvider, useWizard } from '@/components/wizard/wizard-context'
import { WizardProgress } from '@/components/wizard/wizard-progress'
import { StepStory } from '@/components/wizard/step-story'
import { StepEntity } from '@/components/wizard/step-entity'
import { StepKind } from '@/components/wizard/step-kind'
import { StepDetails } from '@/components/wizard/step-details'
import { StepResult } from '@/components/wizard/step-result'

function WizardSteps() {
  const { step } = useWizard()

  return (
    <div
      className={cn(
        'mx-auto flex w-full flex-col gap-8',
        step === 5 ? 'max-w-6xl' : 'max-w-3xl',
      )}
    >
      <WizardProgress />
      {step === 1 ? <StepStory /> : null}
      {step === 2 ? <StepEntity /> : null}
      {step === 3 ? <StepKind /> : null}
      {step === 4 ? <StepDetails /> : null}
      {step === 5 ? <StepResult /> : null}
    </div>
  )
}

export function PqrsWizard() {
  return (
    <WizardProvider>
      <WizardSteps />
    </WizardProvider>
  )
}
