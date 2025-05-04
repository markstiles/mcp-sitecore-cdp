import { Guest } from './Guest';

export interface GuestCreateResponse extends Guest {
    createdAt: string;
    modifiedAt: string;
    ref: string;
}