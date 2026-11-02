
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

export interface AnalysisAnswer {
  questionId: string
  question: string
  answer: string
}

export interface PqrsDraftData {
  /** Paso 1 */
  story: string
  analysisAnswers: AnalysisAnswer[]
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

export interface AliResearchInfo {
  status: 'available' | 'unavailable'
  tool: 'buscar_normas'
  query: string
  rawResults: string
  note: string
}

export interface GeneratedPqrs {
  resolvedKind: Exclude<PqrsKind, 'no-seguro'>
  subject: string
  body: string
  sources: LegalSource[]
  filingChannels: string[]
  aliResearch: AliResearchInfo
}

export const EMPTY_DRAFT: PqrsDraftData = {
  story: '',
  analysisAnswers: [],
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
