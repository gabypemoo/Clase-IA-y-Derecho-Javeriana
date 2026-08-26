import type {
  ContactedStatus,
  EntityKind,
  LegalSource,
  PqrsKind,
} from './types'

export const ENTITY_KINDS: { value: EntityKind; label: string }[] = [
  { value: 'empresa-privada', label: 'Empresa privada' },
  { value: 'entidad-publica', label: 'Entidad pública' },
  { value: 'banco', label: 'Banco' },
  { value: 'servicios-publicos', label: 'Empresa de servicios públicos' },
  { value: 'telecomunicaciones', label: 'Empresa de telecomunicaciones' },
  { value: 'otra', label: 'Otra' },
]

export const PQRS_KINDS: {
  value: PqrsKind
  label: string
  description: string
}[] = [
  {
    value: 'peticion',
    label: 'Petición',
    description: 'Quieres solicitar información, documentos o una actuación.',
  },
  {
    value: 'queja',
    label: 'Queja',
    description:
      'Manifiestas inconformidad frente a la conducta de un funcionario o servicio.',
  },
  {
    value: 'reclamo',
    label: 'Reclamo',
    description:
      'Manifiestas inconformidad porque consideras que un producto o servicio no fue prestado correctamente.',
  },
  {
    value: 'solicitud-informacion',
    label: 'Solicitud de información',
    description: 'Quieres obtener información o documentos que tiene una entidad.',
  },
  {
    value: 'no-seguro',
    label: 'No estoy seguro',
    description:
      'DiloBien identifica la categoría más adecuada a partir de lo que nos contaste.',
  },
]

export const CONTACT_STATUS: { value: ContactedStatus; label: string }[] = [
  { value: 'no', label: 'Todavía no me he comunicado' },
  { value: 'si-sin-respuesta', label: 'Sí, pero no me respondieron' },
  { value: 'si-con-respuesta', label: 'Sí, y me dieron una respuesta' },
]

export const LEGAL_SOURCES: LegalSource[] = [
  {
    id: 'cp-23',
    title: 'Constitución Política de Colombia — Artículo 23',
    summary: 'Derecho fundamental de petición.',
  },
  {
    id: 'ley-1755-2015',
    title: 'Ley 1755 de 2015',
    summary:
      'Regula el derecho de petición, sus modalidades, requisitos y términos.',
  },
  {
    id: 'ley-1480-2011',
    title: 'Ley 1480 de 2011',
    summary:
      'Estatuto del Consumidor, aplicable a problemas relacionados con productos y servicios.',
  },
]

export const FILING_STEPS = [
  'Identifica el canal oficial de la entidad.',
  'Ingresa a su página web o canal de atención.',
  'Busca la opción de PQRS o derecho de petición.',
  'Adjunta la solicitud y los documentos necesarios.',
  'Guarda el número de radicado o comprobante.',
]

export const HOW_IT_WORKS = [
  {
    title: 'Cuéntanos tu problema',
    description: 'Explica lo que ocurrió con tus propias palabras.',
  },
  {
    title: 'Te hacemos preguntas',
    description:
      'DiloBien identifica la información necesaria para entender tu caso.',
  },
  {
    title: 'Redactamos tu PQRS',
    description:
      'La herramienta organiza tu información en una estructura clara y formal.',
  },
  {
    title: 'Te guiamos para radicarla',
    description: 'Recibe orientación sobre cómo y dónde presentar tu PQRS.',
  },
]

export const WHY_DILOBIEN = [
  {
    title: 'Fácil',
    description: 'No necesitas conocimientos jurídicos para utilizarla.',
  },
  {
    title: 'Claro',
    description:
      'Convierte una situación cotidiana en una solicitud organizada y comprensible.',
  },
  {
    title: 'Orientado a tus derechos',
    description:
      'Utiliza un corpus normativo colombiano para apoyar la elaboración de la PQRS.',
  },
]

export const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/#como-funciona', label: '¿Cómo funciona?' },
  { href: '/#que-es-pqrs', label: '¿Qué es una PQRS?' },
  { href: '/#sobre-dilobien', label: 'Sobre DiloBien' },
]

export const DISCLAIMER =
  'DiloBien es una herramienta de orientación y apoyo en la redacción de PQRS. No reemplaza la asesoría de un abogado y no garantiza que una entidad acepte o resuelva favorablemente una solicitud.'

export const PRIVACY_NOTE =
  'No compartas información personal o sensible que no sea necesaria para elaborar tu solicitud.'
