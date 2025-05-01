import axios from 'axios';
import { GuestModel } from '../models/guestModel';
import { config } from '../config/config';

export class CdpService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = config.cdpEndpointUrl;
    }

    public async fetchGuestData(guestId: string): Promise<GuestModel | null> {
        try {
            const response = await axios.get(`${this.apiUrl}/guests/${guestId}`, {
                headers: {
                    'Authorization': `Bearer ${config.cdpClientKey}`
                }
            });``
            const { id, name, email, createdAt } = response.data;
            return new GuestModel(id, name, email, new Date(createdAt));
        } catch (error) {
            console.error('Error fetching guest data:', error);
            return null;
        }
    }

    public async sendGuestData(guest: GuestModel): Promise<boolean> {
        try {
            await axios.post(`${this.apiUrl}/guests`, guest, {
                headers: {
                    'Authorization': `Bearer ${config.cdpClientKey}`,
                }
            });
            return true;
        } catch (error) {
            console.error('Error sending guest data:', error);
            return false;
        }
    }

    /**
     * Process a request from MCP protocol and return a response
     * This method analyzes the input text and determines which CDP API operation to execute
     */
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
    }
}

// Export an instance of the service
export const cdpService = new CdpService();