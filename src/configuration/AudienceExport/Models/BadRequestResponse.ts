export interface BadRequestResponse {
  status: number;
  code: number;
  message: string;
  developerMessage: string;
  moreInfoUrl: string;
}
