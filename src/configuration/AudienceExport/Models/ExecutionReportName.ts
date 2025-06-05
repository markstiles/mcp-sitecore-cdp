import { Errors } from './Errors';

export interface ExecutionReportName {
  clientKey: string;
  executionRef: string;
  definitionRef: string;
  friendlyId: string;
  executionType: 'INSTANT_RUN' | 'SCHEDULED';
  status: 'PENDING_GUEST_CONTEXT' | 'PENDING_SEGMENTATION' | 'PENDING_EMR_SUBMIT' | 'PENDING_EMR_JOB' | 'SUCCESS' | 'FAILED' | 'ALERT';
  definitionType: 'DELTA' | 'FULL_SYNC';
  segmentExecutionType: 'ON_DEMAND' | 'LIVE';
  total: number;
  filterMatchedGuests: number;
  filterNotMatchedGuests: number;
  filterFailures: number;
  successes: number;
  failures: number;
  programmableErrors: Errors[];
  filterErrors: Errors[];
  errorLogs: string[];
  datasetDate: string;
  startTime: string;
  endTime: string;
  successAdd: number;
  successRemove: number;
}