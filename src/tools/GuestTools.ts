export const GuestToolActions = [
    'CreateGuest', 
    'RetrieveGuests', 
    'RetrieveGuest', 
    'UpdateGuest', 
    'DeleteGuest', 
    'CreateGuestDataExtension', 
    'RetrieveGuestDataExtensions', 
    'UpdateGuestDataExtension', 
    'DeleteGuestDataExtension'
];

export const GuestTools = [
    {
        name: "CreateGuest",
        description: "Creates a guest.",
        inputSchema: {
            type: "object",
            properties: {
            requestBody: { type: "object" },
            },
            required: ["requestBody"],
        },
    },
    {
        name: "RetrieveGuests",
        description: "Retrieves multiple guests by their email address or other identifying information. Each result is a search result list. Offset is a number that determines is how many results to skip. Limit is a number that sets the number of results to retrieve. Expand is a boolean that indicates whether to expand to retrieve guests with all their key-value pairs listed. Sort is a comma separated list of key value pairs which are separated by double colons (prop1::value1,prop2::value2) that indicates how to sort the results. The value in the key value pair is either ASC for ascending or DESC for descending.",
        inputSchema: {
            type: "object",
            properties: {
                offset: { type: "number" },
                limit: { type: "number" },
                expand: { type: "boolean" },
                sort: { type: "string" },
            },
        },
    },
    {
        name: "RetrieveGuest",
        description: "Retrieves the full guest record of a guest, including any guest data extensions.",
        inputSchema: {
            type: "object",
            properties: {
                guestRef: { type: "string" },
                expand: { type: "array", items: { type: "string" } },
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
                guestRef: { type: "string" },
                requestBody: { type: "object" },
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
                guestRef: { type: "string" },
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
                guestRef: { type: "string" },
                extension: { type: "object" },
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
                guestRef: { type: "string" },
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
                guestRef: { type: "string" },
                dataExtensionName: { type: "string" },
                extension: { type: "object" },
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
                guestRef: { type: "string" },
                dataExtensionName: { type: "string" },
            },
            required: ["guestRef", "dataExtensionName"],
        },
    },
];