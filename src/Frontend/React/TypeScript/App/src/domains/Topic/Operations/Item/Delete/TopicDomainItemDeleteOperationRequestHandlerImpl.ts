import { type ShouldBeCanceled } from '../../../../../common';
import { type ApiOperationResponse, type ApiRequestHandler } from '../../../../../data';
import { type TopicDomainRepository } from '../../../TopicDomainRepository';
import { type TopicDomainItemGetOperationInput } from '../Get';
import { type TopicDomainItemDeleteOperationRequest } from './TopicDomainItemDeleteOperationRequest';
import { type TopicDomainItemDeleteOperationRequestHandler } from './TopicDomainItemDeleteOperationRequestHandler';

interface Options {
  apiRequestHandler: ApiRequestHandler;
  repository: TopicDomainRepository;
}

export class TopicDomainItemDeleteOperationRequestHandlerImpl
  implements TopicDomainItemDeleteOperationRequestHandler {
  private readonly apiRequestHandler: ApiRequestHandler;
  private readonly repository: TopicDomainRepository;

  constructor (options: Options) {
    this.apiRequestHandler = options.apiRequestHandler;
    this.repository = options.repository;
  }

  async handle (
    request: TopicDomainItemDeleteOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<ApiOperationResponse | null> {
    return await this.apiRequestHandler.handleWithInput<
      TopicDomainItemGetOperationInput,
      TopicDomainItemDeleteOperationRequest,
      ApiOperationResponse
    >(
      request,
      async () => {
        const { id, name, parentId } = request.input;

        const isInputValid = Number(id ?? 0) > 0 || (name && Number(parentId ?? 0) > 0);

        if (isInputValid) {
          return await this.repository.deleteItem(request);
        }

        return null;
      },
      shouldBeCanceled
    );
  }
}
