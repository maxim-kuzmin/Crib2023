import { type ShouldBeCanceled } from '../../../../../common';
import { type ApiOperationResponse, type ApiRequestHandler } from '../../../../../data';
import { type ArticleDomainRepository } from '../../../ArticleDomainRepository';
import { type ArticleDomainItemGetOperationInput } from '../Get';
import { type ArticleDomainItemDeleteOperationRequest } from './ArticleDomainItemDeleteOperationRequest';
import { type ArticleDomainItemDeleteOperationRequestHandler } from './ArticleDomainItemDeleteOperationRequestHandler';

interface Options {
  handlerOfApiRequest: ApiRequestHandler;
  repository: ArticleDomainRepository;
}

export class ArticleDomainItemDeleteOperationRequestHandlerImpl
  implements ArticleDomainItemDeleteOperationRequestHandler {
  private readonly handlerOfApiRequest: ApiRequestHandler;
  private readonly repository: ArticleDomainRepository;

  constructor (options: Options) {
    this.handlerOfApiRequest = options.handlerOfApiRequest;
    this.repository = options.repository;
  }

  async handle (
    request: ArticleDomainItemDeleteOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<ApiOperationResponse | null> {
    return await this.handlerOfApiRequest.handleWithInput<
      ArticleDomainItemGetOperationInput,
      ArticleDomainItemDeleteOperationRequest,
      ApiOperationResponse
    >(
      request,
      async () => {
        const { id, title, topicId } = request.input;

        const isInputValid = Number(id ?? 0) > 0 || (title && Number(topicId ?? 0) > 0);

        if (isInputValid) {
          return await this.repository.deleteItem(request);
        }

        return null;
      },
      shouldBeCanceled
    );
  }
}
