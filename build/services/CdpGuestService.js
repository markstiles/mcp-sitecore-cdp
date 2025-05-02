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
    async createGuest(request) {
        const guest = request.params.arguments;
        const response = await this.client.MakeRequest('/v2.1/guests', 'POST', guest);
        return response.data;
    }
    async retrieveGuests(request) {
        const queryParams = JSON.parse(request.params.arguments);
        const response = await this.client.MakeRequest('/v2.1/guests', 'GET', { params: queryParams });
        return response.data;
    }
    async retrieveGuest(request) {
        const guestRef = request.params.arguments;
        const response = await this.client.MakeRequest(`/v2.1/guests/${guestRef}`, 'GET', null);
        return response.data;
    }
    async updateGuest(request) {
        const guestRef = request.params.arguments;
        const guest = request.params.arguments;
        const response = await this.client.MakeRequest(`/v2.1/guests/${guestRef}`, 'PUT', guest);
        return response.data;
    }
    async deleteGuest(request) {
        const guestRef = request.params.arguments;
        await this.client.MakeRequest(`/v2.1/guests/${guestRef}`, 'DELETE', null);
    }
    // Guest Data Extension Endpoints
    async createGuestDataExtension(request) {
        const guestRef = request.params.arguments;
        const extension = JSON.parse(request.params.arguments);
        const response = await this.client.MakeRequest(`/v2.1/guests/${guestRef}/extensions`, 'POST', extension);
        return response.data;
    }
    async retrieveGuestDataExtensions(request) {
        const guestRef = request.params.arguments;
        const response = await this.client.MakeRequest(`/v2.1/guests/${guestRef}/extensions`, 'GET', null);
        return response.data;
    }
    async updateGuestDataExtension(request) {
        const guestRef = request.params.arguments;
        const dataExtensionName = request.params.arguments;
        const extension = JSON.parse(request.params.arguments);
        const response = await this.client.MakeRequest(`/v2.1/guests/${guestRef}/extensions/${dataExtensionName}`, 'PUT', extension);
        return response.data;
    }
    async deleteGuestDataExtension(request) {
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
        const guestRef = request.params.arguments;
        const dataExtensionName = request.params.arguments;
        await this.client.MakeRequest(`/v2.1/guests/${guestRef}/extensions/${dataExtensionName}`, 'DELETE', null);
    }
}
exports.CdpGuestService = CdpGuestService;
