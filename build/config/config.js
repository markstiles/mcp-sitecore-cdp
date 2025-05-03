"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    cdpEndpointUrl: process.env.SITECORE_CDP_ENDPOINT_URL || 'https://api-engage-us.sitecorecloud.io/v2.1/',
    cdpClientKey: process.env.SITECORE_CDP_CLIENT_KEY || '',
    cdpApiToken: process.env.SITECORE_CDP_API_TOKEN || '',
    port: parseInt(process.env.PORT || '3000'),
    timeout: parseInt(process.env.TIMEOUT || '5000'),
    environment: process.env.NODE_ENV || 'development',
};
