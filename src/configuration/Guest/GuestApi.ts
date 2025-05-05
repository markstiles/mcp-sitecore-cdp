import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CreateGuest } from "./CreateGuest"; 
import { CreateGuestDataExtension } from "./CreateGuestDataExtension"; 
import { DeleteGuest } from "./DeleteGuest"; 
import { DeleteGuestDataExtension } from "./DeleteGuestDataExtension"; 
import { DeleteGuestDataExtensionFields } from "./DeleteGuestDataExtensionFields"; 
import { PartialUpdateGuest } from "./PartialUpdateGuest"; 
import { RetrieveGuest } from "./RetrieveGuest"; 
import { RetrieveGuestDataExtensions } from "./RetrieveGuestDataExtensions";
import { RetrieveGuestDataExtensionsByName } from "./RetrieveGuestDataExtensionsByName"; 
import { RetrieveGuests } from "./RetrieveGuests"; 
import { UpdateGuest } from "./UpdateGuest"; 
import { UpdateGuestDataExtension } from "./UpdateGuestDataExtension"; 

export class GuestApi 
{
    public async SetupTools(server: McpServer): Promise<void> 
    {       
        // Add each individual API method to the server
        new CreateGuest().AddTool(server);
        new CreateGuestDataExtension().AddTool(server);
        new DeleteGuest().AddTool(server);
        new DeleteGuestDataExtension().AddTool(server);
        new DeleteGuestDataExtensionFields().AddTool(server);        
        new PartialUpdateGuest().AddTool(server);
        new RetrieveGuest().AddTool(server);    
        new RetrieveGuestDataExtensions().AddTool(server);
        new RetrieveGuestDataExtensionsByName().AddTool(server);
        new RetrieveGuests().AddTool(server);
        new UpdateGuest().AddTool(server);
        new UpdateGuestDataExtension().AddTool(server);
    }

    public async SetupResources(server: McpServer): Promise<void> 
    {

    }

    public async SetupPrompts(server: McpServer): Promise<void> 
    {

    }
}