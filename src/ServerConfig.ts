import dotenv from 'dotenv';

dotenv.config();

export const ServerConfig = {
  cdpEndpointUrl: process.env.SITECORE_CDP_ENDPOINT_URL || 'https://api-engage-us.sitecorecloud.io/',
  cdpClientKey: process.env.SITECORE_CDP_CLIENT_KEY || '',
  cdpApiToken: process.env.SITECORE_CDP_API_TOKEN || '',
  port: parseInt(process.env.PORT || '3000'),
  timeout: parseInt(process.env.TIMEOUT || '5000'),
  environment: process.env.NODE_ENV || 'development',
  guestApiVersion: "2.1",
  audienceExportApiVersion: "2",
  orderApiVersion: "2.1",
};