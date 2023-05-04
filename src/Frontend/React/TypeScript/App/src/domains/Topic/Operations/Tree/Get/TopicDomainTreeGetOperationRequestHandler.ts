import { type ShouldBeCanceled } from '../../../../../common';
import { type ApiRequestHandler } from '../../../../../data';
import { type TopicDomainRepository } from '../../../TopicDomainRepository';
import { type TopicDomainTreeGetOperationInput } from './TopicDomainTreeGetOperationInput';
import { type TopicDomainTreeGetOperationOutput } from './TopicDomainTreeGetOperationOutput';
import { type TopicDomainTreeGetOperationRequest } from './TopicDomainTreeGetOperationRequest';
import { type TopicDomainTreeGetOperationResponse } from './TopicDomainTreeGetOperationResponse';

export interface TopicDomainTreeGetOperationRequestHandler {
  handle: (
    request: TopicDomainTreeGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TopicDomainTreeGetOperationResponse | null>;
}

interface Options {
  apiRequestHandler: ApiRequestHandler;
  repository: TopicDomainRepository;
}

class Implementation implements TopicDomainTreeGetOperationRequestHandler {
  private readonly apiRequestHandler: ApiRequestHandler;
  private readonly repository: TopicDomainRepository;

  constructor (options: Options) {
    this.apiRequestHandler = options.apiRequestHandler;
    this.repository = options.repository;
  }

  async handle (
    request: TopicDomainTreeGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<TopicDomainTreeGetOperationResponse | null> {
    return await this.apiRequestHandler.handleWithInputAndOutput<
      TopicDomainTreeGetOperationInput,
      TopicDomainTreeGetOperationRequest,
      TopicDomainTreeGetOperationOutput,
      TopicDomainTreeGetOperationResponse
    >(
      request,
      async () => await this.repository.getTree(request),
      shouldBeCanceled
    );
  }
}

export function createTopicDomainTreeGetOperationRequestHandler (
  options: Options
): TopicDomainTreeGetOperationRequestHandler {
  return new Implementation(options);
}
