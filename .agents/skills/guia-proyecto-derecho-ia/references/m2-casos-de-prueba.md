# M2 — Casos de prueba documentados (Sesión 2)

**Objetivo:** al menos 5 casos de prueba en `docs/casos-de-prueba.md` que muestren dónde
funciona el asistente — y más importante, **dónde falla o se niega a inventar**.

**Prerrequisito:** M1 (hay un prompt v1 que probar).

## Cómo guiar

1. **Diseña los casos CON el estudiante** (él conoce los casos jurídicos, tú la estructura).
   Los 5 casos mínimos:

   | # | Tipo de caso | Qué se prueba |
   |---|---|---|
   | 1 | Caso típico dentro del alcance | Responde útil y menciona la norma |
   | 2 | Caso límite del alcance | Responde con matices o pide más contexto |
   | 3 | Fuera del alcance | Se niega amablemente y redirige |
   | 4 | Capcioso: pregunta con premisa falsa o norma inexistente | **NO inventa**; dice que no lo sabe |
   | 5 | Caso que antes fallaba (del README-ORIGINAL o de la bitácora) | Mejoró vs. versión anterior |

   Casos 3 y 4 son los que más valen en la nota: demuestran salvaguardas funcionando.

2. **Formato del archivo** `docs/casos-de-prueba.md`:

   ```markdown
   # Casos de prueba — [nombre de la herramienta]

   | # | Pregunta hecha | Respuesta esperada | Respuesta real | ¿Pasa? | Nota |
   |---|---|---|---|---|---|
   | 1 | "Me subieron el arriendo 20%…" | Orienta con Ley 820 | [resumen] | ✅ | … |

   ## Conclusiones
   - Qué falla más: …
   - Qué ajusté en el prompt tras estas pruebas: …
   ```

   La columna "¿Pasa?" con criterio honesto: ❌ es información valiosa, no un fracaso.

3. **Itera:** si 2+ casos fallan, ajusta el prompt (guarda v2 junto a v1, no lo sobrescribas:
   el historial de versiones es evidencia de aprendizaje) y repite los casos que fallaron.

4. **Sin datos personales reales** (Ley 1581): los casos usan nombres inventados ("Juana,
   arrendataria en Bogotá") y situaciones ficticias.

## Checklist de "M2 completado"

- [ ] `docs/casos-de-prueba.md` con 5+ casos en el formato de arriba.
- [ ] Al menos un caso donde el asistente se niega a inventar (caso 4) documentado.
- [ ] Conclusiones escritas por el estudiante (qué falla, qué ajustó).
- [ ] Bitácora actualizada + checkbox `M2` marcado.

**Cierre del hito:** commit sugerido → `M2: 5 casos de prueba documentados en docs/`.
