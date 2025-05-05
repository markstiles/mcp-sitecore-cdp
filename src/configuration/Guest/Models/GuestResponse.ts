import { Guest } from './Guest';

export interface GuestResponse extends Guest {
    createdAt: string;
    modifiedAt: string;
    ref: string;
}