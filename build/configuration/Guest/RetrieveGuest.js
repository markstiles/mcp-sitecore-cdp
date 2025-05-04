"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveGuest = void 0;
const CdpClient_1 = require("../../client/CdpClient");
const zod_1 = require("zod");
class RetrieveGuest {
    async AddTool(server) {
        server.tool(
        //name
        "RetrieveGuest", 
        //description
        "Retrieves the full guest record of a guest, including any guest data extensions from Sitecore CDP using the Guest API", 
        //paramsSchema
        {
            guestRef: zod_1.z.string().describe("The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03"),
            expand: zod_1.z.boolean().nullable().describe("You can expand items in a collection by setting expand=true. This eliminates the need to send multiple follow-up requests (one for the collection and another for each of its items). This also helps you check if the data you intend to create already exists. Default ''. Example: expand=true"),
        }, 
        //annotations
        {
            title: "Retrieves a single Guest in Sitecore CDP", // Human-readable title for the tool
            readOnlyHint: false, // If true, the tool does not modify its environment
            destructiveHint: false, // If true, the tool may perform destructive updates
            idempotentHint: false, // If true, repeated calls with same args have no additional effect
            openWorldHint: true, // If true, tool interacts with external entities
        }, 
        //callback
        async ({ guestRef, expand }) => {
            const query = new URLSearchParams({ expand: String(expand) }).toString();
            const response = await new CdpClient_1.CdpClient().MakeRequest(`guests/${guestRef}?${query}`, 'GET', null);
            const json = await response.json();
            return {
                content: [json]
            };
        });
    }
}
exports.RetrieveGuest = RetrieveGuest;
