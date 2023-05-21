import { type ApiRequestHandler } from '../../../../../data';
import { type TopicDomainRepository } from '../../../TopicDomainRepository';
import { type TopicDomainItemGetOperationInput } from './TopicDomainItemGetOperationInput';
import { type TopicDomainItemGetOperationOutput } from './TopicDomainItemGetOperationOutput';
import { type TopicDomainItemGetOperationRequest } from './TopicDomainItemGetOperationRequest';
import { type TopicDomainItemGetOperationResponse } from './TopicDomainItemGetOperationResponse';

export interface TopicDomainItemGetOperationRequestHandler {
  handle: (
    request: TopicDomainItemGetOperationRequest,
    abortController: AbortController
  ) => Promise<TopicDomainItemGetOperationResponse | null>;
}

interface Options {
  handlerOfApiRequest: ApiRequestHandler;
  repository: TopicDomainRepository;
}

class Implementation implements TopicDomainItemGetOperationRequestHandler {
  private readonly handlerOfApiRequest: ApiRequestHandler;
  private readonly repository: TopicDomainRepository;

  constructor (options: Options) {
    this.handlerOfApiRequest = options.handlerOfApiRequest;
    this.repository = options.repository;
  }

  async handle (
    request: TopicDomainItemGetOperationRequest,
    abortController: AbortController
  ): Promise<TopicDomainItemGetOperationResponse | null> {
    return await this.handlerOfApiRequest.handleWithInputAndOutput<
      TopicDomainItemGetOperationInput,
      TopicDomainItemGetOperationRequest,
      TopicDomainItemGetOperationOutput,
      TopicDomainItemGetOperationResponse
    >(
      request,
      async () => {
        const { id, name, parentId } = request.input;

        const isInputValid = Number(id ?? 0) > 0 || (name && Number(parentId ?? 0) > 0);

        if (isInputValid) {
          return await this.repository.getItem(request);
        }

        return null;
      },
      abortController
    );
  }
}

export function createTopicDomainItemGetOperationRequestHandler (
  options: Options
): TopicDomainItemGetOperationRequestHandler {
  return new Implementation(options);
}
