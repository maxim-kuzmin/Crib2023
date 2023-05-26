import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import { type ArticleDomainItemDeleteOperationRequestHandler } from '../../../../../../domains';
import { type ArticleItemStoreResource } from '../../ArticleItemStoreResource';
import { type ArticleItemStoreSliceName } from '../../Slice';
import { type ArticleItemStoreDeleteActionResult } from './ArticleItemStoreDeleteActionResult';

export interface ArticleItemStoreDeleteActionPayload
  extends StoreActionPayload<ArticleItemStoreSliceName> {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: ArticleItemStoreDeleteActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleItemStore: ArticleItemStoreResource;
  readonly requestHandler: ArticleDomainItemDeleteOperationRequestHandler;
}

interface Options extends Omit<ArticleItemStoreDeleteActionPayload, 'actionResult'> {
  readonly actionResult?: ArticleItemStoreDeleteActionResult;
}

export function createArticleItemStoreDeleteActionPayload (
  options: Options
): ArticleItemStoreDeleteActionPayload {
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
