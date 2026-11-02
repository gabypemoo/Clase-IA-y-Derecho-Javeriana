
import { NextResponse } from 'next/server'
import type { PqrsDraftData } from '@/lib/pqrs/types'

export const runtime = 'nodejs'

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

    const prompt = `
Redacta una PQRS en español, en primera persona, usando lenguaje
claro, respetuoso, formal y comprensible para cualquier ciudadano.

DATOS DEL CASO:
- Entidad: ${data.entityName || 'No especificada'}
- Tipo de entidad: ${data.entityKind || 'No especificado'}
- Ciudad: ${data.city || 'No especificada'}
- Tipo de PQRS seleccionado: ${data.pqrsKind || 'Por identificar'}
- Fecha del problema: ${data.occurredOn || 'No especificada'}
- Descripción: ${data.story}
- ¿Se contactó a la entidad?: ${data.contacted || 'No especificado'}
- Respuesta recibida: ${data.previousAnswer || 'No especificada'}
- Referencia o radicado: ${data.reference || 'No especificado'}
- Solución esperada: ${data.expectedOutcome || 'No especificada'}
- Documentos adjuntos: ${data.attachments.join(', ') || 'Ninguno'}
- Nombre: ${data.fullName || 'No especificado'}
- Documento: ${data.idNumber || 'No especificado'}
- Correo: ${data.email || 'No especificado'}
- Teléfono: ${data.phone || 'No especificado'}

INSTRUCCIONES:
1. Organiza los hechos cronológicamente y no inventes información.
2. Formula solicitudes concretas que correspondan a los hechos.
3. Incluye asunto, destinatario, hechos, solicitudes, anexos y datos
   de contacto cuando estén disponibles.
4. Si falta información, utiliza una indicación entre corchetes.
5. No inventes leyes, artículos, sentencias ni citas jurídicas.
6. No afirmes que una norma aplica si no puedes verificarlo.
7. No inventes números de radicado, fechas ni pruebas.
8. No prometas resultados ni garantices que la entidad concederá
   lo solicitado.
9. Devuelve únicamente el texto completo de la PQRS, sin comentarios
   adicionales ni explicaciones sobre tu proceso.
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
                'Eres un asistente especializado en ayudar a ciudadanos colombianos a redactar PQRS. Eres cuidadoso con los hechos y las normas jurídicas.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 1800,
        }),
      },
    )

    const result = await response.json()

    if (!response.ok) {
      console.error('Error de OpenRouter:', result)
      return NextResponse.json(
        {
          error:
            result?.error?.message ||
            'No fue posible generar la PQRS con inteligencia artificial.',
        },
        { status: response.status },
      )
    }

    const generatedText = result?.choices?.[0]?.message?.content

    if (typeof generatedText !== 'string' || !generatedText.trim()) {
      return NextResponse.json(
        { error: 'La inteligencia artificial no devolvió un texto válido.' },
        { status: 502 },
      )
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
