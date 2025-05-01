import { createMcpServer } from '@vscode/mcp';
import { McpRequest, McpResponse } from '@microsoft/modelcontext';
import { cdpService } from './services/cdpService';
import { logger } from './utils/logger';

async function handleRequest(request: McpRequest): Promise<McpResponse> {
  try {
    logger.info('Received MCP request', { id: request.id, text: request.text });
    
    // Extract any CDP-specific parameters from the request
    // For example, if there are specific parameters in the request.parameters object
    
    // Process the request using the CDP service
    const response = await cdpService.processRequest(request.text);
    
    return {
      id: request.id,
      text: response,
      done: true
    };
  } catch (error) {
    logger.error('Error processing MCP request', { error });
    return {
      id: request.id,
      text: `Error processing your request: ${error.message}`,
      done: true
    };
  }
}

// Create and start the MCP server
const server = createMcpServer({
  name: 'sitecore-cdp-server',
  version: '1.0.0',
  onRequest: handleRequest
});

// Listen for the stream request from VS Code
server.listen();

logger.info('MCP server started and listening for requests');