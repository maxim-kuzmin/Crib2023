import { type ApiRequestHandler } from '../../../../../data';
import { type TopicDomainRepository } from '../../../TopicDomainRepository';
import { type TopicDomainTreeGetOperationInput } from './TopicDomainTreeGetOperationInput';
import { type TopicDomainTreeGetOperationOutput } from './TopicDomainTreeGetOperationOutput';
import { type TopicDomainTreeGetOperationRequest } from './TopicDomainTreeGetOperationRequest';
import { type TopicDomainTreeGetOperationResponse } from './TopicDomainTreeGetOperationResponse';

export interface TopicDomainTreeGetOperationRequestHandler {
  handle: (
    request: TopicDomainTreeGetOperationRequest,
    abortSignal?: AbortSignal
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
    abortSignal?: AbortSignal
  ): Promise<TopicDomainTreeGetOperationResponse | null> {
    return await this.handlerOfApiRequest.handleWithInputAndOutput<
      TopicDomainTreeGetOperationInput,
      TopicDomainTreeGetOperationRequest,
      TopicDomainTreeGetOperationOutput,
      TopicDomainTreeGetOperationResponse
    >(
      request,
      async () => await this.repository.getTree(request, abortSignal),
      abortSignal
    );
  }
}

export function createTopicDomainTreeGetOperationRequestHandler (
  options: Options
): TopicDomainTreeGetOperationRequestHandler {
  return new Implementation(options);
}
