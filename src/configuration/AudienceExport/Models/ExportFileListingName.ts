import { Exports } from "./Exports";

export interface ExportFileListingName {
  executionRef: string;
  definitionRef: string;
  friendlyId: string;
  clientKey: string;
  expireAt: string;
  numberOfFiles: number;
  totalSizeKB: number;
  exports: Exports[];
}
