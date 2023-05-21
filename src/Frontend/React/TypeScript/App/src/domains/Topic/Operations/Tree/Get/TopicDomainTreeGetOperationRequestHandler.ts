import { type ApiRequestHandler } from '../../../../../data';
import { type TopicDomainRepository } from '../../../TopicDomainRepository';
import { type TopicDomainTreeGetOperationInput } from './TopicDomainTreeGetOperationInput';
import { type TopicDomainTreeGetOperationOutput } from './TopicDomainTreeGetOperationOutput';
import { type TopicDomainTreeGetOperationRequest } from './TopicDomainTreeGetOperationRequest';
import { type TopicDomainTreeGetOperationResponse } from './TopicDomainTreeGetOperationResponse';

export interface TopicDomainTreeGetOperationRequestHandler {
  handle: (
    request: TopicDomainTreeGetOperationRequest,
    abortController?: AbortController
  ) => Promise<TopicDomainTreeGetOperationResponse | null>;
}

interface Options {
  handlerOfApiRequest: ApiRequestHandler;
  repository: TopicDomainRepository;
}

class Implementation implements TopicDomainTreeGetOperationRequestHandler {
  private readonly handlerOfApiRequest: ApiRequestHandler;
  private readonly repository: TopicDomainRepository;

  constructor (options: Options) {
    this.handlerOfApiRequest = options.handlerOfApiRequest;
    this.repository = options.repository;
  }

  async handle (
    request: TopicDomainTreeGetOperationRequest,
    abortController?: AbortController
  ): Promise<TopicDomainTreeGetOperationResponse | null> {
    return await this.handlerOfApiRequest.handleWithInputAndOutput<
      TopicDomainTreeGetOperationInput,
      TopicDomainTreeGetOperationRequest,
      TopicDomainTreeGetOperationOutput,
      TopicDomainTreeGetOperationResponse
    >(
      request,
      async () => await this.repository.getTree(request, abortController),
      abortController
    );
  }
}

export function createTopicDomainTreeGetOperationRequestHandler (
  options: Options
): TopicDomainTreeGetOperationRequestHandler {
  return new Implementation(options);
}
