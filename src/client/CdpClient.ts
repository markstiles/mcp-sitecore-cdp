import { ServerConfig } from '../ServerConfig';

export class CdpClient {
   
    private headers: any;
    private baseUrl: string = ServerConfig.cdpEndpointUrl;

    constructor() 
    {  
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Authorization", `Basic ${btoa(`${ServerConfig.cdpClientKey}:${ServerConfig.cdpApiToken}`)}`);
    }
    
    public async MakeRequest<T>(url: string, method: string, body: any): Promise<any> 
    {       
        try {
            const response = await fetch(this.baseUrl + url, {
              method: method,
              headers: this.headers,
              body: body
            });
                
            return response as T;
          } catch (error) {
            console.error(error);
            return { ok: false, error: error || 'Unknown error' };
          }
    }
}