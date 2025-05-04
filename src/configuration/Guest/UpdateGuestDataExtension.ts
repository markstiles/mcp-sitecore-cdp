import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CdpClient } from '../../client/CdpClient';
import * as Models from './Models';
import { z } from "zod";

export class UpdateGuestDataExtension 
{
    public async AddTool(server: McpServer) {
        server.tool(
            //name
            "UpdateGuestDataExtension",
            //description
            "Updates a specific guest data extension in Sitecore CDP using the Guest API.",
            //paramsSchema
            {
                guestRef: z.string().describe("The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03"),
                dataExtensionName: z.enum(['ext', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5']).describe("The name of the data extension. The name must be unique for each guest. Example: 'ext', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5'"),
                extensions: z.array(z.object({key: z.string(), value: z.any()})).describe("Any additional properties may be string or boolean or integer or number to create a key-value pair. Example: 'vipMember': true or 'loyaltyTier': 'level2'"),
            },
            //annotations
            {
                title: "Updates a specific guest data extension in Sitecore CDP", // Human-readable title for the tool
                readOnlyHint: false, // If true, the tool does not modify its environment
                destructiveHint: false, // If true, the tool may perform destructive updates
                idempotentHint: false, // If true, repeated calls with same args have no additional effect
                openWorldHint: true, // If true, tool interacts with external entities
            },
            //callback
            async ({ guestRef, dataExtensionName, extensions }) => 
            {     
                const extensionObj: Models.DataExtension = {
                    name: dataExtensionName,
                }
                for (const extension of extensions) {
                    const key = extension.key as string;
                    const value = String(extension.value);
                    extensionObj[key] = value;
                }

                const response = await new CdpClient().MakeRequest<Models.GuestDataExtensionResponse>(
                    `guests/${guestRef}/extensions/${dataExtensionName}`,
                    'PUT',
                    extensionObj
                );
                    
                const json = await response.json();
                return {
                    content: [json]
                };
            }
        );
    }
}