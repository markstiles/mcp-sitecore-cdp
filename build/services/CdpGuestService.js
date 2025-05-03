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
        const response = await this.client.MakeRequest('guests', 'POST', guest);
        return response.data;
    }
    async retrieveGuests(offset, limit, expand, sort) {
        if (sort) {
            sort = `&sort=${sort}`;
        }
        const response = await this.client.MakeRequest(`guests?offset=${offset}&limit=${limit}&expand=${expand}${sort}`, 'GET', null);
        return await response.json();
    }
    async retrieveGuest(guestRef) {
        const response = await this.client.MakeRequest(`guests/${guestRef}`, 'GET', null);
        return await response.json();
    }
    async updateGuest(guestRef, guest) {
        const response = await this.client.MakeRequest(`guests/${guestRef}`, 'PUT', guest);
        return await response.json();
    }
    async deleteGuest(guestRef) {
        await this.client.MakeRequest(`guests/${guestRef}`, 'DELETE', null);
    }
    // Guest Data Extension Endpoints
    async createGuestDataExtension(guestRef, extension) {
        const response = await this.client.MakeRequest(`guests/${guestRef}/extensions`, 'POST', extension);
        return await response.json();
    }
    async retrieveGuestDataExtensions(guestRef) {
        const response = await this.client.MakeRequest(`guests/${guestRef}/extensions`, 'GET', null);
        return await response.json();
    }
    async updateGuestDataExtension(guestRef, dataExtensionName, extension) {
        const response = await this.client.MakeRequest(`guests/${guestRef}/extensions/${dataExtensionName}`, 'PUT', extension);
        return await response.json();
    }
    async deleteGuestDataExtension(guestRef, dataExtensionName) {
        await this.client.MakeRequest(`guests/${guestRef}/extensions/${dataExtensionName}`, 'DELETE', null);
    }
}
exports.CdpGuestService = CdpGuestService;
