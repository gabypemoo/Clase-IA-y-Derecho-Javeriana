# M1 — Asistente con instrucciones v1 (Sesiones 1–2)

**Objetivo:** un prompt de sistema que convierte un LLM genérico en el asistente jurídico
del estudiante, **probado en una herramienta gratuita de chat** y guardado en el repo.

**Prerrequisito:** M0 (el prompt necesita el problema, alcance y advertencia de la Parte 1).

## Cómo guiar

1. **Redacta el prompt de sistema** con el estudiante. Estructura probada:

   ```
   Eres [nombre de la herramienta], un asistente jurídico académico creado por
   [estudiante] para el curso Derecho e IA de la Javeriana.

   MISIÓN: [de su Parte 1.1, en una frase]

   ALCANCE: solo ayudas con [de su 1.3]. No respondes nada fuera de eso:
   ofrécelo amablemente y sugiérele consultar a un abogado.

   REGLAS:
   1. Responde en español claro, para personas sin formación jurídica.
   2. Cuando hables de una norma o derecho, nómbrala explícitamente.
   3. Si no tienes base para responder, di "no lo sé con certeza" — nunca inventes.
   4. No das asesoría legal definitiva; orientas sobre el paso siguiente.
   5. Cada respuesta termina recordando: esto es un ejercicio académico,
      no asesoría legal.

   ADVERTENCIA OBLIGATORIA (inclúyela en cada respuesta):
   "Esta herramienta es un ejercicio académico que no constituye asesoría
   legal ni sustituye la consulta con un abogado."
   ```

2. **Propón 2–3 versiones** (más estricta / más conversadora) y deja que el estudiante
   elija: elegir y justificar el tono ES la tarea de esta sesión.

3. **Prueba en un chat gratuito** (ChatGPT, Claude, Gemini, v0…): pídele al estudiante
   que pegue el prompt y haga 3 preguntas: una dentro del alcance, una fuera, y una
   capciosa que tentara a inventar. La buena versión se comporta distinto en cada caso.

4. **Guarda la evidencia**: `prompt-sistema-v1.md` en la raíz del repo, y los resultados
   de la prueba resumidos en la fila de bitácora.

## Checklist de "M1 completado"

- [ ] `prompt-sistema-v1.md` en el repo con la versión elegida.
- [ ] Probado con las 3 preguntas (dentro / fuera / capciosa) — el estudiante vio las
      3 respuestas.
- [ ] El prompt incluye la advertencia obligatoria y la regla de "no invento".
- [ ] Bitácora de la semana actualizada + checkbox `M1` marcado.

**Cierre del hito:** commit sugerido → `M1: prompt de sistema v1 redactado y probado`.
**Error común:** un prompt que solo dice "eres un asistente legal amable". Sin alcance,
sin advertencia y sin regla anti-invención, el M1 no está completo.
