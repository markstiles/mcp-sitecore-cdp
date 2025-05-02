"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdpGuestService = void 0;
const CdpClient_1 = require("../client/CdpClient");
class CdpGuestService {
    client;
    constructor() {
        this.client = new CdpClient_1.CdpClient();
    }
    // Guest Endpoints
    async createGuest(guest) {
        const response = await this.client.MakeRequest('/v2.1/guests', 'POST', guest);
        return response.data;
    }
    async retrieveGuests(queryParams) {
        const response = await this.client.MakeRequest('/v2.1/guests', 'GET', { params: queryParams });
        return response.data;
    }
    async retrieveGuest(guestRef) {
        const response = await this.client.MakeRequest(`/v2.1/guests/${guestRef}`, 'GET', null);
        return response.data;
    }
    async updateGuest(guestRef, guest) {
        const response = await this.client.MakeRequest(`/v2.1/guests/${guestRef}`, 'PUT', guest);
        return response.data;
    }
    async deleteGuest(guestRef) {
        await this.client.MakeRequest(`/v2.1/guests/${guestRef}`, 'DELETE', null);
    }
    // Guest Data Extension Endpoints
    async createGuestDataExtension(guestRef, extension) {
        const response = await this.client.MakeRequest(`/v2.1/guests/${guestRef}/extensions`, 'POST', extension);
        return response.data;
    }
    async retrieveGuestDataExtensions(guestRef) {
        const response = await this.client.MakeRequest(`/v2.1/guests/${guestRef}/extensions`, 'GET', null);
        return response.data;
    }
    async updateGuestDataExtension(guestRef, dataExtensionName, extension) {
        const response = await this.client.MakeRequest(`/v2.1/guests/${guestRef}/extensions/${dataExtensionName}`, 'PUT', extension);
        return response.data;
    }
    async deleteGuestDataExtension(guestRef, dataExtensionName) {
        await this.client.MakeRequest(`/v2.1/guests/${guestRef}/extensions/${dataExtensionName}`, 'DELETE', null);
    }
}
exports.CdpGuestService = CdpGuestService;
