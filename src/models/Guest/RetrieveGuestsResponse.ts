import { Guest } from './Guest';

export interface RetrieveGuestsResponse {
    items: Guest[];
    limit: number;
    offset: number;
    href: string;
}