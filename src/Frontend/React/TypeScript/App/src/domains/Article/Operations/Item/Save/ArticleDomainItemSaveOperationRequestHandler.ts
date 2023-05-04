import { type ShouldBeCanceled } from '../../../../../common';
import { type ArticleTypeEntity, type ApiRequestHandler } from '../../../../../data';
import { type ArticleDomainRepository } from '../../../ArticleDomainRepository';
import { type ArticleDomainItemGetOperationOutput, type ArticleDomainItemGetOperationResponse } from '../Get';
import { type ArticleDomainItemSaveOperationRequest } from './ArticleDomainItemSaveOperationRequest';

export interface ArticleDomainItemSaveOperationRequestHandler {
  handle: (
    request: ArticleDomainItemSaveOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<ArticleDomainItemGetOperationResponse | null>;
}

interface Options {
  apiRequestHandler: ApiRequestHandler;
  repository: ArticleDomainRepository;
}

class Implementation implements ArticleDomainItemSaveOperationRequestHandler {
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

        if (isInputValid) {
          return await this.repository.saveItem(request);
        }

        return null;
      },
      shouldBeCanceled
    );
  }
}

export function createArticleDomainItemSaveOperationRequestHandler (
  options: Options
): ArticleDomainItemSaveOperationRequestHandler {
  return new Implementation(options);
}
