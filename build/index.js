"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const CdpGuestService_1 = require("./services/CdpGuestService");
const GuestTools_1 = require("./tools/GuestTools");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
class CdpServer {
    server;
    guestService;
    actionList;
    toolsList;
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
        this.server.onerror = (error) => console.error('[Error]', error);
        this.toolsList = GuestTools_1.GuestTools;
        this.actionList = GuestTools_1.GuestToolActions;
        this.guestService = new CdpGuestService_1.CdpGuestService();
        this.setupListHandler();
        this.setupCallHandler();
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }
    setupListHandler() {
        this.server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => ({
            tools: this.toolsList,
        }));
    }
    setupCallHandler() {
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
            try {
                if (!this.actionList.includes(request.params.name)) {
                    throw new types_js_1.McpError(types_js_1.ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
                }
                console.log('[Success] Tool started successfully:', request.params.name);
                var responseData = null;
                const args = request.params.arguments;
                if (request.params.name === 'CreateGuest') {
                    const guest = args;
                    responseData = await this.guestService.createGuest(guest);
                }
                else if (request.params.name === 'RetrieveGuests') {
                    //if (!request.params.arguments) {
                    //  throw new McpError(ErrorCode.InvalidParams, 'Arguments are required for RetrieveGuests.');
                    //}
                    const queryParams = args;
                    responseData = await this.guestService.retrieveGuests(queryParams);
                }
                else if (request.params.name === 'RetrieveGuest') {
                    const guestRef = args.guestRef;
                    responseData = await this.guestService.retrieveGuest(guestRef);
                }
                else if (request.params.name === 'UpdateGuest') {
                    const guestRef = args.guestRef;
                    const guest = args;
                    responseData = await this.guestService.updateGuest(guestRef, guest);
                }
                else if (request.params.name === 'DeleteGuest') {
                    const guestRef = args.guestRef;
                    responseData = await this.guestService.deleteGuest(guestRef);
                }
                else if (request.params.name === 'CreateGuestDataExtension') {
                    const guestRef = args.guestRef;
                    const extension = JSON.parse(args.extension);
                    responseData = await this.guestService.createGuestDataExtension(guestRef, extension);
                }
                else if (request.params.name === 'RetrieveGuestDataExtensions') {
                    const guestRef = args.guestRef;
                    responseData = await this.guestService.retrieveGuestDataExtensions(guestRef);
                }
                else if (request.params.name === 'UpdateGuestDataExtension') {
                    const guestRef = args.guestRef;
                    const dataExtensionName = args.dataExtensionName;
                    const extension = JSON.parse(args.extension);
                    responseData = await this.guestService.updateGuestDataExtension(guestRef, dataExtensionName, extension);
                }
                else if (request.params.name === 'DeleteGuestDataExtension') {
                    const guestRef = args.guestRef;
                    const dataExtensionName = args.dataExtensionName;
                    responseData = await this.guestService.deleteGuestDataExtension(guestRef, dataExtensionName);
                }
                console.log('[Success] Tool executed successfully:', responseData);
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
