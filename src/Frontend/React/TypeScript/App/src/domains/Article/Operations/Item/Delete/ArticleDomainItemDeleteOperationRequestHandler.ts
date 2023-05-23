import { type ApiOperationResponse, type ApiRequestHandler } from '../../../../../data';
import { type ArticleDomainRepository } from '../../../ArticleDomainRepository';
import { type ArticleDomainItemGetOperationInput } from '../Get';
import { type ArticleDomainItemDeleteOperationRequest } from './ArticleDomainItemDeleteOperationRequest';

export interface ArticleDomainItemDeleteOperationRequestHandler {
  handle: (
    request: ArticleDomainItemDeleteOperationRequest,
    abortSignal?: AbortSignal
  ) => Promise<ApiOperationResponse | null>;
}

interface Options {
  handlerOfApiRequest: ApiRequestHandler;
  repository: ArticleDomainRepository;
}

class Implementation implements ArticleDomainItemDeleteOperationRequestHandler {
  private readonly handlerOfApiRequest: ApiRequestHandler;
  private readonly repository: ArticleDomainRepository;

  constructor (options: Options) {
    this.handlerOfApiRequest = options.handlerOfApiRequest;
    this.repository = options.repository;
  }

  async handle (
    request: ArticleDomainItemDeleteOperationRequest,
    abortSignal?: AbortSignal
  ): Promise<ApiOperationResponse | null> {
    return await this.handlerOfApiRequest.handleWithInput<
      ArticleDomainItemGetOperationInput,
      ArticleDomainItemDeleteOperationRequest,
      ApiOperationResponse
    >(
      request,
      async () => {
        const { id, title, topicId } = request.input;

        const isInputValid = Number(id ?? 0) > 0 || (title && Number(topicId ?? 0) > 0);

        if (isInputValid) {
          return await this.repository.deleteItem(request, abortSignal);
        }

        return null;
      },
      abortSignal
    );
  }
}

export function createArticleDomainItemDeleteOperationRequestHandler (
  options: Options
): ArticleDomainItemDeleteOperationRequestHandler {
  return new Implementation(options);
}
