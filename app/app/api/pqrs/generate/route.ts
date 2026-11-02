
import { ENTITY_KINDS, LEGAL_SOURCES, PQRS_KINDS } from './content'
import type { GeneratedPqrs, PqrsDraftData, PqrsKind } from './types'

function resolveKind(data: PqrsDraftData): Exclude<PqrsKind, 'no-seguro'> {
  if (data.pqrsKind && data.pqrsKind !== 'no-seguro') {
    return data.pqrsKind
  }

  const text = `${data.story} ${data.expectedOutcome}`.toLowerCase()

  if (/(copia|certificad|document|informaci[oó]n|hist[oó]rico|extracto)/.test(text)) {
    return 'solicitud-informacion'
  }

  if (/(cobr|factur|cargo|servicio no|no funcion|da[ñn]|garant[ií]a|devoluci[oó]n|producto)/.test(text)) {
    return 'reclamo'
  }

  if (/(grosero|mal atendid|maltrat|funcionario|atenci[oó]n|demora|fila)/.test(text)) {
    return 'queja'
  }

  return 'peticion'
}

function kindLabel(kind: PqrsKind) {
  return PQRS_KINDS.find((k) => k.value === kind)?.label ?? 'Petición'
}

function sourcesFor(
  kind: Exclude<PqrsKind, 'no-seguro'>,
  data: PqrsDraftData,
) {
  const ids = new Set<string>(['cp-23', 'ley-1755-2015'])

  const consumerContext =
    kind === 'reclamo' ||
    ['banco', 'servicios-publicos', 'telecomunicaciones', 'empresa-privada'].includes(
      data.entityKind,
    )

  if (consumerContext) ids.add('ley-1480-2011')

  return LEGAL_SOURCES.filter((source) => ids.has(source.id))
}

export async function generatePqrs(
  data: PqrsDraftData,
): Promise<GeneratedPqrs> {
  const kind = resolveKind(data)
  const subject = `${kindLabel(kind)}${
    data.reference ? ` — Referencia ${data.reference}` : ''
  }`

  const response = await fetch('/api/pqrs/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const responseText = await response.text()

  let result: any

  try {
    result = JSON.parse(responseText)
  } catch {
    console.error(
      'Respuesta no válida de la API:',
      responseText.slice(0, 500),
    )

    throw new Error(
      'El servidor devolvió una respuesta inesperada. Revisa el despliegue de la API.',
    )
  }

  if (!response.ok) {
    throw new Error(
      result?.error || 'No fue posible generar la PQRS.',
    )
  }

  if (typeof result.body !== 'string' || !result.body.trim()) {
    throw new Error(
      'La respuesta de la inteligencia artificial está vacía.',
    )
  }

  return {
    resolvedKind: kind,
    subject,
    body: result.body,
    sources: sourcesFor(kind, data),
    filingChannels: [],
  }
}
