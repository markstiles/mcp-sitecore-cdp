# Sitecore CDP Server

This project is a server application that interacts with the Sitecore Customer Data Platform (CDP) using the Guest REST API. It is built with TypeScript and Express, providing a structured way to manage guest data.

## Table of Contents

- [Installation](#installation)
- [Build the Project](#build-the-project)
- [Environment Variables](#environment-variables)
- [MCP Configuration](#mcp-configuration)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd sitecore-cdp-server
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Build the Project

Compile the TypeScript code:

```
npx tsc
```

(Optional) Manually Run the Server

```
node build/CdpServer.js
```

## Environment Variables

Create a `.env` file in the root directory based on the `.env.example` file to configure your environment variables. Make sure to include your API keys and any other necessary configurations.

## MCP Configuration

```
"sc-cdp": {
	"command": "node",
	"args": ["Path/To/build/CdpServer.js"]
},
```