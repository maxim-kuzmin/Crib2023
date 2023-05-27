import { type ApiResponseResource } from '../../../../../../data';
import { type ArticleDomainItemSaveOperationRequestHandler } from '../../../../../../domains';
import { type ArticleItemStoreResource } from '../../ArticleItemStoreResource';

export interface ArticleItemStoreSaveActionData {
  readonly abortSignal?: AbortSignal;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleItemStore: ArticleItemStoreResource;
  readonly requestHandler: ArticleDomainItemSaveOperationRequestHandler;
}

export function createArticleItemStoreSaveActionData (
  options: ArticleItemStoreSaveActionData
): ArticleItemStoreSaveActionData {
  const {
    abortSignal,
    resourceOfApiResponse,
    resourceOfArticleItemStore,
    requestHandler,
    } = options;

  return {
    abortSignal,
    resourceOfApiResponse,
    resourceOfArticleItemStore,
    requestHandler,
  }
}
