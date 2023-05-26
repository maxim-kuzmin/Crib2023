import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import { type ArticleDomainListGetOperationRequestHandler } from '../../../../../../domains';
import { type ArticleListStoreResource } from '../../ArticleListStoreResource';
import { type ArticleListStoreSliceName } from '../../Slice';
import { type ArticleListStoreLoadActionResult } from './ArticleListStoreLoadActionResult';

export interface ArticleListStoreLoadActionPayload
  extends StoreActionPayload<ArticleListStoreSliceName> {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: ArticleListStoreLoadActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleListStore: ArticleListStoreResource;
  readonly requestHandler: ArticleDomainListGetOperationRequestHandler;
}

interface Options extends Omit<ArticleListStoreLoadActionPayload, 'actionResult'> {
  readonly actionResult?: ArticleListStoreLoadActionResult;
}

export function createArticleListStoreLoadActionPayload (
  options: Options
): ArticleListStoreLoadActionPayload {
  const {
    abortSignal,
    actionResult,
    resourceOfApiResponse,
    resourceOfArticleListStore,
    requestHandler,
  } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    abortSignal,
    actionResult: actionResult ?? null,
    resourceOfApiResponse,
    resourceOfArticleListStore,
    requestHandler,
  };
}
