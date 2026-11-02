
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
1. Redacta el documento en primera persona, como si el ciudadano lo presentara directamente.
2. Organiza los hechos cronológicamente y conserva fielmente la información proporcionada.
3. No inventes hechos, fechas, respuestas, documentos, pruebas ni circunstancias.
4. Formula solicitudes concretas, claras y relacionadas directamente con el problema descrito.
5. Utiliza un lenguaje formal, respetuoso, sencillo y comprensible.
6. No incluyas etiquetas técnicas, códigos internos, nombres de variables ni valores del sistema.
7. Incluye únicamente los anexos que el usuario haya indicado. Si no proporcionó ninguno, escribe: "No se aportan anexos".
8. No inventes leyes, artículos, sentencias ni fundamentos jurídicos.
9. Incluye fundamentos jurídicos solamente cuando puedas identificar normas reales, vigentes y pertinentes. Si no tienes certeza, omite esta sección.
10. Diferencia los hechos relatados por el ciudadano de aquellos que estén documentalmente acreditados.
11. No agregues solicitudes que no tengan relación con el caso.
12. Si falta información indispensable, utiliza indicaciones entre corchetes, sin completar los datos por tu cuenta.
13. No prometas resultados ni afirmes que la entidad está obligada a conceder una solución específica sin fundamento.
14. No presentes referencias de prueba como si fueran radicados oficiales.
15. Incluye los datos de identificación y contacto únicamente cuando hayan sido proporcionados.
16. Utiliza esta estructura, adaptándola a la información disponible:

- Asunto
- Destinatario
- Identificación del solicitante, si está disponible
- Hechos
- Solicitudes
- Fundamentos jurídicos, únicamente si están verificados y son pertinentes
- Anexos
- Datos de contacto

17. Devuelve únicamente el texto completo de la PQRS, sin explicaciones adicionales.

IMPORTANTE:
La información proporcionada por el ciudadano es la fuente de los hechos del documento.
No debes agregar información para hacer que la solicitud parezca más completa.
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
          temperature: 0.3,
          max_tokens: 1800,
        }),
      },
    )

    const result = await response.json()

    console.log('OpenRouter status:', response.status)
    console.log(
      'OpenRouter response:',
      JSON.stringify(result).slice(0, 3000),
    )

    if (!response.ok) {
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
