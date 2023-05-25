import { type ApiResponseResource } from '../../../../../../data';
import { type ArticleDomainItemGetOperationRequestHandler } from '../../../../../../domains';
import { type ArticleItemStoreResource } from '../../ArticleItemStoreResource';
import { type ArticleItemStoreLoadActionResult } from './ArticleItemStoreLoadActionResult';

export interface ArticleItemStoreLoadActionPayload {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: ArticleItemStoreLoadActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleItemStore: ArticleItemStoreResource;
  readonly requestHandler: ArticleDomainItemGetOperationRequestHandler;
}

export function createArticleItemStoreLoadActionPayload (
  options?: Partial<ArticleItemStoreLoadActionPayload>
): ArticleItemStoreLoadActionPayload {
  if (!options?.resourceOfApiResponse) {
    throw new Error('resourceOfApiResponse is undefined');
  }

  if (!options?.resourceOfArticleItemStore) {
    throw new Error('resourceOfArticleItemStore is undefined');
  }

  if (!options?.requestHandler) {
    throw new Error('requestHandler is undefined');
  }

  return {
    abortSignal: options?.abortSignal,
    actionResult: options?.actionResult ?? null,
    resourceOfApiResponse: options?.resourceOfApiResponse,
    resourceOfArticleItemStore: options?.resourceOfArticleItemStore,
    requestHandler: options?.requestHandler,
  };
}
