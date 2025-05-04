import { GuestIdentifier } from './GuestIdentifier';

export interface Guest {
    city?: string;
    country?: string;
    dateOfBirth?: string;
    email?: string;
    emails?: string[];
    firstName?: string;
    gender?: string;
    guestType: 'visitor' | 'customer' | 'traveller';
    href?: string;
    identifiers?: GuestIdentifier[];
    lastName?: string;
    nationality?: string;
    passportExpiry?: string;
    passportNumber?: string;
    phoneNumbers?: string[];
    postCode?: string;
    state?: string;
    street?: string[];
    title?: string;
  }