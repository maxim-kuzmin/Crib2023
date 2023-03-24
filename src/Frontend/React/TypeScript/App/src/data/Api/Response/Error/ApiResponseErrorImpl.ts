import {
  type ApiResponseErrorsData,
  type ApiResponseDetailsData,
  type ApiResponseError,
  type ApiResponseErrorOptions
} from '../../../../all';

export class ApiResponseErrorImpl extends Error implements ApiResponseError {
  readonly responseDetailsData: ApiResponseDetailsData | null = null;
  readonly responseErrorsData: ApiResponseErrorsData | null = null;

  constructor (options?: ApiResponseErrorOptions) {
    let message = 'Unknown';

    if (options?.responseDetailsData) {
      message = '@@HttpError400';
    } else if (options?.responseErrorsData) {
      message = '@@HttpError500';
    }

    super(message, options);

    if (options) {
      const { responseDetailsData, responseErrorsData } = options;

      if (responseDetailsData) {
        this.responseDetailsData = responseDetailsData;
      }

      if (responseErrorsData) {
        this.responseErrorsData = responseErrorsData;
      }
    }
  }
}
