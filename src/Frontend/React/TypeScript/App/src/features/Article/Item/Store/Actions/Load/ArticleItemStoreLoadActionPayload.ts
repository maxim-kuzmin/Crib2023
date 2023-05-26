import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import { type ArticleDomainItemGetOperationRequestHandler } from '../../../../../../domains';
import { type ArticleItemStoreResource } from '../../ArticleItemStoreResource';
import { type ArticleItemStoreSliceName } from '../../Slice';
import { type ArticleItemStoreLoadActionResult } from './ArticleItemStoreLoadActionResult';

export interface ArticleItemStoreLoadActionPayload
  extends StoreActionPayload<ArticleItemStoreSliceName> {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: ArticleItemStoreLoadActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleItemStore: ArticleItemStoreResource;
  readonly requestHandler: ArticleDomainItemGetOperationRequestHandler;
}

interface Options extends Omit<ArticleItemStoreLoadActionPayload, 'actionResult'> {
  readonly actionResult?: ArticleItemStoreLoadActionResult;
}

export function createArticleItemStoreLoadActionPayload (
  options: Options
): ArticleItemStoreLoadActionPayload {
  const {
    abortSignal,
    actionResult,
    resourceOfApiResponse,
    resourceOfArticleItemStore,
    requestHandler,
  } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    abortSignal,
    actionResult: actionResult ?? null,
    resourceOfApiResponse,
    resourceOfArticleItemStore,
    requestHandler,
  };
}
