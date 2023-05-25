import { type ApiResponseResource } from '../../../../../../data';
import { type ArticleDomainItemSaveOperationRequestHandler } from '../../../../../../domains';
import { type ArticleItemStoreResource } from '../../ArticleItemStoreResource';
import { type ArticleItemStoreSaveActionResult } from './ArticleItemStoreSaveActionResult';

export interface ArticleItemStoreSaveActionPayload {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: ArticleItemStoreSaveActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleItemStore: ArticleItemStoreResource;
  readonly requestHandler: ArticleDomainItemSaveOperationRequestHandler;
}

export function createArticleItemStoreSaveActionPayload (
  options?: Partial<ArticleItemStoreSaveActionPayload>
): ArticleItemStoreSaveActionPayload {
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
