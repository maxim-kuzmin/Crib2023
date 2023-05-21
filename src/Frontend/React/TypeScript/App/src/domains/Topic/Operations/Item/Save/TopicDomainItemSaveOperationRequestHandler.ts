import { type TopicTypeEntity, type ApiRequestHandler } from '../../../../../data';
import { type TopicDomainRepository } from '../../../TopicDomainRepository';
import { type TopicDomainItemGetOperationOutput, type TopicDomainItemGetOperationResponse } from '../Get';
import { type TopicDomainItemSaveOperationRequest } from './TopicDomainItemSaveOperationRequest';

export interface TopicDomainItemSaveOperationRequestHandler {
  handle: (
    request: TopicDomainItemSaveOperationRequest,
    abortController: AbortController
  ) => Promise<TopicDomainItemGetOperationResponse | null>;
}

interface Options {
  handlerOfApiRequest: ApiRequestHandler;
  repository: TopicDomainRepository;
}

class Implementation implements TopicDomainItemSaveOperationRequestHandler {
  private readonly handlerOfApiRequest: ApiRequestHandler;
  private readonly repository: TopicDomainRepository;

  constructor (options: Options) {
    this.handlerOfApiRequest = options.handlerOfApiRequest;
    this.repository = options.repository;
  }

  async handle (
    request: TopicDomainItemSaveOperationRequest,
    abortController: AbortController
  ): Promise<TopicDomainItemGetOperationResponse | null> {
    return await this.handlerOfApiRequest.handleWithInputAndOutput<
      TopicTypeEntity,
      TopicDomainItemSaveOperationRequest,
      TopicDomainItemGetOperationOutput,
      TopicDomainItemGetOperationResponse
    >(
      request,
      async () => {
        const { name } = request.input;

        const isInputValid = !!name;

        if (isInputValid) {
          return await this.repository.saveItem(request);
        }

        return null;
      },
      abortController
    );
  }
}

export function createTopicDomainItemSaveOperationRequestHandler (
  options: Options
): TopicDomainItemSaveOperationRequestHandler {
  return new Implementation(options);
}
