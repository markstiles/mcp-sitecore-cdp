"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const AudienceExportApi_1 = require("./configuration/AudienceExport/AudienceExportApi");
const GuestApi_1 = require("./configuration/Guest/GuestApi");
const OrderApi_1 = require("./configuration/Order/OrderApi");
class CdpServer {
    server;
    constructor() {
        //console.error('[Setup] Initializing CDP MCP server...');
        this.server = new mcp_js_1.McpServer({
            name: 'mcp-sitecore-cdp',
            version: "1.0.0",
        });
        // Guest API
        const guestApi = new GuestApi_1.GuestApi();
        guestApi.SetupTools(this.server);
        guestApi.SetupResources(this.server);
        guestApi.SetupPrompts(this.server);
        // Order API
        const orderApi = new OrderApi_1.OrderApi();
        orderApi.SetupTools(this.server);
        orderApi.SetupResources(this.server);
        orderApi.SetupPrompts(this.server);
        // Audience Export API
        const audienceExportApi = new AudienceExportApi_1.AudienceExportApi();
        audienceExportApi.SetupTools(this.server);
        audienceExportApi.SetupResources(this.server);
        audienceExportApi.SetupPrompts(this.server);
    }
    async run() {
        const transport = new stdio_js_1.StdioServerTransport();
        await this.server.connect(transport);
        //console.error('CDP MCP server running on stdio');
    }
}
const server = new CdpServer();
server.run().catch(console.error);
