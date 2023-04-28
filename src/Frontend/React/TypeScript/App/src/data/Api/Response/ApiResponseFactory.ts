import { type ApiResponseError } from './ApiResponseError';
import { ApiResponseErrorImpl } from './ApiResponseErrorImpl';
import { type ApiResponseErrorOptions } from './ApiResponseErrorOptions';

export interface ApiResponseFactory {
  readonly createError: (options: ApiResponseErrorOptions) => ApiResponseError;
}

export function createApiResponseFactory (): ApiResponseFactory {
  function createError (options: ApiResponseErrorOptions): ApiResponseError {
    return new ApiResponseErrorImpl(options);
  }

  return { createError };
};
