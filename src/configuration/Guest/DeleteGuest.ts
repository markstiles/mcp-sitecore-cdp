import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CdpClient } from '../../client/CdpClient';
import { z } from "zod";

export class DeleteGuest 
{
    public async AddTool(server: McpServer) {
        server.tool(
            //name
            "DeleteGuest",
            //description
            "Deletes a guest record and all associated entities in Sitecore CDP using the Guest API.",
            //paramsSchema
            {
                guestRef: z.string().describe("The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03"),
            },
            //annotations
            {
                title: "Deletes a single Guest in Sitecore CDP", // Human-readable title for the tool
                readOnlyHint: false, // If true, the tool does not modify its environment
                destructiveHint: false, // If true, the tool may perform destructive updates
                idempotentHint: false, // If true, repeated calls with same args have no additional effect
                openWorldHint: true, // If true, tool interacts with external entities
            },
            //callback
            async ({ guestRef }) => 
            {         
                const response = await new CdpClient().MakeRequest(
                    `guests/${guestRef}`,
                    'DELETE',
                    null);
                
                const json = await response.json();
                return {
                    content: [json]
                };
            }
        );
    }
}