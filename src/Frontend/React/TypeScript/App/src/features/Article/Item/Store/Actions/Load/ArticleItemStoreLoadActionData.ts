import { type ApiResponseResource } from '../../../../../../data';
import { type ArticleDomainItemGetOperationRequestHandler } from '../../../../../../domains';
import { type ArticleItemStoreResource } from '../../ArticleItemStoreResource';

export interface ArticleItemStoreLoadActionData {
  readonly abortSignal?: AbortSignal;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleItemStore: ArticleItemStoreResource;
  readonly requestHandler: ArticleDomainItemGetOperationRequestHandler;
}

export function createArticleItemStoreLoadActionData (
  options: ArticleItemStoreLoadActionData
): ArticleItemStoreLoadActionData {
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
