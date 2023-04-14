import { type ApiResponseError } from './ApiResponseError';
import { type ApiResponseErrorOptions } from './ApiResponseErrorOptions';
import { type ApiResponseDataWithDetails, type ApiResponseDataWithMessages } from './Data';

export class ApiResponseErrorImpl extends Error implements ApiResponseError {
  readonly responseDataWithDetails: ApiResponseDataWithDetails | null = null;
  readonly responseDataWithMessages: ApiResponseDataWithMessages | null = null;

  constructor (public responseStatus: number, options?: ApiResponseErrorOptions) {
    let message = 'Unknown';

    switch (responseStatus) {
      case 400:
        message = '@@HttpError400';
        if (options?.responseDataWithDetails) {
          const { summary } = options?.responseDataWithDetails;
          if (summary) {
            message = summary;
          }
        }
        break;
      case 404:
        message = '@@HttpError404';
        break;
      case 500:
        message = '@@HttpError500';
        if (options?.responseDataWithMessages) {
          const { messages } = options?.responseDataWithMessages;
          if (messages?.length > 0) {
            message = messages.join('. ');
          }
        }
        break;
    }

    super(message, options);

    if (options) {
      const { responseDataWithDetails: responseDetailsData, responseDataWithMessages: responseErrorsData } = options;

      if (responseDetailsData) {
        this.responseDataWithDetails = responseDetailsData;
      }

      if (responseErrorsData) {
        this.responseDataWithMessages = responseErrorsData;
      }
    }
  }
}
