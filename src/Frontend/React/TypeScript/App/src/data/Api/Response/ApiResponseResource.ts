export interface ApiResponseResource {
  getErrorMessageForDefault: () => string;
  getErrorMessageForHttp400BadRequest: () => string;
  getErrorMessageForHttp404NotFound: () => string;
  getErrorMessageForHttp500InternalServerError: () => string;
}
