"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestTools = void 0;
exports.GuestTools = [
    {
        name: "CreateGuest",
        description: "Creates a guest.",
        inputSchema: {
            type: "object",
            properties: {
                requestBody: {
                    type: "object",
                    schemaRef: "#/components/schemas/GuestCreate",
                },
            },
            required: ["requestBody"],
        },
    },
    {
        name: "RetrieveGuests",
        description: "Retrieves guests by their email address or other identifying information.",
        inputSchema: {
            type: "object",
            properties: {
                offset: {
                    type: "string",
                    schemaRef: "#/components/schemas/Offset",
                    default: "0",
                },
                limit: {
                    type: "string",
                    schemaRef: "#/components/schemas/Limit",
                    default: "10",
                },
                expand: {
                    type: "string",
                    schemaRef: "#/components/schemas/Expand",
                    default: "false",
                },
                sort: {
                    type: "string",
                    description: "Sort results by specified criteria.",
                },
            },
        },
    },
    {
        name: "RetrieveGuest",
        description: "Retrieves the full guest record of a guest, including any guest data extensions.",
        inputSchema: {
            type: "object",
            properties: {
                guestRef: {
                    type: "string",
                    description: "The guest reference.",
                },
                expand: {
                    type: "array",
                    description: "Expand items in a collection.",
                },
            },
            required: ["guestRef"],
        },
    },
    {
        name: "UpdateGuest",
        description: "Fully updates a guest, replacing the entire resource.",
        inputSchema: {
            type: "object",
            properties: {
                guestRef: {
                    type: "string",
                    description: "The guest reference.",
                },
                requestBody: {
                    type: "object",
                    schemaRef: "#/components/schemas/GuestUpdateRequest",
                },
            },
            required: ["guestRef", "requestBody"],
        },
    },
    {
        name: "DeleteGuest",
        description: "Deletes a guest record and all associated entities.",
        inputSchema: {
            type: "object",
            properties: {
                guestRef: {
                    type: "string",
                    description: "The guest reference.",
                },
            },
            required: ["guestRef"],
        },
    },
    {
        name: "CreateGuestDataExtension",
        description: "Creates a guest data extension.",
        inputSchema: {
            type: "object",
            properties: {
                guestRef: {
                    type: "string",
                    description: "The guest reference.",
                },
                extension: {
                    type: "object",
                    schemaRef: "#/components/schemas/GuestDataExtension",
                },
            },
            required: ["guestRef", "extension"],
        },
    },
    {
        name: "RetrieveGuestDataExtensions",
        description: "Retrieves all guest data extensions for a guest.",
        inputSchema: {
            type: "object",
            properties: {
                guestRef: {
                    type: "string",
                    description: "The guest reference.",
                },
            },
            required: ["guestRef"],
        },
    },
    {
        name: "UpdateGuestDataExtension",
        description: "Updates a specific guest data extension.",
        inputSchema: {
            type: "object",
            properties: {
                guestRef: {
                    type: "string",
                    description: "The guest reference.",
                },
                dataExtensionName: {
                    type: "string",
                    description: "The name of the data extension.",
                },
                extension: {
                    type: "object",
                    schemaRef: "#/components/schemas/GuestDataExtension",
                },
            },
            required: ["guestRef", "dataExtensionName", "extension"],
        },
    },
    {
        name: "DeleteGuestDataExtension",
        description: "Deletes a specific guest data extension.",
        inputSchema: {
            type: "object",
            properties: {
                guestRef: {
                    type: "string",
                    description: "The guest reference.",
                },
                dataExtensionName: {
                    type: "string",
                    description: "The name of the data extension.",
                },
            },
            required: ["guestRef", "dataExtensionName"],
        },
    },
];
