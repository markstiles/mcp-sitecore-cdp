"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGuest = void 0;
const CdpClient_1 = require("../../client/CdpClient");
const zod_1 = require("zod");
class UpdateGuest {
    async AddTool(server) {
        server.tool(
        //name
        "UpdateGuest", 
        //description
        "Fully updates a guest, replacing the entire resource in Sitecore CDP using the Guest API.", 
        //paramsSchema
        {
            guestRef: zod_1.z.string().describe("The guest reference. This is a unique identifier of the guest record. If you don't know the guest reference, first retrieve guests. Example: f7aabbca-1c1b-4fc2-be72-3e16294a4f03"),
            city: zod_1.z.string().describe("The guest's city."),
            country: zod_1.z.string().describe("The guest's country."),
            dateOfBirth: zod_1.z.date().describe("The guest's date of birth. Validation: Date must be in the past. Example: 1991-01-01T16:17:16.000Z"),
            email: zod_1.z.string().describe("The email address of the guest."),
            emails: zod_1.z.array(zod_1.z.string()).describe("All the email addresses of the guest."),
            firstName: zod_1.z.string().describe("The guest's first name."),
            gender: zod_1.z.string().describe("The guest's gender."),
            guestType: zod_1.z.string().describe("The level of identity obtained. Valid values are 'visitor', and 'customer'. A visitor is a guest who has not yet provided any identifying information. A customer is a guest who has identity information like email, name etc."),
            //guestType: z.enum(["visitor", "customer"])
            identifiers: zod_1.z.array(zod_1.z.object({
                id: zod_1.z.string().describe("The identifier ID. Example: 'B7524AE6-CF1C-440F-B1A2-0C9D42F5CB41'"),
                provider: zod_1.z.string().describe("The identifier provider. Example: 'ProfileSystem'"),
                expiryDate: zod_1.z.string().describe("The expiry date of the identifier in ISO Format. Example: '2025-01-01T16:17:16.000Z'"),
            })).describe("A list of identifiers for the guest."),
            lastName: zod_1.z.string().describe("The guest's last name."),
            nationality: zod_1.z.string().describe("The guest's nationality."),
            passportExpiry: zod_1.z.date().describe("The expiry date of the guest's passport. Example: 2025-01-01T00:00:00.000Z"),
            passportNumber: zod_1.z.string().describe("The passport number of the guest."),
            phoneNumbers: zod_1.z.array(zod_1.z.string()).describe("The phone numbers of the guest. Example: +353161123345, +353161123346"),
            postCode: zod_1.z.string().describe("The guest's zipcode."),
            state: zod_1.z.string().describe("The state (address) of the guest."),
            street: zod_1.z.array(zod_1.z.string()).describe("The street address of the guest."),
            title: zod_1.z.string().describe("The title of the guest. Example values: 'Br', 'Brigadier', 'Capt', 'Colonel', 'Dame', 'Dr', 'Elder', 'Fr', 'General', 'Hon', 'Judge', 'Lord', 'Master', 'Miss', 'Mr', 'Mrs', 'Ms', 'Mstr', 'Prof', 'Rabbi', 'Rev', 'Shaikha', 'Sheikh', 'Sir', 'Sister', 'Sr'"),
        }, 
        //annotations
        {
            title: "Updates a single Guest in Sitecore CDP", // Human-readable title for the tool
            readOnlyHint: false, // If true, the tool does not modify its environment
            destructiveHint: false, // If true, the tool may perform destructive updates
            idempotentHint: false, // If true, repeated calls with same args have no additional effect
            openWorldHint: true, // If true, tool interacts with external entities
        }, 
        //callback
        async ({ guestRef, city, country, dateOfBirth, email, emails, firstName, gender, guestType, identifiers, lastName, nationality, passportExpiry, passportNumber, phoneNumbers, postCode, state, street, title }) => {
            const guest = {
                guestType: guestType,
                city: city,
                country: country,
                dateOfBirth: dateOfBirth.toISOString(),
                email: email,
                emails: emails,
                firstName: firstName,
                gender: gender,
                identifiers: identifiers,
                lastName: lastName,
                nationality: nationality,
                passportExpiry: passportExpiry.toISOString(),
                passportNumber: passportNumber,
                phoneNumbers: phoneNumbers,
                postCode: postCode,
                state: state,
                street: street,
                title: title,
            };
            const response = await new CdpClient_1.CdpClient().MakeRequest(`guests/${guestRef}`, 'PUT', guest);
            const json = await response.json();
            return {
                content: [json]
            };
        });
    }
}
exports.UpdateGuest = UpdateGuest;
