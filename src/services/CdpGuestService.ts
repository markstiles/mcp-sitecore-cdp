import { CdpClient } from '../client/CdpClient';
import * as Models from '../models/Guest';
import express, { Router, Request, Response } from 'express';

export class CdpGuestService {
  private client: CdpClient;

  constructor() {
    this.client = new CdpClient();
  }

  // Guest Endpoints
  async createGuest(request: Request): Promise<Models.GuestCreateResponse> 
  {
    const guest = request.params.arguments as Partial<Models.Guest>;

    const response = await this.client.MakeRequest<Models.GuestCreateResponse>(
        '/v2.1/guests', 
        'POST', 
        guest);
    return response.data;
  }

  async retrieveGuests(request: Request): Promise<Models.RetrieveGuestsResponse> {
        
    const queryParams = JSON.parse(request.params.arguments) as Record<string, string>;

    const response = await this.client.MakeRequest<Models.RetrieveGuestsResponse>(
        '/v2.1/guests', 
        'GET',
        { params: queryParams }
    );
    return response.data;
  }

  async retrieveGuest(request: Request): Promise<Models.GuestCreateResponse> {

    const guestRef = request.params.arguments as string;

    const response = await this.client.MakeRequest<Models.GuestCreateResponse>(
        `/v2.1/guests/${guestRef}`,
        'GET',
        null);
    return response.data;
  }

  async updateGuest(request: Request): Promise<Models.GuestCreateResponse> {

    const guestRef = request.params.arguments as string;
    const guest = request.params.arguments as Partial<Models.Guest>;

    const response = await this.client.MakeRequest<Models.GuestCreateResponse>(
        `/v2.1/guests/${guestRef}`, 
        'PUT',
        guest);
    return response.data;
  }

  async deleteGuest(request: Request): Promise<void> {

    const guestRef = request.params.arguments as string;

    await this.client.MakeRequest(
        `/v2.1/guests/${guestRef}`,
        'DELETE',
        null);
  }

  // Guest Data Extension Endpoints
  async createGuestDataExtension(request: Request): Promise<Models.GuestDataExtensionResponse> {

    const guestRef = request.params.arguments as string;
    const extension = JSON.parse(request.params.arguments) as Partial<Models.GuestDataExtension>

    const response = await this.client.MakeRequest<Models.GuestDataExtensionResponse>(
        `/v2.1/guests/${guestRef}/extensions`, 
        'POST',
        extension);
    return response.data;
  }

  async retrieveGuestDataExtensions(request: Request): Promise<Models.GuestDataExtensionResponse[]> {

    const guestRef = request.params.arguments as string;

    const response = await this.client.MakeRequest<Models.GuestDataExtensionResponse[]>(
        `/v2.1/guests/${guestRef}/extensions`,
        'GET',
        null);
    return response.data;
  }

  async updateGuestDataExtension(request: Request
  ): Promise<Models.GuestDataExtensionResponse> {

    const guestRef = request.params.arguments as string;
    const dataExtensionName = request.params.arguments as string;
    const extension = JSON.parse(request.params.arguments) as Partial<Models.GuestDataExtension>

    const response = await this.client.MakeRequest<Models.GuestDataExtensionResponse>(
      `/v2.1/guests/${guestRef}/extensions/${dataExtensionName}`,
      'PUT',
      extension
    );
    return response.data;
  }

  async deleteGuestDataExtension(request: Request): Promise<void> {

    /*
    const args = request.params.arguments as {
        instrument: string;
        bar?: string;
        limit?: number;
    }

    if (!args.instrument) {
        throw new McpError(
        ErrorCode.InvalidParams,
        'Missing required parameter: instrument'
        );
    }
    */
   
    const guestRef = request.params.arguments as string;
    const dataExtensionName = request.params.arguments as string;

    await this.client.MakeRequest(
        `/v2.1/guests/${guestRef}/extensions/${dataExtensionName}`,
        'DELETE',
        null
    );
  }
}
