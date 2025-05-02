import { config } from '../config/config';

export class CdpClient {
   
    private headers: any;

    constructor() {
        
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Authorization", `Basic ${btoa(`${config.cdpClientKey}:${config.cdpApiToken}`)}`);
    }
    
    public async MakeRequest<T>(url: string, method: string, body: any): Promise<any> 
    {       
        try {
            const response = await fetch(config.cdpEndpointUrl + url, {
              method: method,
              headers: this.headers,
              body: body
            });
        
            //console.log("Response:");
            //console.log(response);
        
            return response as T;
          } catch (error) {
            console.log(error);
            return { ok: false, error: error || 'Unknown error' };
          }
    }
  
    /*
    public async processRequest(text: string): Promise<string> {
        try {
            // Parse the request to determine what operation is requested
            const requestParts = text.trim().toLowerCase().split(' ');
            
            // Simple parsing for demonstration - in a real implementation, use a more robust approach
            if (requestParts.includes('get') && requestParts.includes('guest')) {
                // Extract guest ID from the request
                const guestId = this.extractGuestId(requestParts);
                if (guestId) {
                    const guest = await this.fetchGuestData(guestId);
                    if (guest) {
                        return `Guest data: ${JSON.stringify(guest, null, 2)}`;
                    } else {
                        return `Guest with ID ${guestId} not found.`;
                    }
                } else {
                    return "Please provide a valid guest ID.";
                }
            } else if (requestParts.includes('create') && requestParts.includes('guest')) {
                // For demo purposes - would need a more sophisticated parsing in production
                return "To create a guest, please provide guest details in JSON format.";
            } else {
                // Provide help for using the service
                return `
                    Sitecore CDP API Service - Available commands:
                    - Get guest data: "Get guest with ID [guest_id]"
                    - Create guest: "Create guest with [guest_details_json]"
                    For more information about the Sitecore CDP API, see https://api-docs.sitecore.com/cdp/guest-rest-api
                `;
            }
        } catch (error) {
            console.error('Error processing request:', error);
            return `Error processing your request: ${error}`;
        }
    }

    private extractGuestId(requestParts: string[]): string | null {
        const idIndex = requestParts.findIndex(part => part === 'id') + 1;
        if (idIndex > 0 && idIndex < requestParts.length) {
            return requestParts[idIndex];
        }
        return null;
    }*/
}