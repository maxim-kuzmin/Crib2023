import { type ApiResponseError } from './ApiResponseError';
import { type ApiResponseErrorOptions } from './ApiResponseErrorOptions';
import { type ApiResponseDataWithDetails, type ApiResponseDataWithMessages } from './Data';

export class ApiResponseErrorImpl extends Error implements ApiResponseError {
  readonly responseDataWithDetails: ApiResponseDataWithDetails | null = null;
  readonly responseDataWithMessages: ApiResponseDataWithMessages | null = null;
  public readonly responseStatus: number;

  constructor (options: ApiResponseErrorOptions) {
    const {
      cause,
      resourceOfApiResponse,
      responseDataWithDetails,
      responseDataWithMessages,
      responseStatus,
    } = options;

    let message = resourceOfApiResponse.getErrorMessageForDefault();

    switch (responseStatus) {
      case 400:
        message = resourceOfApiResponse.getErrorMessageForHttp400BadRequest();
        if (responseDataWithDetails) {
          const { summary } = responseDataWithDetails;
          if (summary) {
            message = summary;
          }
        }
        break;
      case 404:
        message = resourceOfApiResponse.getErrorMessageForHttp404NotFound();
        break;
      case 500:
        message = resourceOfApiResponse.getErrorMessageForHttp500InternalServerError();
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
