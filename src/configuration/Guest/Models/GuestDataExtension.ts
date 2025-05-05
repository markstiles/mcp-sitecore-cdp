export interface GuestDataExtension {
    key: "default";
    name: string;
    [key: string]: string | boolean | number | undefined;
  }