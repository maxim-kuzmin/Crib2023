import { type ShouldBeCanceled } from '../../../../../common';
import { type ApiOperationResponse, type ApiRequestHandler } from '../../../../../data';
import { type ArticleDomainRepository } from '../../../ArticleDomainRepository';
import { type ArticleDomainItemGetOperationInput } from '../Get';
import { type ArticleDomainItemDeleteOperationRequest } from './ArticleDomainItemDeleteOperationRequest';
import { type ArticleDomainItemDeleteOperationRequestHandler } from './ArticleDomainItemDeleteOperationRequestHandler';

interface Options {
  apiRequestHandler: ApiRequestHandler;
  repository: ArticleDomainRepository;
}

export class ArticleDomainItemDeleteOperationRequestHandlerImpl
  implements ArticleDomainItemDeleteOperationRequestHandler {
  private readonly apiRequestHandler: ApiRequestHandler;
  private readonly repository: ArticleDomainRepository;

  constructor (options: Options) {
    this.apiRequestHandler = options.apiRequestHandler;
    this.repository = options.repository;
  }

  async handle (
    request: ArticleDomainItemDeleteOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<ApiOperationResponse | null> {
    return await this.apiRequestHandler.handleWithInput<
      ArticleDomainItemGetOperationInput,
      ArticleDomainItemDeleteOperationRequest,
      ApiOperationResponse
    >(
      request,
      async () => {
        const { id, title, topicId } = request.input;

        const isInputValid = Number(id ?? 0) > 0 || (title && Number(topicId ?? 0) > 0);

        return isInputValid ? await this.repository.deleteItem(request) : null;
      },
      shouldBeCanceled
    );
  }
}
