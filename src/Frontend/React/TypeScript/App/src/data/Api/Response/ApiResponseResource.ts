export interface ApiResponseResource {
  getErrorMessageForDefault: () => string;
  getErrorMessageForHttp400: () => string;
  getErrorMessageForHttp404: () => string;
  getErrorMessageForHttp500: () => string;
}
