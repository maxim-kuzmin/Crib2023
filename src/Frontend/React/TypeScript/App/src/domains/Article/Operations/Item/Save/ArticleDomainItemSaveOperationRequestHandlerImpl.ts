import { type ShouldBeCanceled } from '../../../../../common';
import { type ArticleTypeEntity, type ApiRequestHandler } from '../../../../../data';
import { type ArticleDomainRepository } from '../../../ArticleDomainRepository';
import { type ArticleDomainItemGetOperationOutput, type ArticleDomainItemGetOperationResponse } from '../Get';
import { type ArticleDomainItemSaveOperationRequest } from './ArticleDomainItemSaveOperationRequest';
import { type ArticleDomainItemSaveOperationRequestHandler } from './ArticleDomainItemSaveOperationRequestHandler';

interface Options {
  apiRequestHandler: ApiRequestHandler;
  repository: ArticleDomainRepository;
}

export class ArticleDomainItemSaveOperationRequestHandlerImpl implements ArticleDomainItemSaveOperationRequestHandler {
  private readonly apiRequestHandler: ApiRequestHandler;
  private readonly repository: ArticleDomainRepository;

  constructor (options: Options) {
    this.apiRequestHandler = options.apiRequestHandler;
    this.repository = options.repository;
  }

  async handle (
    request: ArticleDomainItemSaveOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<ArticleDomainItemGetOperationResponse | null> {
    return await this.apiRequestHandler.handleWithInputAndOutput<
      ArticleTypeEntity,
      ArticleDomainItemSaveOperationRequest,
      ArticleDomainItemGetOperationOutput,
      ArticleDomainItemGetOperationResponse
    >(
      request,
      async () => {
        const { title, topicId } = request.input;

        const isInputValid = title && Number(topicId ?? 0) > 0;

        return isInputValid ? await this.repository.saveItem(request) : null;
      },
      shouldBeCanceled
    );
  }
}
