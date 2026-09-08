'use client'

import { useRef } from 'react'
import { Paperclip, ShieldAlert, X } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { StepShell } from '@/components/wizard/step-shell'
import { useWizard } from '@/components/wizard/wizard-context'
import { CONTACT_STATUS } from '@/lib/pqrs/content'
import type { ContactedStatus } from '@/lib/pqrs/types'

export function StepDetails() {
  const { data, update } = useWizard()
  const fileInput = useRef<HTMLInputElement>(null)

  const isConsumerCase = [
    'banco',
    'servicios-publicos',
    'telecomunicaciones',
    'empresa-privada',
  ].includes(data.entityKind)

  function addFiles(files: FileList | null) {
    if (!files?.length) return
    const names = Array.from(files).map((file) => file.name)
    update({ attachments: [...new Set([...data.attachments, ...names])] })
  }

  return (
    <StepShell
      title="Un par de datos más"
      description="Solo te preguntamos lo necesario para que tu PQRS quede completa."
      continueLabel="Generar mi PQRS"
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="occurredOn">
            ¿Cuándo ocurrió el problema?
          </FieldLabel>
          <Input
            id="occurredOn"
            type="date"
            value={data.occurredOn}
            onChange={(event) => update({ occurredOn: event.target.value })}
            className="sm:w-56"
          />
          <FieldDescription>
            Si no recuerdas la fecha exacta, puedes dejarlo en blanco.
          </FieldDescription>
        </Field>

        <FieldSet>
          <FieldLegend variant="label">
            ¿Ya te comunicaste con la entidad?
          </FieldLegend>
          <RadioGroup
            value={data.contacted}
            onValueChange={(value) =>
              update({ contacted: value as ContactedStatus })
            }
          >
            {CONTACT_STATUS.map((option) => (
              <FieldLabel key={option.value} htmlFor={`contact-${option.value}`}>
                <Field orientation="horizontal">
                  <RadioGroupItem
                    id={`contact-${option.value}`}
                    value={option.value}
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </FieldSet>

        {data.contacted === 'si-con-respuesta' ? (
          <Field>
            <FieldLabel htmlFor="previousAnswer">
              ¿Qué respuesta recibiste?
            </FieldLabel>
            <Textarea
              id="previousAnswer"
              value={data.previousAnswer}
              onChange={(event) =>
                update({ previousAnswer: event.target.value })
              }
              placeholder="Ejemplo: Me dijeron que el cobro era correcto, pero no me explicaron por qué."
              className="min-h-24"
            />
          </Field>
        ) : null}

        {isConsumerCase || data.contacted !== 'no' ? (
          <Field>
            <FieldLabel htmlFor="reference">
              Número de factura, contrato, radicado o referencia
            </FieldLabel>
            <Input
              id="reference"
              value={data.reference}
              onChange={(event) => update({ reference: event.target.value })}
              placeholder="Ejemplo: 4482910"
              className="sm:w-72"
            />
            <FieldDescription>Opcional, pero ayuda mucho.</FieldDescription>
          </Field>
        ) : null}

        <Field>
          <FieldLabel htmlFor="expectedOutcome">
            ¿Qué solución esperas obtener?
          </FieldLabel>
          <Textarea
            id="expectedOutcome"
            value={data.expectedOutcome}
            onChange={(event) => update({ expectedOutcome: event.target.value })}
            placeholder="Ejemplo: Que eliminen el cobro del servicio que no contraté y me devuelvan lo pagado."
            className="min-h-28"
          />
        </Field>

        <FieldSeparator />

        <Field>
          <FieldLabel htmlFor="attachments">
            Adjuntar documento (opcional)
          </FieldLabel>
          <input
            ref={fileInput}
            id="attachments"
            type="file"
            multiple
            className="sr-only"
            onChange={(event) => {
              addFiles(event.target.files)
              event.target.value = ''
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-10 w-fit px-4"
            onClick={() => fileInput.current?.click()}
          >
            <Paperclip data-icon="inline-start" />
            Seleccionar archivos
          </Button>
          <FieldDescription>
            Solo adjunta documentos relevantes para tu solicitud. No compartas
            información sensible que no sea necesaria.
          </FieldDescription>

          {data.attachments.length > 0 ? (
            <ul className="flex flex-wrap gap-2 pt-1">
              {data.attachments.map((name) => (
                <li key={name}>
                  <Badge variant="secondary" className="gap-1.5 py-1 pr-1">
                    {name}
                    <button
                      type="button"
                      onClick={() =>
                        update({
                          attachments: data.attachments.filter(
                            (a) => a !== name,
                          ),
                        })
                      }
                      className="grid size-4 place-items-center rounded-sm hover:bg-foreground/10"
                    >
                      <X className="size-3" />
                      <span className="sr-only">Quitar {name}</span>
                    </button>
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}
        </Field>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend variant="label">Tus datos de contacto</FieldLegend>
          <FieldDescription>
            Aparecerán al final de la PQRS para que la entidad pueda responderte.
          </FieldDescription>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="fullName">Nombre completo</FieldLabel>
              <Input
                id="fullName"
                value={data.fullName}
                onChange={(event) => update({ fullName: event.target.value })}
                placeholder="Ejemplo: Ana María Gómez"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="idNumber">Documento de identidad</FieldLabel>
              <Input
                id="idNumber"
                value={data.idNumber}
                onChange={(event) => update({ idNumber: event.target.value })}
                placeholder="Ejemplo: 1020304050"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(event) => update({ email: event.target.value })}
                placeholder="ejemplo@correo.com"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(event) => update({ phone: event.target.value })}
                placeholder="Ejemplo: 300 123 4567"
              />
            </Field>
          </div>
        </FieldSet>

        <Alert>
          <ShieldAlert />
          <AlertDescription>
            Tus datos se usan únicamente para armar el documento en tu navegador.
          </AlertDescription>
        </Alert>
      </FieldGroup>
    </StepShell>
  )
}
