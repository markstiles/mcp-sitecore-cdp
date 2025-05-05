import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { AudienceExportApi } from "./configuration/AudienceExport/AudienceExportApi";
import { GuestApi } from "./configuration/Guest/GuestApi";
import { OrderApi } from "./configuration/Order/OrderApi";

class CdpServer {
    private server: McpServer;
    
    constructor() {
      //console.info('[Setup] Initializing CDP MCP server...');
      
      this.server = new McpServer({
        name: 'mcp-sitecore-cdp',
        version: "1.0.0",
      });

      // Guest API
      const guestApi = new GuestApi()
      guestApi.SetupTools(this.server);
      guestApi.SetupResources(this.server);
      guestApi.SetupPrompts(this.server);
      
      // Order API
      const orderApi = new OrderApi()
      orderApi.SetupTools(this.server);
      orderApi.SetupResources(this.server);
      orderApi.SetupPrompts(this.server);

      // Audience Export API
      const audienceExportApi = new AudienceExportApi()
      audienceExportApi.SetupTools(this.server);
      audienceExportApi.SetupResources(this.server);
      audienceExportApi.SetupPrompts(this.server);
      
    }

    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        //console.info('CDP MCP server running on stdio');
    }
}

const server = new CdpServer();
server.run().catch(console.error);