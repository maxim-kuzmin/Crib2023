import { type ApiResponseErrorOptions } from './ApiResponseErrorOptions';
import { type ApiResponseDataWithDetails, type ApiResponseDataWithMessages } from './Data';

export interface ApiResponseError extends Error {
  readonly responseDataWithDetails: ApiResponseDataWithDetails | null;
  readonly responseDataWithMessages: ApiResponseDataWithMessages | null;
  readonly responseStatus: number;
}

class Implementation extends Error implements ApiResponseError {
  readonly responseDataWithDetails: ApiResponseDataWithDetails | null = null;
  readonly responseDataWithMessages: ApiResponseDataWithMessages | null = null;
  public readonly responseStatus: number;

  constructor ({
    cause,
    resourceOfApiResponse,
    responseDataWithDetails,
    responseDataWithMessages,
    responseStatus,
  }: ApiResponseErrorOptions) {
    let message = resourceOfApiResponse.getErrorMessageForDefault();

    switch (responseStatus) {
      case 400:
        message = resourceOfApiResponse.getErrorMessageForHttp400();
        if (responseDataWithDetails) {
          const { summary } = responseDataWithDetails;
          if (summary) {
            message = summary;
          }
        }
        break;
      case 404:
        message = resourceOfApiResponse.getErrorMessageForHttp404();
        break;
      case 500:
        message = resourceOfApiResponse.getErrorMessageForHttp500();
        if (responseDataWithMessages) {
          const { messages } = responseDataWithMessages;
          if (messages?.length > 0) {
            message = messages.join('. ');
          }
        }
        break;
    }

    super(message, { cause });

    this.responseStatus = responseStatus;

    if (responseDataWithDetails) {
      this.responseDataWithDetails = responseDataWithDetails;
    }

    if (responseDataWithMessages) {
      this.responseDataWithMessages = responseDataWithMessages;
    }
  }
}

export function createApiResponseError (options: ApiResponseErrorOptions) {
  return new Implementation(options);
}
