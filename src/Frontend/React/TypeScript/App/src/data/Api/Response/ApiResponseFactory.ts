import { type ApiResponseError } from './ApiResponseError';
import { ApiResponseErrorImpl } from './ApiResponseErrorImpl';
import { type ApiResponseErrorOptions } from './ApiResponseErrorOptions';

export interface ApiResponseFactory {
  readonly createError: (options: ApiResponseErrorOptions) => ApiResponseError;
}

class Implementation implements ApiResponseFactory {
  createError (options: ApiResponseErrorOptions): ApiResponseError {
    return new ApiResponseErrorImpl(options);
  }
}

export function createApiResponseFactory (): ApiResponseFactory {
  return new Implementation();
};
