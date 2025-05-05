import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CdpClient } from '../../client/CdpClient';
import { z } from "zod";

export class DeleteGuestDataExtension 
{
    public async AddTool(server: McpServer) {
        server.tool(
            //name
            "DeleteGuestDataExtension",
            //description
            "Deletes a specific guest data extension in Sitecore CDP using the Guest API.",
            //paramsSchema
            {
                guestRef: z.string().uuid().describe("The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03"),
                dataExtensionName: z.enum(['ext', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5']).describe("The name of the data extension. Expected values are 'ext', 'ext1', 'ext2', 'ext3', 'ext4', or 'ext5'. Example: ext1"),
            },
            //annotations
            {
                title: "Deletes a specific guest data extension in Sitecore CDP", // Human-readable title for the tool
                readOnlyHint: false, // If true, the tool does not modify its environment
                destructiveHint: false, // If true, the tool may perform destructive updates
                idempotentHint: false, // If true, repeated calls with same args have no additional effect
                openWorldHint: true, // If true, tool interacts with external entities
            },
            //callback
            async ({ guestRef, dataExtensionName }) => 
            {   
                const response = await new CdpClient().MakeRequest(
                    `guests/${guestRef}/extensions/${dataExtensionName}`,
                    'DELETE',
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