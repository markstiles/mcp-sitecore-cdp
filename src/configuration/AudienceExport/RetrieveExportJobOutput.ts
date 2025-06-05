import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CdpClient } from '../../client/CdpClient';
import { z } from "zod";
import { ExportFileListingName, BadRequestResponse, UnauthorizedResponse } from "./Models";

export class RetrieveExportJobOutput {
    public async AddTool(server: McpServer) {
        server.tool(
            //name
            "RetrieveExportJobOutput",
            //description
            "Retrieves the presigned URLs for the outputs of a specific export job.",
            //paramsSchema
            {
                jobExecutionRef: z.string().describe("The export job reference. If you don't know the export job reference, first retrieve a list of all finished export jobs."),
            },
            //annotations
            {
                title: "Retrieve Export Job Output URLs",
                readOnlyHint: true,
                destructiveHint: false,
                idempotentHint: true,
                openWorldHint: true,
            },
            //callback
            async ({ jobExecutionRef }) => {
                const response = await new CdpClient().MakeRequest<ExportFileListingName>(
                    `audienceExports/executions/${jobExecutionRef}/export`,
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
