import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { RetrieveExportJobOutput } from "./RetrieveExportJobOutput";
import { RetrieveLatestExport } from "./RetrieveLatestExport";
import { RetrieveFinishedExportJobs } from "./RetrieveFinishedExportJobs";

export class AudienceExportApi 
{
    public async SetupTools(server: McpServer): Promise<void> 
    {       
        new RetrieveExportJobOutput().AddTool(server);
        new RetrieveLatestExport().AddTool(server);
        new RetrieveFinishedExportJobs().AddTool(server);  
    }

    public async SetupResources(server: McpServer): Promise<void> 
    {

    }

    public async SetupPrompts(server: McpServer): Promise<void> 
    {

    }
}