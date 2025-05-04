"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGuestDataExtension = void 0;
const CdpClient_1 = require("../../client/CdpClient");
const zod_1 = require("zod");
class DeleteGuestDataExtension {
    async AddTool(server) {
        server.tool(
        //name
        "DeleteGuestDataExtension", 
        //description
        "Deletes a specific guest data extension in Sitecore CDP using the Guest API.", 
        //paramsSchema
        {
            guestRef: zod_1.z.string().describe("The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03"),
            dataExtensionName: zod_1.z.string().describe("The name of the data extension. Expected values are 'ext', 'ext1', 'ext2', 'ext3', 'ext4', or 'ext5'. Example: ext1"),
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
        async ({ guestRef, dataExtensionName }) => {
            const response = await new CdpClient_1.CdpClient().MakeRequest(`guests/${guestRef}/extensions/${dataExtensionName}`, 'DELETE', null);
            const json = await response.json();
            return {
                content: [json]
            };
        });
    }
}
exports.DeleteGuestDataExtension = DeleteGuestDataExtension;
