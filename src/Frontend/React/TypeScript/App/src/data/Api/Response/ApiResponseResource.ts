import { type LocalizationResource } from '../../../common';

export interface ApiResponseResource extends LocalizationResource {
  readonly getErrorMessageForDefault: () => string;
  readonly getErrorMessageForHttp400: () => string;
  readonly getErrorMessageForHttp404: () => string;
  readonly getErrorMessageForHttp500: () => string;
}

export function getApiResponseResourcePath (): string {
  return 'data/Api/Response/ApiResponse';
}
