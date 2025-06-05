import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CdpClient } from '../../client/CdpClient';
import { z } from "zod";
import { ExecutionReportName, UnauthorizedResponse } from "./Models";

export class RetrieveFinishedExportJobs {
    public async AddTool(server: McpServer) {
        server.tool(
            //name
            "RetrieveFinishedExportJobs",
            //description
            "Retrieves a list of all finished export jobs for a given audience export.",
            //paramsSchema
            {
                audienceExportRef: z.string().describe("The audience export reference. Set this value either to the friendly ID or the UUID reference of the audience export."),
            },
            //annotations
            {
                title: "Retrieve Finished Export Jobs",
                readOnlyHint: true,
                destructiveHint: false,
                idempotentHint: true,
                openWorldHint: true,
            },
            //callback
            async ({ audienceExportRef }) => {
                const response = await new CdpClient().MakeRequest<ExecutionReportName[]>(
                    `audienceExports/definitions/${audienceExportRef}/reports`,
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
