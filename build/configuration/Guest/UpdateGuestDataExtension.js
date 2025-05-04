"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGuestDataExtension = void 0;
const CdpClient_1 = require("../../client/CdpClient");
const zod_1 = require("zod");
class UpdateGuestDataExtension {
    async AddTool(server) {
        server.tool(
        //name
        "UpdateGuestDataExtension", 
        //description
        "Updates a specific guest data extension in Sitecore CDP using the Guest API.", 
        //paramsSchema
        {
            guestRef: zod_1.z.string().describe("The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03"),
            dataExtensionName: zod_1.z.enum(['ext', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5']).describe("The name of the data extension. The name must be unique for each guest. Example: 'ext', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5'"),
            extensions: zod_1.z.array(zod_1.z.object({ key: zod_1.z.string(), value: zod_1.z.any() })).describe("Any additional properties may be string or boolean or integer or number to create a key-value pair. Example: 'vipMember': true or 'loyaltyTier': 'level2'"),
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
        async ({ guestRef, dataExtensionName, extensions }) => {
            const extensionObj = {
                name: dataExtensionName,
            };
            for (const extension of extensions) {
                const key = extension.key;
                const value = String(extension.value);
                extensionObj[key] = value;
            }
            const response = await new CdpClient_1.CdpClient().MakeRequest(`guests/${guestRef}/extensions/${dataExtensionName}`, 'PUT', extensionObj);
            const json = await response.json();
            return {
                content: [json]
            };
        });
    }
}
exports.UpdateGuestDataExtension = UpdateGuestDataExtension;
