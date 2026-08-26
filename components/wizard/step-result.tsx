'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  ExternalLink,
  Eye,
  Info,
  Pencil,
  RefreshCw,
} from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { LegalSources } from '@/components/legal-sources'
import { useWizard } from '@/components/wizard/wizard-context'
import { FILING_STEPS, PQRS_KINDS } from '@/lib/pqrs/content'
import { generatePqrs } from '@/lib/pqrs/generate'

export function StepResult() {
  const { data, back } = useWizard()
  const generated = useMemo(() => generatePqrs(data), [data])

  const [draft, setDraft] = useState(generated.body)
  const [editing, setEditing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showChannels, setShowChannels] = useState(false)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setDraft(generated.body)
  }, [generated.body])

  useEffect(() => {
    if (editing) editorRef.current?.focus()
  }, [editing])

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const kindLabel =
    PQRS_KINDS.find((k) => k.value === generated.resolvedKind)?.label ?? 'Petición'

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(draft)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  function downloadPdf() {
    const win = window.open('', '_blank')
    if (!win) return
    win.document.write(
      `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${generated.subject}</title>` +
        `<style>body{font-family:Georgia,'Times New Roman',serif;line-height:1.7;padding:3rem;max-width:44rem;margin:0 auto;white-space:pre-wrap;font-size:12pt}</style>` +
        `</head><body>${draft.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] as string)}</body></html>`,
    )
    win.document.close()
    win.focus()
    win.print()
  }

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-start">
      <section className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <header className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
              Tu PQRS
            </h1>
            <Badge variant="secondary">{kindLabel}</Badge>
            {data.pqrsKind === 'no-seguro' ? (
              <Badge variant="outline">Tipo identificado por DiloBien</Badge>
            ) : null}
          </div>
          <p className="leading-relaxed text-muted-foreground">
            Revisa el texto y ajústalo si algo no coincide con tu caso antes de
            radicarlo.
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant={editing ? 'default' : 'outline'}
            size="lg"
            className="h-10 px-4"
            onClick={() => setEditing((prev) => !prev)}
          >
            {editing ? (
              <Eye data-icon="inline-start" />
            ) : (
              <Pencil data-icon="inline-start" />
            )}
            {editing ? 'Ver documento' : 'Editar'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-10 px-4"
            onClick={() => setDraft(generated.body)}
          >
            <RefreshCw data-icon="inline-start" />
            Regenerar
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-10 px-4"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check data-icon="inline-start" />
            ) : (
              <Copy data-icon="inline-start" />
            )}
            {copied ? 'Copiado' : 'Copiar PQRS'}
          </Button>
          <Button
            type="button"
            size="lg"
            className="h-10 px-4"
            onClick={downloadPdf}
          >
            <Download data-icon="inline-start" />
            Descargar PDF
          </Button>
        </div>

        {editing ? (
          <Textarea
            ref={editorRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="Editar el texto de la PQRS"
            className="min-h-[32rem] font-mono text-sm leading-relaxed"
          />
        ) : (
          <article className="rounded-xl border border-border bg-background p-6 sm:p-8">
            <pre className="font-serif text-[0.95rem] leading-7 whitespace-pre-wrap text-foreground">
              {draft}
            </pre>
          </article>
        )}

        <Button
          type="button"
          variant="ghost"
          size="lg"
          className="h-10 w-fit px-3"
          onClick={back}
        >
          <ArrowLeft data-icon="inline-start" />
          Volver a los datos
        </Button>
      </section>

      <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold tracking-wide text-accent-foreground uppercase">
              ¿Qué sigue?
            </p>
            <h2 className="font-display text-xl font-bold">
              Ahora, ¿cómo la radico?
            </h2>
          </div>

          <ol className="flex flex-col gap-3">
            {FILING_STEPS.map((stepText, index) => (
              <li key={stepText} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground tabular-nums">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {stepText}
                </span>
              </li>
            ))}
          </ol>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-10"
            onClick={() => setShowChannels(true)}
          >
            <ExternalLink data-icon="inline-start" />
            Ver canales de radicación
          </Button>

          {showChannels ? (
            <Alert>
              <Info />
              <AlertDescription>
                {generated.filingChannels.length > 0
                  ? generated.filingChannels.join(' · ')
                  : 'Consulta el canal oficial de atención de la entidad para realizar la radicación.'}
              </AlertDescription>
            </Alert>
          ) : null}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <LegalSources
            sources={generated.sources}
            heading="Normas de apoyo"
            compact
          />
        </div>
      </aside>
    </div>
  )
}
