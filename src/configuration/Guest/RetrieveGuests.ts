import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CdpClient } from '../../client/CdpClient';
import * as Models from './Models';
import { z } from "zod";

export class RetrieveGuests 
{
public async AddTool(server: McpServer) 
    {
        server.tool(
            //name
            "RetrieveGuests",
            //description
            "Retrieves multiple guests by their email address or other identifying information from Sitecore CDP using the Guest API. Each result is a search result list.",
            //paramsSchema
            {
                guestType: z.string().describe("The level of identity obtained. Valid values are 'visitor', and 'customer'. A visitor is a guest who has not yet provided any identifying information. A customer is a guest who has identity information like email, name etc."),
                city: z.string().nullable().describe("The guest's city."),
                country: z.string().nullable().describe("The guest's country."),
                dateOfBirth: z.date().nullable().describe("The guest's date of birth. Validation: Date must be in the past. Example: 1991-01-01T16:17:16.000Z"),
                email: z.string().nullable().describe("The email address of the guest."),
                firstName: z.string().nullable().describe("The guest's first name."),
                gender: z.string().nullable().describe("The guest's gender."),
                href: z.string().nullable().describe("The URL of the guest."),
                identifiers: z.array(z.object({
                    ​id: z.string().nullable().describe("The identifier ID. Example: 'B7524AE6-CF1C-440F-B1A2-0C9D42F5CB41'"),
                    ​provider: z.string().describe("The identifier provider. Example: 'ProfileSystem'"),
                    ​expiryDate: z.string().nullable().describe("The expiry date of the identifier in ISO Format. Example: '2025-01-01T16:17:16.000Z'"),
                })).nullable().describe("A list of identifiers for the guest."),
                lastName: z.string().nullable().describe("The guest's last name."),
                nationality: z.string().nullable().describe("The guest's nationality."),
                passportExpiry: z.date().nullable().describe("The expiry date of the guest's passport. Example: 2025-01-01T00:00:00.000Z"),
                passportNumber: z.string().nullable().describe("The passport number of the guest."),
                phoneNumbers: z.array(z.string()).nullable().describe("The phone numbers of the guest. Example: +353161123345, +353161123346"),
                postCode: z.string().nullable().describe("The guest's zipcode."),
                state: z.string().nullable().describe("The state (address) of the guest."),
                street: z.string().nullable().describe("The street address of the guest."),
                title: z.string().nullable().describe("The title of the guest. Example values: 'Br', 'Brigadier', 'Capt', 'Colonel', 'Dame', 'Dr', 'Elder', 'Fr', 'General', 'Hon', 'Judge', 'Lord', 'Master', 'Miss', 'Mr', 'Mrs', 'Ms', 'Mstr', 'Prof', 'Rabbi', 'Rev', 'Shaikha', 'Sheikh', 'Sir', 'Sister', 'Sr'"),
                offset: z.number().nullable().describe("Collection responses use offset pagination. The offset query parameter is used to exclude from a response the first N items of the entire resource collection. Default: 0. Example: offset=10"),
                limit: z.number().nullable().describe("Collection responses use offset pagination. This query parameter lets you adjust the maximum number of collection items to return for a single request. Default: 10. Example: limit=40"),
                expand: z.boolean().describe("You can expand items in a collection by setting expand=true. This eliminates the need to send multiple follow-up requests (one for the collection and another for each of its items). This also helps you check if the data you intend to create already exists. Default: false. Example: expand=true"),
                sort: z.string().nullable().describe("You can sort search results by specifying a sort query parameter and a corresponding sort value (ASC or DESC case sensitive) on a collection resource URL. The example query parameter shows how to return a resource in ascending chronological order of when the resource was created and descending order of the resource label. Example: sort=createdAt::ASC|label::DESC'"),        
            },
            //annotations
            {
                title: "Search for Guests in Sitecore CDP", // Human-readable title for the tool
                readOnlyHint: false, // If true, the tool does not modify its environment
                destructiveHint: false, // If true, the tool may perform destructive updates
                idempotentHint: false, // If true, repeated calls with same args have no additional effect
                openWorldHint: true, // If true, tool interacts with external entities
            },
            //callback
            async ({ guestType, city, country, dateOfBirth, email, firstName, 
              gender, href, identifiers, lastName, nationality, passportExpiry, 
              passportNumber, postCode, state, street, title,
              offset, limit, expand, sort }) => 
            {   
                const queryParams: Record<string, string> = {};

                queryParams['offset'] = offset ? String(offset) : "0";
                queryParams['limit'] = limit ? String(limit) : "10";
                queryParams['expand'] = expand ? String(expand) : "false";

                if(sort)
                  queryParams['sort'] = sort;
                if (guestType)
                  queryParams['guestType'] = guestType as 'visitor' | 'customer' | 'traveller';
                if (city)
                  queryParams['city'] = city;
                if (country)
                  queryParams['country'] = country;
                if (dateOfBirth)
                  queryParams['dateOfBirth'] = dateOfBirth.toISOString();
                if (email)
                  queryParams['email'] = email;
                if (firstName)
                  queryParams['firstName'] = firstName;
                if (gender)
                  queryParams['gender'] = gender;
                if(href)
                  queryParams['href'] = href;
                if (identifiers)
                  queryParams['identifiers'] = Object.entries(identifiers)
                    .map(([key, value]) => `identifiers.${key}=${value}`)
                    .join(", ");
                if (lastName)
                  queryParams['lastName'] = lastName;
                if (nationality)
                  queryParams['nationality'] = nationality;
                if (passportExpiry)
                  queryParams['passportExpiry'] = passportExpiry.toISOString();
                if (passportNumber)
                  queryParams['passportNumber'] = passportNumber;
                if (postCode)
                  queryParams['postCode'] = postCode;
                if (state)
                  queryParams['state'] = state;
                if (street)
                  queryParams['street'] = street;
                if (title)
                  queryParams['title'] = title;

                const query = new URLSearchParams(queryParams).toString();
                const response = await new CdpClient().MakeRequest<Models.RetrieveGuestsResponse>(
                  `guests?${query}`, 
                  'GET', null);
                    
                const json = await response.json();
                return {
                    content: [json]
                };
            }
        );
    }
}