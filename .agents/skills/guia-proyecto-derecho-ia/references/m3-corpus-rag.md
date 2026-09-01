# M3 — Corpus conectado / RAG con citas (Sesión 3)

**Objetivo:** el asistente responde **con las normas del estudiante** (carpeta `corpus/`),
cita la fuente que usó y admite cuando no la tiene. Es el corazón técnico del curso:
sustituir la memoria (alucinable) del LLM por fuentes verificables.

**Prerrequisito:** M1 (hay un prompt de sistema) y el corpus listado en la Parte 1.4.

## Arquitectura del curso (recuérdala en cristiano)

```
[Usuario] → [Interfaz] → [LangChain: busca en corpus → arma prompt → llama modelo]
                                  ↕
                          [corpus/ + almacén de vectores (Chroma o FAISS)]
```

El modelo llega por **OpenRouter** con una etiqueta `:free` (gratuito, sin tarjeta).
La `OPENROUTER_API_KEY` vive en una variable de entorno (`.env` en `.gitignore`), jamás
en el código ni en un commit.

## Cómo guiar

1. **Prepara el corpus con el estudiante** (él trae las fuentes oficiales):
   - Crea `corpus/` con un archivo de texto plano por norma (ej. `ley-820-2003.txt`).
   - El contenido: texto público de la norma o de su porción relevante. Nada de resúmenes
     de terceros ni PDFs con derechos de autor; nada de datos personales.
   - Que el estudiante verifique qué pedazo de la norma realmente necesita: corpus
     pequeño y bueno > corpus gigante y ruidoso.

2. **Monta el RAG.** Dos rutas según el repo:
   - **Python/Streamlit**: LangChain + `OpenAIEmbeddings` apuntando a OpenRouter o
     embeddings locales + Chroma/FAISS persistido en `db/`. Script único
     `build_corpus.py` (indexa) y la app consulta el índice.
   - **Next.js/v0**: API route que llama a LangChain.js, o un backend mínimo en Python.
     Elige la ruta con menos piezas móviles para el nivel del estudiante.
   Explica cada pieza con una analogía (el almacén de vectores es el "índice de un
   libro jurídico": encuentra las páginas relevantes antes de responder).

3. **Citas obligatorias.** La respuesta debe traer norma + artículo (o sección) y, en la
   interfaz, el fragmento de la fuente. Ajusta el prompt de sistema: "responde ÚNICAMENTE
   con base en el contexto entregado; cita norma y artículo; si el contexto no basta,
   dilo". Esa regla en el prompt + RAG es lo que convierte "suena jurídico" en "tiene fuente".

4. **Prueba la anti-alucinación:** pregunta capciosa sobre una norma que NO está en el
   corpus → debe responder que no tiene la fuente. Ese caso va a `docs/casos-de-prueba.md`.

5. **Errores comunes que vas a encontrar:** clave de API no cargada (revisar `.env` y que
   el modelo sea `:free`), corpus vacío (el .txt quedó en blanco), embeddings y buscador
   con métricas distintas. Depura con mensajes de error concretos, no a ciegas.

## Checklist de "M3 completado"

- [ ] `corpus/` con 2+ fuentes públicas en texto plano.
- [ ] El asistente responde usando el corpus (se nota: cita norma y artículo).
- [ ] Caso capcioso (norma fuera del corpus) → dice que no lo sabe. Documentado.
- [ ] No hay ninguna API key en el código ni en el historial (buscar `sk-`).
- [ ] Bitácora + checkbox `M3` marcado.

**Cierre del hito:** commit sugerido → `M3: RAG con corpus normativo y citas funcionando`.
