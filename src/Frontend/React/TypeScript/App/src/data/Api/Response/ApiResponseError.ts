import { type ApiResponseErrorOptions } from './ApiResponseErrorOptions';
import { type ApiResponseDataWithDetails, type ApiResponseDataWithMessages } from './Data';

export interface ApiResponseError {
  readonly message: string;
  readonly responseDataWithDetails: ApiResponseDataWithDetails | null;
  readonly responseDataWithMessages: ApiResponseDataWithMessages | null;
  readonly responseStatus: number;
}

export function createApiResponseError ({
  errorMessage,
  resourceOfApiResponse,
  responseDataWithDetails,
  responseDataWithMessages,
  responseStatus,
}: ApiResponseErrorOptions) {
  let message = errorMessage ?? resourceOfApiResponse.getErrorMessageForDefault(); ;

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

  return {
    message,
    responseDataWithDetails: responseDataWithDetails ?? null,
    responseDataWithMessages: responseDataWithMessages ?? null,
    responseStatus: responseStatus ?? 0,
  };
}
