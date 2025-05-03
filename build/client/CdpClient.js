"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdpClient = void 0;
const config_1 = require("../config/config");
class CdpClient {
    headers;
    baseUrl = config_1.config.cdpEndpointUrl;
    constructor() {
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Authorization", `Basic ${btoa(`${config_1.config.cdpClientKey}:${config_1.config.cdpApiToken}`)}`);
    }
    async MakeRequest(url, method, body) {
        try {
            const response = await fetch(this.baseUrl + url, {
                method: method,
                headers: this.headers,
                body: body
            });
            return response;
        }
        catch (error) {
            console.error(error);
            return { ok: false, error: error || 'Unknown error' };
        }
    }
}
exports.CdpClient = CdpClient;
