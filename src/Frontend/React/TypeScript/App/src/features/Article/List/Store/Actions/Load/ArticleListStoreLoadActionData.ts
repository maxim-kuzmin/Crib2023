import { type ApiResponseResource } from '../../../../../../data';
import { type ArticleDomainListGetOperationRequestHandler } from '../../../../../../domains';
import { type ArticleListStoreResource } from '../../ArticleListStoreResource';

export interface ArticleListStoreLoadActionData {
  readonly abortSignal?: AbortSignal;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleListStore: ArticleListStoreResource;
  readonly requestHandler: ArticleDomainListGetOperationRequestHandler;
}

export function createArticleListStoreLoadActionData (
  options: ArticleListStoreLoadActionData
): ArticleListStoreLoadActionData {
  const {
    abortSignal,
    resourceOfApiResponse,
    resourceOfArticleListStore,
    requestHandler,
    } = options;

  return {
    abortSignal,
    resourceOfApiResponse,
    resourceOfArticleListStore,
    requestHandler,
  }
}
