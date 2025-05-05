import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CdpClient } from '../../client/CdpClient';
import * as Models from './Models';
import { z } from "zod";

export class RetrieveGuestDataExtensionsByName
{
    public async AddTool(server: McpServer) {
        server.tool(
            //name
            "RetrieveGuestDataExtensionsByName",
            //description
            "Retrieves a single guest data extension for a guest in Sitecore CDP using the Guest API.",
            //paramsSchema
            {
                guestRef: z.string().uuid().describe("The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03"),
                dataExtensionName: z.enum(['ext', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5']).describe("The name of the data extension. Expected values are 'ext', 'ext1', 'ext2', 'ext3', 'ext4', or 'ext5'. Example: ext1"),
                offset: z.number().nullable().describe("Collection responses use offset pagination. The offset query parameter is used to exclude from a response the first N items of the entire resource collection. Default: 0. Example: offset=10"),
                limit: z.number().nullable().describe("Collection responses use offset pagination. This query parameter lets you adjust the maximum number of collection items to return for a single request. Default: 10. Example: limit=40"),
                expand: z.boolean().nullable().describe("You can expand items in a collection by setting expand=true. This eliminates the need to send multiple follow-up requests (one for the collection and another for each of its items). This also helps you check if the data you intend to create already exists. Default ''. Example: expand=true"),
            },
            //annotations
            {
                title: "Retrieves a single guest data extension for a guest in Sitecore CDP", // Human-readable title for the tool
                readOnlyHint: false, // If true, the tool does not modify its environment
                destructiveHint: false, // If true, the tool may perform destructive updates
                idempotentHint: false, // If true, repeated calls with same args have no additional effect
                openWorldHint: true, // If true, tool interacts with external entities
            },
            //callback
            async ({ guestRef, dataExtensionName, offset, limit, expand }) => 
            {   
                const queryParams: Record<string, string> = {};

                queryParams['offset'] = offset ? String(offset) : "0";
                queryParams['limit'] = limit ? String(limit) : "10";
                queryParams['expand'] = expand ? String(expand) : "false";

                const query = new URLSearchParams(queryParams).toString();
                const response = await new CdpClient().MakeRequest<Models.GuestDataExtensionResponse[]>(
                    `guests/${guestRef}/extensions/${dataExtensionName}?${query}`,
                    'GET',
                    null);
                    
                const json = await response.json();
                return {
                    content: [json]
                };
            }
        );
    }
}