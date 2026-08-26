'use client'

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { StepShell } from '@/components/wizard/step-shell'
import { useWizard } from '@/components/wizard/wizard-context'
import { ENTITY_KINDS } from '@/lib/pqrs/content'
import type { EntityKind } from '@/lib/pqrs/types'

export function StepEntity() {
  const { data, update } = useWizard()

  return (
    <StepShell
      title="¿Con quién tienes el problema?"
      description="Necesitamos saber a quién va dirigida tu solicitud."
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">Tipo de entidad o empresa</FieldLegend>
          <RadioGroup
            value={data.entityKind}
            onValueChange={(value) =>
              update({ entityKind: value as EntityKind })
            }
            className="sm:grid-cols-2"
          >
            {ENTITY_KINDS.map((option) => (
              <FieldLabel key={option.value} htmlFor={option.value}>
                <Field orientation="horizontal">
                  <RadioGroupItem id={option.value} value={option.value} />
                  <span className="text-sm font-medium">{option.label}</span>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </FieldSet>

        <Field>
          <FieldLabel htmlFor="entityName">
            Nombre de la empresa o entidad
          </FieldLabel>
          <Input
            id="entityName"
            value={data.entityName}
            onChange={(event) => update({ entityName: event.target.value })}
            placeholder="Ejemplo: Claro Colombia S.A."
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="city">Ciudad</FieldLabel>
          <Input
            id="city"
            value={data.city}
            onChange={(event) => update({ city: event.target.value })}
            placeholder="Ejemplo: Medellín"
          />
          <FieldDescription>Opcional.</FieldDescription>
        </Field>
      </FieldGroup>
    </StepShell>
  )
}
