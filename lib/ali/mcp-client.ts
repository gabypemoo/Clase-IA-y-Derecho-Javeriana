import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const ALI_MCP_URL = "https://mcp.aliado.pro/mcp";
const CONNECTION_TIMEOUT_MS = 12_000;

function getAliApiKey(): string {
  // Vercel usa una credencial separada para Preview y conserva la de Production.
  // En desarrollo local se admite ALI_MCP_API_KEY.
  const isPreview = process.env.VERCEL_ENV === "preview";
  const apiKey = isPreview
    ? process.env.ALI_MCP_API_KEY_PREVIEW
    : process.env.ALI_MCP_API_KEY;

  if (!apiKey) {
    throw new Error(
      isPreview
        ? "Falta configurar la variable ALI_MCP_API_KEY_PREVIEW."
        : "Falta configurar la variable ALI_MCP_API_KEY.",
    );
  }

  return apiKey;
}

/**
 * Abre una conexión MCP temporal con ALI, ejecuta la operación solicitada
 * y cierra la conexión incluso si ocurre un error.
 * Este módulo solo debe importarse desde código del servidor (Node.js).
 */
export async function withAliMcpClient<T>(
  operation: (client: Client) => Promise<T>,
): Promise<T> {
  const apiKey = getAliApiKey();
  const client = new Client({
    name: "dilobien",
    version: "1.0.0",
  });

  const transport = new StreamableHTTPClientTransport(new URL(ALI_MCP_URL), {
    requestInit: {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(CONNECTION_TIMEOUT_MS),
    },
  });

  try {
    await client.connect(transport);
    return await operation(client);
  } finally {
    await client.close().catch(() => undefined);
  }
}

export async function listAliMcpTools() {
  return withAliMcpClient(async (client) => {
    const response = await client.listTools();

    return response.tools.map((tool) => ({
      name: tool.name,
      description: tool.description ?? "",
      inputSchema: tool.inputSchema,
    }));
  });
}


export interface AliToolResult {
  text: string;
  isError: boolean;
}

/**
 * Ejecuta una herramienta anunciada por ALI. Los nombres y argumentos
 * se mantienen explícitos para evitar llamadas arbitrarias desde el cliente.
 */
export async function callAliTool(
  name: string,
  args: Record<string, unknown>,
): Promise<AliToolResult> {
  const allowedTools = new Set([
    "buscar_normas",
    "texto_vigente",
    "leer_norma_completa",
    "consulta_grafo",
    "estadistica_jurisprudencial",
  ]);

  if (!allowedTools.has(name)) {
    throw new Error("Herramienta ALI no permitida.");
  }

  return withAliMcpClient(async (client) => {
    const response = await client.callTool({ name, arguments: args });
    const text = Array.isArray(response.content)
      ? response.content
          .map((item) => {
            if (item.type === "text") return item.text;
            return "";
          })
          .filter(Boolean)
          .join("\n")
      : "";

    return {
      text: text.slice(0, 24_000),
      isError: Boolean(response.isError),
    };
  });
}
