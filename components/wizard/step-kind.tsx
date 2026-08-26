'use client'

import { Wand2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { StepShell } from '@/components/wizard/step-shell'
import { useWizard } from '@/components/wizard/wizard-context'
import { PQRS_KINDS } from '@/lib/pqrs/content'
import type { PqrsKind } from '@/lib/pqrs/types'

export function StepKind() {
  const { data, update } = useWizard()

  return (
    <StepShell
      title="¿Qué tipo de solicitud necesitas?"
      description="Elige la opción que más se parezca a tu caso. Si no lo tienes claro, lo identificamos por ti."
    >
      <RadioGroup
        value={data.pqrsKind}
        onValueChange={(value) => update({ pqrsKind: value as PqrsKind })}
        className="gap-3"
      >
        {PQRS_KINDS.map((option) => (
          <FieldLabel key={option.value} htmlFor={`kind-${option.value}`}>
            <Field orientation="horizontal">
              <RadioGroupItem
                id={`kind-${option.value}`}
                value={option.value}
              />
              <FieldContent>
                <FieldTitle>
                  {option.label}
                  {option.value === 'no-seguro' ? (
                    <Wand2 className="size-3.5 text-primary" />
                  ) : null}
                </FieldTitle>
                <FieldDescription>{option.description}</FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>

      {data.pqrsKind === 'no-seguro' ? (
        <Alert>
          <Wand2 />
          <AlertDescription>
            Analizaremos lo que nos contaste y el tipo de entidad para proponer la
            categoría más adecuada. Podrás revisarla antes de finalizar.
          </AlertDescription>
        </Alert>
      ) : null}
    </StepShell>
  )
}
