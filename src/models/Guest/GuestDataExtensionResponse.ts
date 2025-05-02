import { GuestDataExtension } from './GuestDataExtension';

export interface GuestDataExtensionResponse extends GuestDataExtension {
    createdAt: string;
    modifiedAt: string;
    ref: string;
}