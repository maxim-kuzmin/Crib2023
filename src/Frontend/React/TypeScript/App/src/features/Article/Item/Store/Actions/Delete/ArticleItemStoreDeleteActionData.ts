import { type ApiResponseResource } from '../../../../../../data';
import { type ArticleDomainItemDeleteOperationRequestHandler } from '../../../../../../domains';
import { type ArticleItemStoreResource } from '../../ArticleItemStoreResource';

export interface ArticleItemStoreDeleteActionData {
  readonly abortSignal?: AbortSignal;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleItemStore: ArticleItemStoreResource;
  readonly requestHandler: ArticleDomainItemDeleteOperationRequestHandler;
}

export function createArticleItemStoreDeleteActionData (
  options: ArticleItemStoreDeleteActionData
): ArticleItemStoreDeleteActionData {
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
