"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestTools = exports.GuestToolActions = void 0;
exports.GuestToolActions = [
    'CreateGuest',
    'RetrieveGuests',
    'RetrieveGuest',
    'UpdateGuest',
    'PartialUpdateGuest',
    'DeleteGuest',
    'CreateGuestDataExtension',
    'RetrieveGuestDataExtensions',
    'UpdateGuestDataExtension',
    'DeleteGuestDataExtension'
];
exports.GuestTools = [
    {
        name: "CreateGuest",
        description: "Creates a guest.",
        inputSchema: {
            type: "object",
            properties: {
                guestType: {
                    type: "string",
                    enum: ["visitor", "customer"],
                    description: "The level of identity obtained. a visitor is a guest who has not yet provided any identifying information. A customer is a guest who has identity information like email, name etc.",
                },
                city: { type: "string", description: "The guest's city." },
                country: { type: "string", description: "The guest's country." },
                dateOfBirth: { type: "string", description: "The guest's date of birth. Validation: Date must be in the past. Example: 1991-01-01T16:17:16.000Z" },
                email: { type: "string", description: "The email address of the guest." },
                emails: { type: "array", items: { type: "string", description: "All the email addresses of the guest." } },
                firstName: { type: "string", description: "The guest's first name." },
                gender: { type: "string", description: "The guest's gender." },
                href: { type: "string", description: "The URL of the guest." },
                //identifiers: { type: "array", items: { type: "object", description: "A list of identifiers for the guest." } },
                lastName: { type: "string", description: "The guest's last name." },
                nationality: { type: "string", description: "The guest's nationality." },
                passportExpiry: { type: "date", description: "The expiry date of the guest's passport. Example: 2025-01-01T00:00:00.000Z" },
                passportNumber: { type: "string", description: "The passport number of the guest." },
                phoneNumbers: { type: "array", items: { type: "strings" }, description: "The phone numbers of the guest. Example: +353161123345, +353161123346" },
                postCode: { type: "string", description: "The guest's zipcode." },
                state: { type: "string", description: "The state (address) of the guest." },
                street: { type: "string", items: { type: "strings" }, description: "The street address of the guest." },
                title: { type: "string", description: "The title of the guest. Example values: 'Br', 'Brigadier', 'Capt', 'Colonel', 'Dame', 'Dr', 'Elder', 'Fr', 'General', 'Hon', 'Judge', 'Lord', 'Master', 'Miss', 'Mr', 'Mrs', 'Ms', 'Mstr', 'Prof', 'Rabbi', 'Rev', 'Shaikha', 'Sheikh', 'Sir', 'Sister', 'Sr'" },
            },
            required: ["guestType"],
        },
    },
    {
        name: "RetrieveGuests",
        description: "Retrieves multiple guests by their email address or other identifying information. Each result is a search result list.",
        inputSchema: {
            type: "object",
            properties: {
                guestType: {
                    type: "string",
                    enum: ["visitor", "customer"],
                    description: "The level of identity obtained. a visitor is a guest who has not yet provided any identifying information. A customer is a guest who has identity information like email, name etc.",
                },
                city: { type: "string", description: "The guest's city." },
                country: { type: "string", description: "The guest's country." },
                dateOfBirth: { type: "string", description: "The guest's date of birth. Validation: Date must be in the past. Example: 1991-01-01T16:17:16.000Z" },
                email: { type: "string", description: "The email address of the guest." },
                emails: { type: "array", items: { type: "string", description: "All the email addresses of the guest." } },
                firstName: { type: "string", description: "The guest's first name." },
                gender: { type: "string", description: "The guest's gender." },
                href: { type: "string", description: "The URL of the guest." },
                //identifiers: { type: "array", items: { type: "object", description: "A list of identifiers for the guest." } },
                lastName: { type: "string", description: "The guest's last name." },
                nationality: { type: "string", description: "The guest's nationality." },
                passportExpiry: { type: "date", description: "The expiry date of the guest's passport. Example: 2025-01-01T00:00:00.000Z" },
                passportNumber: { type: "string", description: "The passport number of the guest." },
                phoneNumbers: { type: "array", items: { type: "strings" }, description: "The phone numbers of the guest. Example: +353161123345, +353161123346" },
                postCode: { type: "string", description: "The guest's zipcode." },
                state: { type: "string", description: "The state (address) of the guest." },
                street: { type: "string", items: { type: "strings" }, description: "The street address of the guest." },
                title: { type: "string", description: "The title of the guest. Example values: 'Br', 'Brigadier', 'Capt', 'Colonel', 'Dame', 'Dr', 'Elder', 'Fr', 'General', 'Hon', 'Judge', 'Lord', 'Master', 'Miss', 'Mr', 'Mrs', 'Ms', 'Mstr', 'Prof', 'Rabbi', 'Rev', 'Shaikha', 'Sheikh', 'Sir', 'Sister', 'Sr'" },
                offset: { type: "number", description: "Collection responses use offset pagination. The offset query parameter is used to exclude from a response the first N items of the entire resource collection. Default: 0. Example: offset=10" },
                limit: { type: "number", description: "Collection responses use offset pagination. This query parameter lets you adjust the maximum number of collection items to return for a single request. Default: 10. Example: limit=40" },
                expand: { type: "boolean", description: "You can expand items in a collection by setting expand=true. This eliminates the need to send multiple follow-up requests (one for the collection and another for each of its items). This also helps you check if the data you intend to create already exists. Default: false. Example: expand=true" },
                sort: { type: "string", description: "You can sort search results by specifying a sort query parameter and a corresponding sort value (ASC or DESC case sensitive) on a collection resource URL. The example query parameter shows how to return a resource in ascending chronological order of when the resource was created and descending order of the resource label. Example: sort=createdAt::ASC|label::DESC'" },
            },
        },
    },
    {
        name: "RetrieveGuest",
        description: "Retrieves the full guest record of a guest, including any guest data extensions.",
        inputSchema: {
            type: "object",
            properties: {
                guestRef: { type: "string", description: "The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03" },
                expand: { type: "boolean", description: "You can expand items in a collection by setting expand=true. This eliminates the need to send multiple follow-up requests (one for the collection and another for each of its items). This also helps you check if the data you intend to create already exists. Default ''. Example: expand=true" },
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
                guestRef: { type: "string", description: "The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03" },
                city: { type: "string", description: "The guest's city." },
                country: { type: "string", description: "The guest's country." },
                dateOfBirth: { type: "string", description: "The guest's date of birth. Validation: Date must be in the past. Example: 1991-01-01T16:17:16.000Z" },
                emails: { type: "array", items: { type: "string", description: "All the email addresses of the guest." } },
                firstName: { type: "string", description: "The guest's first name." },
                gender: { type: "string", description: "The guest's gender." },
                guestType: {
                    type: "string",
                    enum: ["visitor", "customer"],
                    description: "The level of identity obtained. a visitor is a guest who has not yet provided any identifying information. A customer is a guest who has identity information like email, name etc.",
                },
                //identifiers: { type: "array", items: { type: "object", description: "A list of identifiers for the guest." } },
                lastName: { type: "string", description: "The guest's last name." },
                nationality: { type: "string", description: "The guest's nationality." },
                passportExpiry: { type: "date", description: "The expiry date of the guest's passport. Example: 2025-01-01T00:00:00.000Z" },
                passportNumber: { type: "string", description: "The passport number of the guest." },
                phoneNumbers: { type: "array", items: { type: "strings" }, description: "The phone numbers of the guest. Example: +353161123345, +353161123346" },
                postCode: { type: "string", description: "The guest's zipcode." },
                state: { type: "string", description: "The state (address) of the guest." },
                street: { type: "string", items: { type: "strings" }, description: "The street address of the guest." },
                title: { type: "string", description: "The title of the guest. Example values: 'Br', 'Brigadier', 'Capt', 'Colonel', 'Dame', 'Dr', 'Elder', 'Fr', 'General', 'Hon', 'Judge', 'Lord', 'Master', 'Miss', 'Mr', 'Mrs', 'Ms', 'Mstr', 'Prof', 'Rabbi', 'Rev', 'Shaikha', 'Sheikh', 'Sir', 'Sister', 'Sr'" },
            },
            required: ["guestRef"],
        },
    },
    {
        name: "PartialUpdateGuest",
        description: "Partially updates a guest, replacing only the properties that are provided.",
        inputSchema: {
            type: "object",
            properties: {
                guestRef: { type: "string", description: "The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03" },
                city: { type: "string", description: "The guest's city." },
                country: { type: "string", description: "The guest's country." },
                dateOfBirth: { type: "string", description: "The guest's date of birth. Validation: Date must be in the past. Example: 1991-01-01T16:17:16.000Z" },
                emails: { type: "array", items: { type: "string", description: "All the email addresses of the guest." } },
                firstName: { type: "string", description: "The guest's first name." },
                gender: { type: "string", description: "The guest's gender." },
                guestType: {
                    type: "string",
                    enum: ["visitor", "customer"],
                    description: "The level of identity obtained. a visitor is a guest who has not yet provided any identifying information. A customer is a guest who has identity information like email, name etc.",
                },
                //identifiers: { type: "array", items: { type: "object", description: "A list of identifiers for the guest." } },
                lastName: { type: "string", description: "The guest's last name." },
                nationality: { type: "string", description: "The guest's nationality." },
                passportExpiry: { type: "date", description: "The expiry date of the guest's passport. Example: 2025-01-01T00:00:00.000Z" },
                passportNumber: { type: "string", description: "The passport number of the guest." },
                phoneNumbers: { type: "array", items: { type: "strings" }, description: "The phone numbers of the guest. Example: +353161123345, +353161123346" },
                postCode: { type: "string", description: "The guest's zipcode." },
                state: { type: "string", description: "The state (address) of the guest." },
                street: { type: "string", items: { type: "strings" }, description: "The street address of the guest." },
                title: { type: "string", description: "The title of the guest. Example values: 'Br', 'Brigadier', 'Capt', 'Colonel', 'Dame', 'Dr', 'Elder', 'Fr', 'General', 'Hon', 'Judge', 'Lord', 'Master', 'Miss', 'Mr', 'Mrs', 'Ms', 'Mstr', 'Prof', 'Rabbi', 'Rev', 'Shaikha', 'Sheikh', 'Sir', 'Sister', 'Sr'" },
            },
            required: ["guestRef"],
        },
    },
    {
        name: "DeleteGuest",
        description: "Deletes a guest record and all associated entities.",
        inputSchema: {
            type: "object",
            properties: {
                guestRef: { type: "string", description: "The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03" },
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
                guestRef: { type: "string", description: "The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03" },
                extension: { type: "object", description: "The first property is 'name' which is an enumeration string and is required. The values for 'name' would be 'ext', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5'. 'ext3', 'ext4', or 'ext5'. Any additional properties may be string or boolean or integer or number to create a key-value pair. Example: 'vipMember': true or 'loyaltyTier': 'level2'" },
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
                guestRef: { type: "string", description: "The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03" },
                offset: { type: "number", description: "Collection responses use offset pagination. The offset query parameter is used to exclude from a response the first N items of the entire resource collection. Default: 0. Example: offset=10" },
                limit: { type: "number", description: "Collection responses use offset pagination. This query parameter lets you adjust the maximum number of collection items to return for a single request. Default: 10. Example: limit=40" },
                expand: { type: "boolean", description: "You can expand items in a collection by setting expand=true. This eliminates the need to send multiple follow-up requests (one for the collection and another for each of its items). This also helps you check if the data you intend to create already exists. Default: false. Example: expand=true" },
            },
            required: ["guestRef"],
        },
    },
    {
        name: "RetrieveGuestDataExtensionsByName",
        description: "Retrieves all guest data extensions for a guest.",
        inputSchema: {
            type: "object",
            properties: {
                guestRef: { type: "string", description: "The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03" },
                dataExtensionName: {
                    type: "string",
                    enum: ["ext", "ext1", "ext2", "ext3", "ext4", "ext5"],
                    description: "The name of the data extension."
                },
                offset: { type: "number", description: "Collection responses use offset pagination. The offset query parameter is used to exclude from a response the first N items of the entire resource collection. Default: 0. Example: offset=10" },
                limit: { type: "number", description: "Collection responses use offset pagination. This query parameter lets you adjust the maximum number of collection items to return for a single request. Default: 10. Example: limit=40" },
                expand: { type: "boolean", description: "You can expand items in a collection by setting expand=true. This eliminates the need to send multiple follow-up requests (one for the collection and another for each of its items). This also helps you check if the data you intend to create already exists. Default: false. Example: expand=true" },
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
                guestRef: { type: "string", description: "The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03" },
                dataExtensionName: {
                    type: "string",
                    enum: ["ext", "ext1", "ext2", "ext3", "ext4", "ext5"],
                    description: "The name of the data extension."
                },
                extension: { type: "object", description: "The first property is 'name' which is an enumeration string and is required. The values for 'name' would be 'ext', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5'. 'ext3', 'ext4', or 'ext5'. Any additional properties may be string or boolean or integer or number to create a key-value pair. Example: 'vipMember': true or 'loyaltyTier': 'level2'" },
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
                guestRef: { type: "string", description: "The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03" },
                dataExtensionName: {
                    type: "string",
                    enum: ["ext", "ext1", "ext2", "ext3", "ext4", "ext5"],
                    description: "The name of the data extension."
                },
            },
            required: ["guestRef", "dataExtensionName"],
        },
    },
];
