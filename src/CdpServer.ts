import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CdpGuestService } from './services/CdpGuestService';
import {
    CallToolRequestSchema,
    ErrorCode,
    ListToolsRequestSchema,
    McpError,
  } from '@modelcontextprotocol/sdk/types.js';
import { GuestTools } from './tools/GuestTools';

class CdpServer {
    private server: Server;
    private guestService: CdpGuestService;
    private actionList = [
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
        
      this.setupListHandler();
      this.setupCallHandler();

      this.guestService = new CdpGuestService();
  
      this.server.onerror = (error) => console.error('[Error]', error);

      process.on('SIGINT', async () => {
        await this.server.close();
        process.exit(0);
      });
    }

    private setupListHandler() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
          tools: GuestTools,
        }));
    }

    private setupCallHandler() {
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
          try {
            if (!this.actionList.includes(request.params.name)) {
              throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
            }
            
            var responseData: any = null;

            if (request.params.name === 'CreateGuest') 
            {
              responseData = await this.guestService.createGuest(request as any);
            } 
            else if (request.params.name === 'RetrieveGuests') 
            {
              responseData = await this.guestService.retrieveGuests(request as any);
            }
            else if (request.params.name === 'RetrieveGuest')
            {  
              responseData = await this.guestService.retrieveGuest(request as any);
            }
            else if (request.params.name === 'UpdateGuest')
            {  
              responseData = await this.guestService.updateGuest(request as any);
            }
            else if (request.params.name === 'DeleteGuest')
            {  
              responseData = await this.guestService.deleteGuest(request as any);
            }
            else if (request.params.name === 'CreateGuestDataExtension')
            {  
              responseData = await this.guestService.createGuestDataExtension(request as any);
            }
            else if (request.params.name === 'RetrieveGuestDataExtensions')
            {  
              responseData = await this.guestService.retrieveGuestDataExtensions(request as any);
            }
            else if (request.params.name === 'UpdateGuestDataExtension')
            {  
              responseData = await this.guestService.updateGuestDataExtension(request as any);
            }
            else if (request.params.name === 'DeleteGuestDataExtension')
            {  
              responseData = await this.guestService.deleteGuestDataExtension(request as any);
            }

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