# M4 — Interfaz web desplegada (Sesión 4)

**Objetivo:** URL pública donde cualquiera usa la herramienta. Ruta del curso: **Vercel**
(Next.js) o **Streamlit Community Cloud** si el proyecto es Python. Gratis, sin tarjeta,
sin dominio propio.

**Prerrequisito:** M3 (desplegar un asistente sin RAG/citas sería mostrar la versión que
justamente el curso quiere superar).

## Cómo guiar

1. **Interfaz mínima digna.** Solo necesita:
   - Advertencia legal **visible arriba**, tipográficamente clara (no un footer gris).
   - Caja de texto para la consulta + botón.
   - Respuesta con las citas del corpus (M3) legibles.
   - Nombre/lema de la herramienta (Parte 1.5) — la usará en la demo.
   Nada más. No agregues features: cada pieza extra es una pieza que se rompe en la demo.

2. **Protege los secretos ANTES del primer deploy:**
   - `OPENROUTER_API_KEY` en variable de entorno de Vercel/Streamlit (Settings →
     Environment Variables), igual que en local con `.env`.
   - `.env` en `.gitignore`; verifica con una búsqueda de `sk-` en todo el repo.
   Si una clave ya se subió por error: revocar en openrouter.ai → Keys y reciclar.

3. **Despliega:**
   - **Vercel**: repo en GitHub → vercel.com → Add New Project → import → Deploy. Cada
     push re-despliega. Para Next.js es directo; si el build falla, lee el log del build
     en el dashboard y arregla en orden (dependencias → build → runtime).
   - **Streamlit**: app en `app.py` con requirements.txt → share.streamlit.io → apunta
     al repo → añade los secrets. La primera carga tarda unos minutos.
   El estudiante debe hacer el flujo CON tu guía (su cuenta, su click): aprender a
   desplegar es parte del hito, no un trámite.

4. **Verifica en frío:** abre la URL en ventana de incógnito (sin sesión), desde el
   celular. Pídele a otra persona que la abra. La advertencia debe verse sin hacer scroll.

5. **Primer usuario real + evidencia** (parte del M4): alguien fuera del curso la prueba;
   captura o video corto del uso; registro en `docs/evidencia-usuario.md` (sin datos
   personales del usuario: solo nombre genérico, fecha, qué hizo, qué opinó).

6. **Deja la URL donde el docente la busca:** reemplaza `[tu-url-publica]` en la Parte 4
   del README y marca el checklist de despliegue completo.

## Checklist de "M4 completado"

- [ ] URL pública funciona en incógnito y en el celular de otra persona.
- [ ] Advertencia legal visible arriba, sin scroll.
- [ ] Respuestas con citas del corpus funcionando en producción (no solo en local).
- [ ] Cero secretos en el repo (búsqueda de `sk-` limpia).
- [ ] URL anotada en la Parte 4 del README.
- [ ] `docs/evidencia-usuario.md` con la evidencia del primer usuario.
- [ ] Bitácora + checkbox `M4` marcado.

**Cierre del hito:** commit sugerido → `M4: interfaz desplegada en [URL] con evidencia de usuario`.
