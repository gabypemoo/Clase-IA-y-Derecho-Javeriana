import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const ALI_MCP_URL = "https://mcp.aliado.pro/mcp";
const CONNECTION_TIMEOUT_MS = 12_000;

function getAliApiKey(): string {
  const apiKey = process.env.ALI_MCP_API_KEY;

  if (!apiKey) {
    throw new Error("Falta configurar la variable ALI_MCP_API_KEY.");
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
