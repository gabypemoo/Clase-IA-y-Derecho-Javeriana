import { listAliMcpTools } from "@/lib/ali/mcp-client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 20;

export default async function AliDiagnosticPage() {
  let tools: Awaited<ReturnType<typeof listAliMcpTools>> = [];
  let connected = false;
  let errorMessage = "";

  try {
    tools = await listAliMcpTools();
    connected = true;
  } catch (error) {
    console.error(
      "Diagnóstico ALI fallido:",
      error instanceof Error ? error.message : "Error desconocido",
    );

    errorMessage =
      error instanceof Error &&
      error.message === "Falta configurar la variable ALI_MCP_API_KEY."
        ? "Falta configurar la credencial de ALI en las variables de entorno de Vercel para Preview."
        : "No fue posible establecer comunicación con ALI. Revisa la credencial y la configuración del servicio.";
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-5 py-12 text-slate-900">
      <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
          DiloBien · Herramientas internas
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Diagnóstico de conexión con ALI
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Esta página comprueba desde el servidor si DiloBien puede conectarse
          con ALI y consultar la lista de herramientas disponibles. No muestra
          ni envía tus credenciales al navegador.
        </p>

        <div
          className={`mt-8 rounded-xl border p-5 ${
            connected
              ? "border-emerald-200 bg-emerald-50"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">
            Estado de la conexión
          </p>
          <p className="mt-2 text-xl font-bold">
            {connected ? "Conexión establecida" : "No se pudo conectar"}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {connected
              ? `ALI respondió correctamente. Se encontraron ${tools.length} herramientas disponibles.`
              : errorMessage}
          </p>
        </div>

        {connected && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Herramientas detectadas</h2>
            {tools.length > 0 ? (
              <ul className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200">
                {tools.map((tool) => (
                  <li key={tool.name} className="px-4 py-3">
                    <p className="font-medium text-slate-900">{tool.name}</p>
                    {tool.description && (
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {tool.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-slate-600">
                ALI respondió, pero no anunció herramientas disponibles.
              </p>
            )}
          </div>
        )}

        <p className="mt-8 border-t border-slate-100 pt-5 text-xs leading-5 text-slate-500">
          Página temporal de diagnóstico para el entorno de prueba. Esta
          comprobación no modifica la aplicación ni presenta PQRS.
        </p>
      </section>
    </main>
  );
}
