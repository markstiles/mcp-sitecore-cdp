import { CdpClient } from '../client/CdpClient';
import * as Models from '../models/Guest';

export class CdpGuestService {
  private client: CdpClient;

  constructor() {
    this.client = new CdpClient();
  }

  // Guest Endpoints
  async createGuest(guest: Partial<Models.Guest>): Promise<Models.GuestCreateResponse> 
  {
    const response = await this.client.MakeRequest<Models.GuestCreateResponse>(
        'guests', 
        'POST', 
        guest);
    return response.data;
  }

  async retrieveGuests(offset: number, limit: number, expand: boolean, sort: string): Promise<Models.RetrieveGuestsResponse> 
  { 
    const response = await this.client.MakeRequest<Models.RetrieveGuestsResponse>(
      //`guests?offset=${offset}&limit=${limit}&expand=${expand}&sort=${sort}`, 
      `guests?offset=${offset}&limit=${limit}&expand=${expand}`, 
      'GET', null);

    return await response.json();
  }

  async retrieveGuest(guestRef: string): Promise<Models.GuestCreateResponse> 
  {
    const response = await this.client.MakeRequest<Models.GuestCreateResponse>(
        `guests/${guestRef}`,
        'GET',
        null);
    
    return await response.json();
  }

  async updateGuest(guestRef: string,  guest: Partial<Models.Guest>): Promise<Models.GuestCreateResponse> 
  {
    const response = await this.client.MakeRequest<Models.GuestCreateResponse>(
        `guests/${guestRef}`, 
        'PUT',
        guest);
    
    return await response.json();
  }

  async deleteGuest(guestRef: string): Promise<void> 
  {
    await this.client.MakeRequest(
        `guests/${guestRef}`,
        'DELETE',
        null);
  }

  // Guest Data Extension Endpoints
  async createGuestDataExtension(guestRef: string, extension: Partial<Models.GuestDataExtension>): Promise<Models.GuestDataExtensionResponse> 
  {
    const response = await this.client.MakeRequest<Models.GuestDataExtensionResponse>(
        `guests/${guestRef}/extensions`, 
        'POST',
        extension);
    
    return await response.json();
  }

  async retrieveGuestDataExtensions(guestRef: string): Promise<Models.GuestDataExtensionResponse[]> 
  {
    const response = await this.client.MakeRequest<Models.GuestDataExtensionResponse[]>(
        `guests/${guestRef}/extensions`,
        'GET',
        null);
    
    return await response.json();
  }

  async updateGuestDataExtension(
    guestRef: string, 
    dataExtensionName: string, 
    extension: Partial<Models.GuestDataExtension>
  ): Promise<Models.GuestDataExtensionResponse> 
  {
    const response = await this.client.MakeRequest<Models.GuestDataExtensionResponse>(
      `guests/${guestRef}/extensions/${dataExtensionName}`,
      'PUT',
      extension
    );
    
    return await response.json();
  }

  async deleteGuestDataExtension(guestRef: string, dataExtensionName: string): Promise<void> 
  {
    await this.client.MakeRequest(
        `guests/${guestRef}/extensions/${dataExtensionName}`,
        'DELETE',
        null
    );
  }
}
