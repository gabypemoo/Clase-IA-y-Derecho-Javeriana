import { NextResponse } from "next/server";
import { listAliMcpTools } from "@/lib/ali/mcp-client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 20;

function isAuthorized(request: Request): boolean {
  const expected = process.env.ALI_MCP_TEST_TOKEN;
  const provided = request.headers.get("authorization");

  if (!expected || !provided) return false;
  return provided === `Bearer ${expected}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: "No autorizado." },
      { status: 401 },
    );
  }

  const configuredAliKey = process.env.VERCEL_ENV === "preview"
    ? process.env.ALI_MCP_API_KEY_PREVIEW
    : process.env.ALI_MCP_API_KEY;

  if (!configuredAliKey) {
    return NextResponse.json(
      { ok: false, error: "Falta configurar la credencial de ALI para este entorno." },
      { status: 503 },
    );
  }

  try {
    const tools = await listAliMcpTools();

    return NextResponse.json({
      ok: true,
      server: "ALIADO MCP",
      tools: tools.map(({ name, description }) => ({ name, description })),
      toolCount: tools.length,
    });
  } catch (error) {
    console.error(
      "Error al comprobar conexión con ALI MCP:",
      error instanceof Error ? error.message : "Error desconocido",
    );

    return NextResponse.json(
      {
        ok: false,
        error: "No fue posible conectar con ALI. Revisa la configuración y los registros del servidor.",
      },
      { status: 502 },
    );
  }
}
