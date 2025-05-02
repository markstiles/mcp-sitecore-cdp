"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const CdpGuestService_1 = require("./services/CdpGuestService");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const GuestTools_1 = require("./tools/GuestTools");
class CdpServer {
    server;
    guestService;
    actionList = [
        'CreateGuest',
        'RetrieveGuests',
        'RetrieveGuest',
        'UpdateGuest',
        'DeleteGuest',
        'CreateGuestDataExtension',
        'RetrieveGuestDataExtensions',
        'UpdateGuestDataExtension',
        'DeleteGuestDataExtension'
    ];
    constructor() {
        console.error('[Setup] Initializing CDP MCP server...');
        this.server = new index_js_1.Server({
            name: 'mcp-sitecore-cdp',
            version: '0.1.0',
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupListHandler();
        this.setupCallHandler();
        this.guestService = new CdpGuestService_1.CdpGuestService();
        this.server.onerror = (error) => console.error('[Error]', error);
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }
    setupListHandler() {
        this.server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => ({
            tools: GuestTools_1.GuestTools,
        }));
    }
    setupCallHandler() {
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
            try {
                if (!this.actionList.includes(request.params.name)) {
                    throw new types_js_1.McpError(types_js_1.ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
                }
                var responseData = null;
                if (request.params.name === 'CreateGuest') {
                    responseData = await this.guestService.createGuest(request);
                }
                else if (request.params.name === 'RetrieveGuests') {
                    responseData = await this.guestService.retrieveGuests(request);
                }
                else if (request.params.name === 'RetrieveGuest') {
                    responseData = await this.guestService.retrieveGuest(request);
                }
                else if (request.params.name === 'UpdateGuest') {
                    responseData = await this.guestService.updateGuest(request);
                }
                else if (request.params.name === 'DeleteGuest') {
                    responseData = await this.guestService.deleteGuest(request);
                }
                else if (request.params.name === 'CreateGuestDataExtension') {
                    responseData = await this.guestService.createGuestDataExtension(request);
                }
                else if (request.params.name === 'RetrieveGuestDataExtensions') {
                    responseData = await this.guestService.retrieveGuestDataExtensions(request);
                }
                else if (request.params.name === 'UpdateGuestDataExtension') {
                    responseData = await this.guestService.updateGuestDataExtension(request);
                }
                else if (request.params.name === 'DeleteGuestDataExtension') {
                    responseData = await this.guestService.deleteGuestDataExtension(request);
                }
                return { content: [{ type: 'text', text: JSON.stringify(responseData) }] };
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('[Error] Failed to fetch data:', error);
                    throw new types_js_1.McpError(types_js_1.ErrorCode.InternalError, `Failed to fetch data: ${error.message}`);
                }
                throw error;
            }
        });
    }
    async run() {
        const transport = new stdio_js_1.StdioServerTransport();
        await this.server.connect(transport);
        console.error('CDP MCP server running on stdio');
    }
}
const server = new CdpServer();
server.run().catch(console.error);
