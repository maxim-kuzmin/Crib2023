import { type ArticleTypeEntity, type ApiRequestHandler } from '../../../../../data';
import { type ArticleDomainRepository } from '../../../ArticleDomainRepository';
import { type ArticleDomainItemGetOperationOutput, type ArticleDomainItemGetOperationResponse } from '../Get';
import { type ArticleDomainItemSaveOperationRequest } from './ArticleDomainItemSaveOperationRequest';

export interface ArticleDomainItemSaveOperationRequestHandler {
  handle: (
    request: ArticleDomainItemSaveOperationRequest,
    abortSignal?: AbortSignal
  ) => Promise<ArticleDomainItemGetOperationResponse | null>;
}

interface Options {
  handlerOfApiRequest: ApiRequestHandler;
  repository: ArticleDomainRepository;
}

class Implementation implements ArticleDomainItemSaveOperationRequestHandler {
  private readonly handlerOfApiRequest: ApiRequestHandler;
  private readonly repository: ArticleDomainRepository;

  constructor (options: Options) {
    this.handlerOfApiRequest = options.handlerOfApiRequest;
    this.repository = options.repository;
  }

  async handle (
    request: ArticleDomainItemSaveOperationRequest,
    abortSignal?: AbortSignal
  ): Promise<ArticleDomainItemGetOperationResponse | null> {
    return await this.handlerOfApiRequest.handleWithInputAndOutput<
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
          return await this.repository.saveItem(request, abortSignal);
        }

        return null;
      },
      abortSignal
    );
  }
}

export function createArticleDomainItemSaveOperationRequestHandler (
  options: Options
): ArticleDomainItemSaveOperationRequestHandler {
  return new Implementation(options);
}
