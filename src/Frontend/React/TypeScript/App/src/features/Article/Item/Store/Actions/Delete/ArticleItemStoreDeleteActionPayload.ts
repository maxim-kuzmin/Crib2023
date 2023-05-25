import { type ApiResponseResource } from '../../../../../../data';
import { type ArticleDomainItemDeleteOperationRequestHandler } from '../../../../../../domains';
import { type ArticleItemStoreResource } from '../../ArticleItemStoreResource';
import { type ArticleItemStoreDeleteActionResult } from './ArticleItemStoreDeleteActionResult';

export interface ArticleItemStoreDeleteActionPayload {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: ArticleItemStoreDeleteActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleItemStore: ArticleItemStoreResource;
  readonly requestHandler: ArticleDomainItemDeleteOperationRequestHandler;
}

export function createArticleItemStoreDeleteActionPayload (
  options?: Partial<ArticleItemStoreDeleteActionPayload>
): ArticleItemStoreDeleteActionPayload {
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
