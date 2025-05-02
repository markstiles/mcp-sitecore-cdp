import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CdpGuestService } from './services/CdpGuestService';
import * as Models from './models/Guest';
import { GuestTools, GuestToolActions } from './tools/GuestTools';
import {
    CallToolRequestSchema,
    ErrorCode,
    ListToolsRequestSchema,
    McpError,
  } from '@modelcontextprotocol/sdk/types.js';

class CdpServer {
    private server: Server;
    private guestService: CdpGuestService;
    private actionList: any[];
    private toolsList: any[]; 

    constructor() {
      console.error('[Setup] Initializing CDP MCP server...');
      
      this.server = new Server(
        {
          name: 'mcp-sitecore-cdp',
          version: '0.1.0',
        },
        {
          capabilities: {
            tools: {},
          },
        }
      );
      this.server.onerror = (error) => console.error('[Error]', error);

      this.toolsList = GuestTools;
      this.actionList = GuestToolActions;
      this.guestService = new CdpGuestService();
      
      this.setupListHandler();
      this.setupCallHandler();

      process.on('SIGINT', async () => {
        await this.server.close();
        process.exit(0);
      });
    }

    private setupListHandler() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
          tools: this.toolsList,
        }));
    }

    private setupCallHandler() {
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
          try {
            if (!this.actionList.includes(request.params.name)) {
              throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
            }
            
            console.log('[Success] Tool started successfully:', request.params.name);

            var responseData: any = null;
            const args = request.params.arguments as Record<string, string>;

            if (request.params.name === 'CreateGuest') 
            {
              const guest = args as Partial<Models.Guest>;
              responseData = await this.guestService.createGuest(guest);
            } 
            else if (request.params.name === 'RetrieveGuests') 
            {
              //if (!request.params.arguments) {
              //  throw new McpError(ErrorCode.InvalidParams, 'Arguments are required for RetrieveGuests.');
              //}
              const queryParams = args as Record<string, string>;
              responseData = await this.guestService.retrieveGuests(queryParams);
            }
            else if (request.params.name === 'RetrieveGuest')
            {  
              const guestRef = args.guestRef as string;
              responseData = await this.guestService.retrieveGuest(guestRef);
            }
            else if (request.params.name === 'UpdateGuest')
            {  
              const guestRef = args.guestRef as string;
              const guest = args as Partial<Models.Guest>;
              responseData = await this.guestService.updateGuest(guestRef, guest);
            }
            else if (request.params.name === 'DeleteGuest')
            {  
              const guestRef = args.guestRef as string;
              responseData = await this.guestService.deleteGuest(guestRef);
            }
            else if (request.params.name === 'CreateGuestDataExtension')
            {  
              const guestRef = args.guestRef as string;
              const extension = JSON.parse(args.extension) as Partial<Models.GuestDataExtension>
              responseData = await this.guestService.createGuestDataExtension(guestRef, extension);
            }
            else if (request.params.name === 'RetrieveGuestDataExtensions')
            {  
              const guestRef = args.guestRef as string;
              responseData = await this.guestService.retrieveGuestDataExtensions(guestRef);
            }
            else if (request.params.name === 'UpdateGuestDataExtension')
            {  
              const guestRef = args.guestRef as string;
              const dataExtensionName = args.dataExtensionName as string;
              const extension = JSON.parse(args.extension) as Partial<Models.GuestDataExtension>
              responseData = await this.guestService.updateGuestDataExtension(guestRef, dataExtensionName, extension);
            }
            else if (request.params.name === 'DeleteGuestDataExtension')
            {  
              const guestRef = args.guestRef as string;
              const dataExtensionName = args.dataExtensionName as string;
              responseData = await this.guestService.deleteGuestDataExtension(guestRef, dataExtensionName);
            }
            console.log('[Success] Tool executed successfully:', responseData);
            return { content: [{ type: 'text', text: JSON.stringify(responseData) }] };
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.error('[Error] Failed to fetch data:', error);
              throw new McpError(
                ErrorCode.InternalError,
                `Failed to fetch data: ${error.message}`
              );
            }
            throw error;
          }
        });
    }

    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('CDP MCP server running on stdio');
    }
}

const server = new CdpServer();
server.run().catch(console.error);