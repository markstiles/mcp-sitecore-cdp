"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestApi = void 0;
const CreateGuest_1 = require("./CreateGuest");
const CreateGuestDataExtension_1 = require("./CreateGuestDataExtension");
const DeleteGuest_1 = require("./DeleteGuest");
const DeleteGuestDataExtension_1 = require("./DeleteGuestDataExtension");
const PartialUpdateGuest_1 = require("./PartialUpdateGuest");
const RetrieveGuest_1 = require("./RetrieveGuest");
const RetrieveGuestDataExtensions_1 = require("./RetrieveGuestDataExtensions");
const RetrieveGuestDataExtensionsByName_1 = require("./RetrieveGuestDataExtensionsByName");
const RetrieveGuests_1 = require("./RetrieveGuests");
const UpdateGuest_1 = require("./UpdateGuest");
const UpdateGuestDataExtension_1 = require("./UpdateGuestDataExtension");
class GuestApi {
    async SetupTools(server) {
        // Add each individual API method to the server
        new CreateGuest_1.CreateGuest().AddTool(server);
        new CreateGuestDataExtension_1.CreateGuestDataExtension().AddTool(server);
        new DeleteGuest_1.DeleteGuest().AddTool(server);
        new DeleteGuestDataExtension_1.DeleteGuestDataExtension().AddTool(server);
        new PartialUpdateGuest_1.PartialUpdateGuest().AddTool(server);
        new RetrieveGuest_1.RetrieveGuest().AddTool(server);
        new RetrieveGuestDataExtensions_1.RetrieveGuestDataExtensions().AddTool(server);
        new RetrieveGuestDataExtensionsByName_1.RetrieveGuestDataExtensionsByName().AddTool(server);
        new RetrieveGuests_1.RetrieveGuests().AddTool(server);
        new UpdateGuest_1.UpdateGuest().AddTool(server);
        new UpdateGuestDataExtension_1.UpdateGuestDataExtension().AddTool(server);
    }
    async SetupResources(server) {
    }
    async SetupPrompts(server) {
    }
}
exports.GuestApi = GuestApi;
