import dotenv from 'dotenv';

dotenv.config();

export const config = {
  cdpEndpointUrl: process.env.SITECORE_CDP_ENDPOINT_URL || 'https://api-engage-us.sitecorecloud.io/v2.1/',
  cdpClientKey: process.env.SITECORE_CDP_CLIENT_KEY || '',
  cdpApiToken: process.env.SITECORE_CDP_API_TOKEN || '',
  port: parseInt(process.env.PORT || '3000'),
  timeout: parseInt(process.env.TIMEOUT || '5000'),
  environment: process.env.NODE_ENV || 'development',
};