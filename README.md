# Sitecore CDP Server

This project is a server application that interacts with the Sitecore Customer Data Platform (CDP) using the Guest REST API. It is built with TypeScript and Express, providing a structured way to manage guest data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Environment Variables](#environment-variables)

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

## Usage

To start the server, run:
```
npm start
```
The server will be running on `http://localhost:3000`.

## API Endpoints

- `GET /api/guests`: Retrieve guest information.
- `POST /api/guests`: Create a new guest.

Refer to the controller methods for more details on request and response formats.

## Testing

To run the tests, use:
```
npm test
```
This will execute both unit and integration tests.

## Environment Variables

Create a `.env` file in the root directory based on the `.env.example` file to configure your environment variables. Make sure to include your API keys and any other necessary configurations.