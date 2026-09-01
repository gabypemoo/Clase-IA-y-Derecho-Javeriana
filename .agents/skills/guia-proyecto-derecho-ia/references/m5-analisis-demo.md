# M5 — Análisis crítico y demo (Sesión 5)

**Objetivo:** cerrar el ciclo con criterio jurídico: la Parte 7 del README (análisis
crítico), la revisión de entregables (Parte 8) y la presentación de 5 minutos del demo day.

**Prerrequisito:** M4. Aunque la demo se puede ensayar con cualquier versión, el análisis
crítico se escribe sobre la herramienta desplegada y usada.

## Cómo guiar

1. **Parte 7 — el estudiante la escribe, tú la interrogas.** Las tres preguntas:
   - *¿Dónde falla tu herramienta?* → 2 situaciones concretas (¡que haya probado!).
     Los casos ❌ de `docs/casos-de-prueba.md` son oro para esta respuesta.
   - *¿Qué datos procesa?* → qué entra (la consulta del usuario), qué se guarda (¿algo?
     ¿nada?), qué sale (respuesta con citas).
   - *¿Por qué no reemplaza al abogado?* → 5–8 frases. Aquí no le des la respuesta:
   hazle una contra-pregunta por cada frase que suene a eslogan ("¿y eso por qué es
   distinto a lo que hace un abogado?").
   Tu rol: editor exigente, no autor. Es la parte más evaluada de su criterio propio.

2. **Parte 8 — auditoría final.** Recorre con él cada checkbox y verifícalo de verdad:
   - ¿La URL sigue viva? (los planes gratuitos a veces se duermen — revísala hoy).
   - ¿La evidencia de usuario existe y no tiene datos personales?
   - ¿El historial de commits cuenta la historia (M0…M5)? ¿La bitácora tiene las 5 semanas?
   - ¿Las Partes 1–7 están completas y sin placeholders (`[escribe`, `[tu-url-publica]`)?
   Busca en el repo los placeholders restantes: `grep -rn "\[escribe aquí\|\[tu-url" .`

3. **Demo de 5 minutos.** Estructura sugerida:
   1. El problema jurídico (su 1.1, en sus palabras) — 45 s.
   2. Demo en vivo con el caso típico (¡ensayado!) + un caso donde se niega a inventar — 2 min.
   3. Cómo funciona por dentro en 3 frases (corpus → RAG → respuesta con citas) — 45 s.
   4. Límites y por qué no reemplaza al abogado (su Parte 7) — 1 min.
   5. Lo que haría diferente — 30 s.
   Ensayen el caso de la demo UNA vez en la URL real el mismo día (por si el free tier
   está dormido: la primera carga lenta puede comerase 30 s de la demo).

4. **Última pasada de seguridad:** advertencia visible ✓, sin `sk-` en el repo ✓,
   sin datos personales ✓, corpus público ✓. Deja el repo como le gustaría encontrarlo
   como juez: README impecable arriba, evidencia en `docs/`, corpus en `corpus/`.

## Checklist de "M5 completado"

- [ ] Parte 7 con las 3 respuestas honestas y en sus palabras.
- [ ] Parte 8: todos los checkboxes verificados de verdad (no solo marcados).
- [ ] Bitácora de 5 semanas completa.
- [ ] Demo ensayada con la URL real.
- [ ] Checkbox `M5` marcado + commit final.

**Cierre del hito:** commit sugerido → `M5: análisis crítico y entregables finales completos`.
**Este es el último hito.** Celebra: el proyecto pasó de una idea a una herramienta
jurídica desplegada, con fuentes y con criterio. 🎓
