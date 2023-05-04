import { type ShouldBeCanceled } from '../../../../../common';
import { type ApiRequestHandler } from '../../../../../data';
import { type TopicDomainRepository } from '../../../TopicDomainRepository';
import { type TopicDomainItemGetOperationInput } from './TopicDomainItemGetOperationInput';
import { type TopicDomainItemGetOperationOutput } from './TopicDomainItemGetOperationOutput';
import { type TopicDomainItemGetOperationRequest } from './TopicDomainItemGetOperationRequest';
import { type TopicDomainItemGetOperationResponse } from './TopicDomainItemGetOperationResponse';

export interface TopicDomainItemGetOperationRequestHandler {
  handle: (
    request: TopicDomainItemGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TopicDomainItemGetOperationResponse | null>;
}

interface Options {
  apiRequestHandler: ApiRequestHandler;
  repository: TopicDomainRepository;
}

class Implementation implements TopicDomainItemGetOperationRequestHandler {
  private readonly apiRequestHandler: ApiRequestHandler;
  private readonly repository: TopicDomainRepository;

  constructor (options: Options) {
    this.apiRequestHandler = options.apiRequestHandler;
    this.repository = options.repository;
  }

  async handle (
    request: TopicDomainItemGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<TopicDomainItemGetOperationResponse | null> {
    return await this.apiRequestHandler.handleWithInputAndOutput<
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
      shouldBeCanceled
    );
  }
}

export function createTopicDomainItemGetOperationRequestHandler (
  options: Options
): TopicDomainItemGetOperationRequestHandler {
  return new Implementation(options);
}
