'use client'

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { StepShell } from '@/components/wizard/step-shell'
import { useWizard } from '@/components/wizard/wizard-context'

export function StepStory() {
  const { data, update } = useWizard()

  return (
    <StepShell
      title="¿Qué problema tienes?"
      description="Cuéntanos con tus propias palabras qué ocurrió. No necesitas utilizar lenguaje jurídico."
    >
      <Field>
        <FieldLabel htmlFor="story" className="sr-only">
          Descripción del problema
        </FieldLabel>
        <Textarea
          id="story"
          value={data.story}
          onChange={(event) => update({ story: event.target.value })}
          placeholder="Ejemplo: Mi operador de celular me está cobrando un servicio que nunca contraté…"
          className="min-h-56 text-base leading-relaxed"
        />
        <FieldDescription>
          Escribe al menos unas líneas. Mientras más claro sea el relato, mejor
          quedará tu PQRS. {data.story.trim().length} caracteres.
        </FieldDescription>
      </Field>
    </StepShell>
  )
}
