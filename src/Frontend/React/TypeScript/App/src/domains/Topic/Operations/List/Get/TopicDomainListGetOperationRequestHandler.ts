import { type ShouldBeCanceled } from '../../../../../common';
import { type ApiRequestHandler } from '../../../../../data';
import { type TopicDomainRepository } from '../../../TopicDomainRepository';
import { type TopicDomainListGetOperationInput } from './TopicDomainListGetOperationInput';
import { type TopicDomainListGetOperationOutput } from './TopicDomainListGetOperationOutput';
import { type TopicDomainListGetOperationRequest } from './TopicDomainListGetOperationRequest';
import { type TopicDomainListGetOperationResponse } from './TopicDomainListGetOperationResponse';

export interface TopicDomainListGetOperationRequestHandler {
  handle: (
    request: TopicDomainListGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TopicDomainListGetOperationResponse | null>;
}

interface Options {
  apiRequestHandler: ApiRequestHandler;
  repository: TopicDomainRepository;
}

class Implementation implements TopicDomainListGetOperationRequestHandler {
  private readonly apiRequestHandler: ApiRequestHandler;
  private readonly repository: TopicDomainRepository;

  constructor (options: Options) {
    this.apiRequestHandler = options.apiRequestHandler;
    this.repository = options.repository;
  }

  async handle (
    request: TopicDomainListGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<TopicDomainListGetOperationResponse | null> {
    return await this.apiRequestHandler.handleWithInputAndOutput<
      TopicDomainListGetOperationInput,
      TopicDomainListGetOperationRequest,
      TopicDomainListGetOperationOutput,
      TopicDomainListGetOperationResponse
    >(
      request,
      async () => await this.repository.getList(request),
      shouldBeCanceled
    );
  }
}

export function createTopicDomainListGetOperationRequestHandler (
  options: Options
): TopicDomainListGetOperationRequestHandler {
  return new Implementation(options);
}
