export type EntityKind =
  | 'empresa-privada'
  | 'entidad-publica'
  | 'banco'
  | 'servicios-publicos'
  | 'telecomunicaciones'
  | 'otra'

export type PqrsKind =
  | 'peticion'
  | 'queja'
  | 'reclamo'
  | 'solicitud-informacion'
  | 'no-seguro'

export type ContactedStatus = 'no' | 'si-sin-respuesta' | 'si-con-respuesta'

export interface PqrsDraftData {
  /** Paso 1 */
  story: string
  /** Paso 2 */
  entityKind: EntityKind | ''
  entityName: string
  city: string
  /** Paso 3 */
  pqrsKind: PqrsKind | ''
  /** Paso 4 */
  occurredOn: string
  contacted: ContactedStatus | ''
  reference: string
  previousAnswer: string
  expectedOutcome: string
  attachments: string[]
  /** Datos de contacto */
  fullName: string
  idNumber: string
  email: string
  phone: string
}

export interface LegalSource {
  id: string
  title: string
  summary: string
}

/**
 * Resultado de la generación. Hoy se construye localmente en
 * `lib/pqrs/generate.ts`; más adelante puede provenir de un LLM
 * (OpenRouter) orquestado con LangChain/LangGraph + RAG.
 */
export interface GeneratedPqrs {
  /** Tipo finalmente identificado (nunca 'no-seguro'). */
  resolvedKind: Exclude<PqrsKind, 'no-seguro'>
  subject: string
  body: string
  /** Normas citadas como apoyo, siempre desde el corpus verificado. */
  sources: LegalSource[]
  /** Canales de radicación verificados. Vacío = mostrar aviso genérico. */
  filingChannels: string[]
}

export const EMPTY_DRAFT: PqrsDraftData = {
  story: '',
  entityKind: '',
  entityName: '',
  city: '',
  pqrsKind: '',
  occurredOn: '',
  contacted: '',
  reference: '',
  previousAnswer: '',
  expectedOutcome: '',
  attachments: [],
  fullName: '',
  idNumber: '',
  email: '',
  phone: '',
}
