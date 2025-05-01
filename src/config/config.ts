import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000'),
  cdpApiUrl: process.env.SITECORE_CDP_URL || 'https://api.sitecore.com/cdp/api/v1',
  cdpApiKey: process.env.SITECORE_CDP_CLIENT_KEY || '',
  cdpClientKey: process.env.SITECORE_CDP_API_TOKEN || '',
  timeout: parseInt(process.env.TIMEOUT || '5000'),
  environment: process.env.NODE_ENV || 'development',
  // MCP related configuration
  mcpEnabled: process.env.MCP_ENABLED === 'true' || false,
  mcpLogging: process.env.MCP_LOGGING === 'true' || true,
};