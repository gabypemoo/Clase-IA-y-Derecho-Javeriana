import { ENTITY_KINDS, LEGAL_SOURCES, PQRS_KINDS } from './content'
import type { GeneratedPqrs, PqrsDraftData, PqrsKind } from './types'

/**
 * Punto único de generación de la PQRS.
 *
 * Hoy la redacción se arma localmente con plantillas deterministas para poder
 * recorrer todo el flujo sin backend. Para conectar un modelo real basta
 * reemplazar el cuerpo de `generatePqrs` por una llamada a un route handler
 * (`/api/pqrs/generate`) que orqueste OpenRouter + LangChain/LangGraph y un
 * RAG sobre el corpus normativo, manteniendo la misma firma y el mismo tipo
 * de retorno `GeneratedPqrs`.
 */

function resolveKind(data: PqrsDraftData): Exclude<PqrsKind, 'no-seguro'> {
  if (data.pqrsKind && data.pqrsKind !== 'no-seguro') return data.pqrsKind

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

function entityKindLabel(data: PqrsDraftData) {
  return ENTITY_KINDS.find((e) => e.value === data.entityKind)?.label ?? ''
}

function splitFacts(data: PqrsDraftData): string[] {
  const facts: string[] = []

  const intro = data.occurredOn
    ? `El ${data.occurredOn} se presentó la siguiente situación con ${
        data.entityName || 'la entidad'
      }.`
    : `Se presentó la siguiente situación con ${data.entityName || 'la entidad'}.`
  facts.push(intro)

  data.story
    .split(/\n+|(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2)
    .forEach((s) => facts.push(s.endsWith('.') ? s : `${s}.`))

  if (data.reference) {
    facts.push(
      `La situación está asociada a la referencia, factura o radicado No. ${data.reference}.`,
    )
  }
  if (data.contacted === 'si-sin-respuesta') {
    facts.push(
      'Me comuniqué previamente con la entidad y hasta la fecha no he recibido una respuesta.',
    )
  }
  if (data.contacted === 'si-con-respuesta' && data.previousAnswer) {
    facts.push(
      `Me comuniqué previamente con la entidad y la respuesta recibida fue: ${data.previousAnswer}`,
    )
  }
  if (data.contacted === 'no') {
    facts.push('Esta es la primera vez que presento esta solicitud ante la entidad.')
  }

  return facts
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
  return LEGAL_SOURCES.filter((s) => ids.has(s.id))
}

export function generatePqrs(data: PqrsDraftData): GeneratedPqrs {
  const kind = resolveKind(data)
  const entity = data.entityName || '[Nombre de la entidad]'
  const name = data.fullName || '[Tu nombre]'
  const subject = `${kindLabel(kind)}${
    data.reference ? ` — Referencia ${data.reference}` : ''
  }`

  const facts = splitFacts(data)
  const request =
    data.expectedOutcome ||
    'Solicito que se revise la situación descrita y se me informe la decisión adoptada.'

  const attachments =
    data.attachments.length > 0
      ? data.attachments.map((a) => `- ${a}`).join('\n')
      : '- No se anexan documentos.'

  const contact = [
    `Nombre: ${name}`,
    data.idNumber ? `Documento de identidad: ${data.idNumber}` : null,
    data.email ? `Correo electrónico: ${data.email}` : null,
    data.phone ? `Teléfono: ${data.phone}` : null,
    data.city ? `Ciudad: ${data.city}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const body = [
    'Señores:',
    `${entity}${entityKindLabel(data) ? `\n(${entityKindLabel(data)})` : ''}`,
    '',
    `Asunto: ${subject}`,
    '',
    `Yo, ${name}, identificado(a) con documento de identidad ${
      data.idNumber || '[número de documento]'
    }, presento respetuosamente la siguiente solicitud:`,
    '',
    'HECHOS',
    facts.map((f, i) => `${i + 1}. ${f}`).join('\n'),
    '',
    'SOLICITUD',
    request.endsWith('.') ? request : `${request}.`,
    '',
    'DOCUMENTOS ANEXOS',
    attachments,
    '',
    'DATOS DE CONTACTO',
    contact,
    '',
    `Agradezco la atención prestada y quedo atento(a) a su respuesta dentro de los términos legales.`,
    '',
    'Atentamente,',
    name,
  ].join('\n')

  return {
    resolvedKind: kind,
    subject,
    body,
    sources: sourcesFor(kind, data),
    // Sin información verificada de canales: la UI muestra el aviso genérico.
    filingChannels: [],
  }
}
