import { type ApiOperationResponse, type ApiRequestHandler } from '../../../../../data';
import { type TopicDomainRepository } from '../../../TopicDomainRepository';
import { type TopicDomainItemGetOperationInput } from '../Get';
import { type TopicDomainItemDeleteOperationRequest } from './TopicDomainItemDeleteOperationRequest';

export interface TopicDomainItemDeleteOperationRequestHandler {
  handle: (
    request: TopicDomainItemDeleteOperationRequest,
    abortSignal?: AbortSignal
  ) => Promise<ApiOperationResponse | null>;
}

interface Options {
  handlerOfApiRequest: ApiRequestHandler;
  repository: TopicDomainRepository;
}

class Implementation implements TopicDomainItemDeleteOperationRequestHandler {
  private readonly handlerOfApiRequest: ApiRequestHandler;
  private readonly repository: TopicDomainRepository;

  constructor (options: Options) {
    this.handlerOfApiRequest = options.handlerOfApiRequest;
    this.repository = options.repository;
  }

  async handle (
    request: TopicDomainItemDeleteOperationRequest,
    abortSignal?: AbortSignal
  ): Promise<ApiOperationResponse | null> {
    return await this.handlerOfApiRequest.handleWithInput<
      TopicDomainItemGetOperationInput,
      TopicDomainItemDeleteOperationRequest,
      ApiOperationResponse
    >(
      request,
      async () => {
        const { id, name, parentId } = request.input;

        const isInputValid = Number(id ?? 0) > 0 || (name && Number(parentId ?? 0) > 0);

        if (isInputValid) {
          return await this.repository.deleteItem(request, abortSignal);
        }

        return null;
      },
      abortSignal
    );
  }
}

export function createTopicDomainItemDeleteOperationRequestHandler (
  options: Options
): TopicDomainItemDeleteOperationRequestHandler {
  return new Implementation(options);
}
