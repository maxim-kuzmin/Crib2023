import { type ShouldBeCanceled } from '../../../../../common';
import { type TopicTypeEntity, type ApiRequestHandler } from '../../../../../data';
import { type TopicDomainRepository } from '../../../TopicDomainRepository';
import { type TopicDomainItemGetOperationOutput, type TopicDomainItemGetOperationResponse } from '../Get';
import { type TopicDomainItemSaveOperationRequest } from './TopicDomainItemSaveOperationRequest';
import { type TopicDomainItemSaveOperationRequestHandler } from './TopicDomainItemSaveOperationRequestHandler';

interface Options {
  apiRequestHandler: ApiRequestHandler;
  repository: TopicDomainRepository;
}

export class TopicDomainItemSaveOperationRequestHandlerImpl implements TopicDomainItemSaveOperationRequestHandler {
  private readonly apiRequestHandler: ApiRequestHandler;
  private readonly repository: TopicDomainRepository;

  constructor (options: Options) {
    this.apiRequestHandler = options.apiRequestHandler;
    this.repository = options.repository;
  }

  async handle (
    request: TopicDomainItemSaveOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<TopicDomainItemGetOperationResponse | null> {
    return await this.apiRequestHandler.handleWithInputAndOutput<
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
      shouldBeCanceled
    );
  }
}
