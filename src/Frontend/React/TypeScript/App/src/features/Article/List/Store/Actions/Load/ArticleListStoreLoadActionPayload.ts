import { type ApiResponseResource } from '../../../../../../data';
import { type ArticleDomainListGetOperationRequestHandler } from '../../../../../../domains';
import { type ArticleListStoreResource } from '../../ArticleListStoreResource';
import { type ArticleListStoreLoadActionResult } from './ArticleListStoreLoadActionResult';

export interface ArticleListStoreLoadActionPayload {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: ArticleListStoreLoadActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleListStore: ArticleListStoreResource;
  readonly requestHandler: ArticleDomainListGetOperationRequestHandler;
}

export function createArticleListStoreLoadActionPayload (
  options?: Partial<ArticleListStoreLoadActionPayload>
): ArticleListStoreLoadActionPayload {
  if (!options?.resourceOfApiResponse) {
    throw new Error('resourceOfApiResponse is undefined');
  }

  if (!options?.resourceOfArticleListStore) {
    throw new Error('resourceOfArticleListStore is undefined');
  }

  if (!options?.requestHandler) {
    throw new Error('requestHandler is undefined');
  }

  return {
    abortSignal: options?.abortSignal,
    actionResult: options?.actionResult ?? null,
    resourceOfApiResponse: options?.resourceOfApiResponse,
    resourceOfArticleListStore: options?.resourceOfArticleListStore,
    requestHandler: options?.requestHandler,
  };
}
