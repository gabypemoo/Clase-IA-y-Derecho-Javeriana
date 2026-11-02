
import { NextResponse } from 'next/server'
import type { PqrsDraftData } from '@/lib/pqrs/types'

export const runtime = 'nodejs'

// Convierte las opciones internas del formulario en lenguaje natural.
function formatContacted(value?: string) {
  switch (value) {
    case 'si-sin-respuesta':
      return 'Sí, contacté a la entidad, pero no recibí respuesta.'
    case 'no':
      return 'No he contactado previamente a la entidad.'
    default:
      return value || 'No especificado'
  }
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY
    const model = process.env.OPENROUTER_MODEL

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Falta configurar OPENROUTER_API_KEY en el servidor.' },
        { status: 500 },
      )
    }

    if (!model) {
      return NextResponse.json(
        { error: 'Falta configurar OPENROUTER_MODEL en el servidor.' },
        { status: 500 },
      )
    }

    const data = (await request.json()) as PqrsDraftData

    if (!data.story?.trim()) {
      return NextResponse.json(
        { error: 'Debes describir el problema.' },
        { status: 400 },
      )
    }

    const attachments =
      data.attachments && data.attachments.length > 0
        ? data.attachments.join(', ')
        : 'No se aportan anexos'

    const prompt = `
Redacta una PQRS en español, en primera persona, usando lenguaje
claro, respetuoso, formal y comprensible para cualquier ciudadano.

DATOS DEL CASO:
- Entidad: ${data.entityName || 'No especificada'}
- Tipo de entidad: ${data.entityKind || 'No especificado'}
- Ciudad: ${data.city || 'No especificada'}
- Tipo de PQRS: ${data.pqrsKind || 'Por identificar'}
- Fecha del problema: ${data.occurredOn || 'No especificada'}
- Descripción: ${data.story}
- Contacto previo: ${formatContacted(data.contacted)}
- Respuesta recibida: ${data.previousAnswer || 'No especificada'}
- Referencia: ${data.reference || 'No especificada'}
- Solución esperada: ${data.expectedOutcome || 'No especificada'}
- Anexos: ${attachments}
- Nombre: ${data.fullName || 'No especificado'}
- Documento: ${data.idNumber || 'No especificado'}
- Correo: ${data.email || 'No especificado'}
- Teléfono: ${data.phone || 'No especificado'}

INSTRUCCIONES:
1. Redacta el documento en primera persona.
2. Organiza los hechos cronológicamente.
3. Conserva fielmente la información proporcionada.
4. No inventes hechos, fechas, respuestas, documentos, pruebas ni circunstancias.
5. Formula solicitudes concretas y relacionadas con el problema.
6. Utiliza lenguaje formal, respetuoso y comprensible.
7. No incluyas códigos internos ni nombres de variables.
8. Incluye únicamente los anexos indicados por el ciudadano.
9. No inventes leyes, artículos, sentencias ni fundamentos jurídicos.
10. Incluye fundamentos jurídicos solamente cuando sean reales, vigentes y pertinentes.
11. Diferencia los hechos relatados de aquellos acreditados documentalmente.
12. Si falta información indispensable, utiliza indicaciones entre corchetes.
13. No prometas resultados ni afirmes que la entidad debe conceder una solución sin fundamento.
14. No inventes números de radicado ni referencias oficiales.
15. Incluye datos personales únicamente cuando hayan sido proporcionados.

ESTRUCTURA:
- Asunto.
- Destinatario.
- Identificación del solicitante, si está disponible.
- Hechos.
- Solicitudes.
- Fundamentos jurídicos, si están verificados y son pertinentes.
- Anexos.
- Datos de contacto.

Devuelve únicamente el texto completo de la PQRS, sin explicaciones adicionales.

La información del ciudadano es la única fuente de los hechos.
No agregues información para hacer que el documento parezca más completo.
`

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://dilobien.vercel.app',
          'X-OpenRouter-Title': 'DiloBien',
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content:
                'Eres un asistente especializado en ayudar a ciudadanos colombianos a redactar PQRS. Tu prioridad es la fidelidad a los hechos, la claridad, el respeto por el ciudadano y la precisión jurídica. Nunca inventes información ni normas.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.2,
          max_tokens: 6000,
        }),
      },
    )

    const result = await response.json()

    console.log('OpenRouter status:', response.status)
    console.log('OpenRouter model:', result?.model)
    console.log(
      'OpenRouter finish reason:',
      result?.choices?.[0]?.finish_reason,
    )
    console.log('OpenRouter usage:', result?.usage)

    if (!response.ok) {
      console.error('OpenRouter error:', result?.error)

      return NextResponse.json(
        {
          error:
            result?.error?.message ||
            'No fue posible generar la PQRS con inteligencia artificial.',
        },
        { status: 502 },
      )
    }

    const content = result?.choices?.[0]?.message?.content

    // Algunos modelos devuelven el contenido como texto
    // y otros pueden devolver bloques de texto.
    const generatedText =
      typeof content === 'string'
        ? content
        : Array.isArray(content)
          ? content
              .filter(
                (item: { type?: string; text?: string }) =>
                  typeof item?.text === 'string',
              )
              .map((item: { text: string }) => item.text)
              .join('\n')
          : ''

    if (!generatedText.trim()) {
      const finishReason = result?.choices?.[0]?.finish_reason

      console.error('La IA no devolvió texto:', {
        finishReason,
        model: result?.model,
        usage: result?.usage,
      })

      return NextResponse.json(
        {
          error:
            finishReason === 'length'
              ? 'La IA agotó el límite de generación antes de terminar la PQRS. Intenta nuevamente.'
              : 'La IA no generó un documento válido. Intenta nuevamente.',
        },
        { status: 502 },
      )
    }

    if (result?.choices?.[0]?.finish_reason === 'length') {
      console.warn('La PQRS podría estar incompleta por límite de tokens.')
    }

    return NextResponse.json({ body: generatedText.trim() })
  } catch (error) {
    console.error('Error al generar PQRS:', error)

    return NextResponse.json(
      { error: 'Ocurrió un error al procesar tu solicitud.' },
      { status: 500 },
    )
  }
}

