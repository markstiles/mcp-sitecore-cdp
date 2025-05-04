"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGuest = void 0;
const CdpClient_1 = require("../../client/CdpClient");
const zod_1 = require("zod");
class CreateGuest {
    async AddTool(server) {
        server.tool(
        //name
        "CreateGuest", 
        //description
        "Creates a guest in Sitecore CDP using the Guest API.", 
        //paramsSchema
        {
            guestType: zod_1.z.string().describe("The level of identity obtained. Valid values are 'visitor', and 'customer'. A visitor is a guest who has not yet provided any identifying information. A customer is a guest who has identity information like email, name etc."),
            city: zod_1.z.string().nullable().describe("The guest's city."),
            country: zod_1.z.string().nullable().describe("The guest's country."),
            dateOfBirth: zod_1.z.date().nullable().describe("The guest's date of birth. Validation: Date must be in the past. Example: 1991-01-01T16:17:16.000Z"),
            email: zod_1.z.string().nullable().describe("The email address of the guest."),
            emails: zod_1.z.array(zod_1.z.string()).nullable().describe("All the email addresses of the guest."),
            firstName: zod_1.z.string().nullable().describe("The guest's first name."),
            gender: zod_1.z.string().nullable().describe("The guest's gender."),
            href: zod_1.z.string().nullable().describe("The URL of the guest."),
            identifiers: zod_1.z.array(zod_1.z.object({
                id: zod_1.z.string().describe("The identifier ID. Example: 'B7524AE6-CF1C-440F-B1A2-0C9D42F5CB41'"),
                provider: zod_1.z.string().describe("The identifier provider. Example: 'ProfileSystem'"),
                expiryDate: zod_1.z.string().describe("The expiry date of the identifier in ISO Format. Example: '2025-01-01T16:17:16.000Z'"),
            })).nullable().describe("A list of identifiers for the guest."),
            lastName: zod_1.z.string().nullable().describe("The guest's last name."),
            nationality: zod_1.z.string().nullable().describe("The guest's nationality."),
            passportExpiry: zod_1.z.date().nullable().describe("The expiry date of the guest's passport. Example: 2025-01-01T00:00:00.000Z"),
            passportNumber: zod_1.z.string().nullable().describe("The passport number of the guest."),
            phoneNumbers: zod_1.z.array(zod_1.z.string()).nullable().describe("The phone numbers of the guest. Example: +353161123345, +353161123346"),
            postCode: zod_1.z.string().nullable().describe("The guest's zipcode."),
            state: zod_1.z.string().nullable().describe("The state (address) of the guest."),
            street: zod_1.z.array(zod_1.z.string()).nullable().describe("The street address of the guest."),
            title: zod_1.z.string().nullable().describe("The title of the guest. Example values: 'Br', 'Brigadier', 'Capt', 'Colonel', 'Dame', 'Dr', 'Elder', 'Fr', 'General', 'Hon', 'Judge', 'Lord', 'Master', 'Miss', 'Mr', 'Mrs', 'Ms', 'Mstr', 'Prof', 'Rabbi', 'Rev', 'Shaikha', 'Sheikh', 'Sir', 'Sister', 'Sr'"),
        }, 
        //annotations
        {
            title: "Create a Guest in Sitecore CDP", // Human-readable title for the tool
            readOnlyHint: false, // If true, the tool does not modify its environment
            destructiveHint: false, // If true, the tool may perform destructive updates
            idempotentHint: false, // If true, repeated calls with same args have no additional effect
            openWorldHint: true, // If true, tool interacts with external entities
        }, 
        //callback
        async ({ guestType, city, country, dateOfBirth, email, emails, firstName, gender, href, identifiers, lastName, nationality, passportExpiry, passportNumber, phoneNumbers, postCode, state, street, title }) => {
            const guest = {};
            if (guestType)
                guest.guestType = guestType;
            if (city)
                guest.city = city;
            if (country)
                guest.country = country;
            if (dateOfBirth)
                guest.dateOfBirth = dateOfBirth.toISOString();
            if (email)
                guest.email = email;
            if (emails)
                guest.emails = emails;
            if (firstName)
                guest.firstName = firstName;
            if (gender)
                guest.gender = gender;
            if (href)
                guest.href = href;
            if (identifiers)
                guest.identifiers = identifiers;
            if (lastName)
                guest.lastName = lastName;
            if (nationality)
                guest.nationality = nationality;
            if (passportExpiry)
                guest.passportExpiry = passportExpiry.toISOString();
            if (passportNumber)
                guest.passportNumber = passportNumber;
            if (phoneNumbers)
                guest.phoneNumbers = phoneNumbers;
            if (postCode)
                guest.postCode = postCode;
            if (state)
                guest.state = state;
            if (street)
                guest.street = street;
            if (title)
                guest.title = title;
            const response = await new CdpClient_1.CdpClient().MakeRequest('guests', 'POST', guest);
            const json = await response.json();
            return {
                content: [json]
            };
        });
    }
}
exports.CreateGuest = CreateGuest;
