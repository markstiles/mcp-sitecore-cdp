import { CdpClient } from '../client/CdpClient';
import * as Models from '../models/Guest';
import express, { Router, Request, Response } from 'express';

export class CdpGuestService {
  private client: CdpClient;

  constructor() {
    this.client = new CdpClient();
  }

  // Guest Endpoints
  async createGuest(guest: Partial<Models.Guest>): Promise<Models.GuestCreateResponse> 
  {
    const response = await this.client.MakeRequest<Models.GuestCreateResponse>(
        '/v2.1/guests', 
        'POST', 
        guest);
    return response.data;
  }

  async retrieveGuests(queryParams: Record<string, string>): Promise<Models.RetrieveGuestsResponse> 
  {    
    const response = await this.client.MakeRequest<Models.RetrieveGuestsResponse>(
        '/v2.1/guests', 
        'GET',
        { params: queryParams }
    );
    return response.data;
  }

  async retrieveGuest(guestRef: string): Promise<Models.GuestCreateResponse> 
  {
    const response = await this.client.MakeRequest<Models.GuestCreateResponse>(
        `/v2.1/guests/${guestRef}`,
        'GET',
        null);
    return response.data;
  }

  async updateGuest(guestRef: string,  guest: Partial<Models.Guest>): Promise<Models.GuestCreateResponse> 
  {
    const response = await this.client.MakeRequest<Models.GuestCreateResponse>(
        `/v2.1/guests/${guestRef}`, 
        'PUT',
        guest);
    return response.data;
  }

  async deleteGuest(guestRef: string): Promise<void> 
  {
    await this.client.MakeRequest(
        `/v2.1/guests/${guestRef}`,
        'DELETE',
        null);
  }

  // Guest Data Extension Endpoints
  async createGuestDataExtension(guestRef: string, extension: Partial<Models.GuestDataExtension>): Promise<Models.GuestDataExtensionResponse> 
  {
    const response = await this.client.MakeRequest<Models.GuestDataExtensionResponse>(
        `/v2.1/guests/${guestRef}/extensions`, 
        'POST',
        extension);
    return response.data;
  }

  async retrieveGuestDataExtensions(guestRef: string): Promise<Models.GuestDataExtensionResponse[]> 
  {
    const response = await this.client.MakeRequest<Models.GuestDataExtensionResponse[]>(
        `/v2.1/guests/${guestRef}/extensions`,
        'GET',
        null);
    return response.data;
  }

  async updateGuestDataExtension(
    guestRef: string, 
    dataExtensionName: string, 
    extension: Partial<Models.GuestDataExtension>
  ): Promise<Models.GuestDataExtensionResponse> 
  {
    const response = await this.client.MakeRequest<Models.GuestDataExtensionResponse>(
      `/v2.1/guests/${guestRef}/extensions/${dataExtensionName}`,
      'PUT',
      extension
    );
    return response.data;
  }

  async deleteGuestDataExtension(guestRef: string, dataExtensionName: string): Promise<void> 
  {
    await this.client.MakeRequest(
        `/v2.1/guests/${guestRef}/extensions/${dataExtensionName}`,
        'DELETE',
        null
    );
  }
}
