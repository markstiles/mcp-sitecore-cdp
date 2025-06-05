import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CdpClient } from '../../client/CdpClient';
import { z } from "zod";
import { ExportFileListingName, UnauthorizedResponse } from "./Models";

export class RetrieveLatestExport {
    public async AddTool(server: McpServer) {
        server.tool(
            //name
            "RetrieveLatestExport",
            //description
            "Retrieves the presigned URLs for the outputs of the most recently finished export job for a given audience export.",
            //paramsSchema
            {
                audienceExportRef: z.string().describe("The audience export reference. Set this value either to the friendly ID or the UUID reference of the audience export."),
            },
            //annotations
            {
                title: "Retrieve Latest Export Output URLs",
                readOnlyHint: true,
                destructiveHint: false,
                idempotentHint: true,
                openWorldHint: true,
            },
            //callback
            async ({ audienceExportRef }) => {
                const response = await new CdpClient().MakeRequest<ExportFileListingName>(
                    `audienceExports/definitions/${audienceExportRef}/latestExport`,
                    'GET',
                    null
                );
                const json = await response.json();
                return {
                    content: [json]
                };
            }
        );
    }
}
