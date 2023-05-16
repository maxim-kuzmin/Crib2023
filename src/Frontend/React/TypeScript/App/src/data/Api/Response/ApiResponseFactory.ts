import { type ApiResponseError, createApiResponseError } from './ApiResponseError';
import { type ApiResponseErrorOptions } from './ApiResponseErrorOptions';

export interface ApiResponseFactory {
  readonly createError: (options: ApiResponseErrorOptions) => ApiResponseError;
}

class Implementation implements ApiResponseFactory {
  createError (options: ApiResponseErrorOptions): ApiResponseError {
    return createApiResponseError(options);
  }
}

export function createApiResponseFactory (): ApiResponseFactory {
  return new Implementation();
};
