
'use client'

import { useState } from 'react'
import { Sparkles, LoaderCircle, MessageCircleQuestion } from 'lucide-react'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { StepShell } from '@/components/wizard/step-shell'
import { useWizard } from '@/components/wizard/wizard-context'

interface AnalysisQuestion {
  id: string
  question: string
  reason: string
}

interface AnalysisResult {
  summary: string
  questions: AnalysisQuestion[]
  sufficient: boolean
}

export function StepStory() {
  const { data, update, next } = useWizard()
  const [questions, setQuestions] = useState<AnalysisQuestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [analyzed, setAnalyzed] = useState(false)
  const [summary, setSummary] = useState('')

  async function analyzeStory() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/pqrs/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'No fue posible analizar tu situación.')
      }

      const analysis = result as AnalysisResult

      setSummary(analysis.summary)
      setQuestions(analysis.questions)
      setAnalyzed(true)

      if (analysis.sufficient) {
        next()
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ocurrió un error al analizar tu problema.',
      )
    } finally {
      setLoading(false)
    }
  }

  function saveAnswer(question: AnalysisQuestion, answer: string) {
    const existing = data.analysisAnswers.filter(
      (item) => item.questionId !== question.id,
    )

    update({
      analysisAnswers: [
        ...existing,
        {
          questionId: question.id,
          question: question.question,
          answer,
        },
      ],
    })
  }

  const unanswered = questions.some((question) => {
    const answer = data.analysisAnswers.find(
      (item) => item.questionId === question.id,
    )
    return !answer?.answer.trim()
  })

  return (
    <StepShell
      title="¿Qué problema tienes?"
      description="Cuéntanos con tus propias palabras qué ocurrió. No necesitas utilizar lenguaje jurídico."
      continueLabel={
        loading
          ? 'Analizando...'
          : analyzed
            ? 'Enviar respuestas'
            : 'Analizar mi problema'
      }
      continueDisabled={loading || (questions.length > 0 && unanswered)}
      onContinue={analyzeStory}
    >
      <Field>
        <FieldLabel htmlFor="story" className="sr-only">
          Descripción del problema
        </FieldLabel>

        <Textarea
          id="story"
          value={data.story}
          onChange={(event) => {
            update({
              story: event.target.value,
              analysisAnswers: [],
            })
            setQuestions([])
            setAnalyzed(false)
            setSummary('')
            setError('')
          }}
          placeholder="Ejemplo: Mi operador de celular me está cobrando un servicio que nunca contraté…"
          className="min-h-56 text-base leading-relaxed"
        />

        <FieldDescription>
          Escribe al menos unas líneas. Mientras más claro sea el relato,
          mejor quedará tu PQRS. {data.story.trim().length} caracteres.
        </FieldDescription>
      </Field>

      {loading ? (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4">
          <LoaderCircle className="size-5 animate-spin text-primary" />
          <div>
            <p className="font-medium">Analizando tu situación</p>
            <p className="text-sm text-muted-foreground">
              La inteligencia artificial está identificando qué información
              necesitamos para preparar tu PQRS.
            </p>
          </div>
        </div>
      ) : null}

      {summary ? (
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <div className="mb-2 flex items-center gap-2 font-semibold">
            <Sparkles className="size-4 text-primary" />
            Análisis de DiloBien
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {summary}
          </p>
        </div>
      ) : null}

      {questions.length > 0 ? (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <MessageCircleQuestion className="size-5 text-primary" />
            <h2 className="font-semibold">
              Necesitamos conocer algunos detalles
            </h2>
          </div>

          <p className="text-sm text-muted-foreground">
            Estas preguntas fueron seleccionadas según lo que nos contaste.
            Tus respuestas ayudarán a elaborar una PQRS más precisa.
          </p>

          {questions.map((question, index) => {
            const savedAnswer = data.analysisAnswers.find(
              (item) => item.questionId === question.id,
            )

            return (
              <Field key={question.id}>
                <FieldLabel htmlFor={`analysis-${question.id}`}>
                  {index + 1}. {question.question}
                </FieldLabel>

                <p className="text-xs text-muted-foreground">
                  {question.reason}
                </p>

                <Textarea
                  id={`analysis-${question.id}`}
                  value={savedAnswer?.answer ?? ''}
                  onChange={(event) =>
                    saveAnswer(question, event.target.value)
                  }
                  placeholder="Escribe tu respuesta. Si no conoces el dato, puedes indicarlo."
                  className="min-h-24"
                />
              </Field>
            )
          })}
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {error}
        </div>
      ) : null}
    </StepShell>
  )
}
