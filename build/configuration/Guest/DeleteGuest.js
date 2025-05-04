"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGuest = void 0;
const CdpClient_1 = require("../../client/CdpClient");
const zod_1 = require("zod");
class DeleteGuest {
    async AddTool(server) {
        server.tool(
        //name
        "DeleteGuest", 
        //description
        "Deletes a guest record and all associated entities in Sitecore CDP using the Guest API.", 
        //paramsSchema
        {
            guestRef: zod_1.z.string().describe("The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03"),
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
        async ({ guestRef }) => {
            const response = await new CdpClient_1.CdpClient().MakeRequest(`guests/${guestRef}`, 'DELETE', null);
            const json = await response.json();
            return {
                content: [json]
            };
        });
    }
}
exports.DeleteGuest = DeleteGuest;
