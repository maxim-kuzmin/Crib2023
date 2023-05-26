import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import { type ArticleDomainItemSaveOperationRequestHandler } from '../../../../../../domains';
import { type ArticleItemStoreSliceName } from '../../Slice';
import { type ArticleItemStoreResource } from '../../ArticleItemStoreResource';
import { type ArticleItemStoreSaveActionResult } from './ArticleItemStoreSaveActionResult';

export interface ArticleItemStoreSaveActionPayload
  extends StoreActionPayload<ArticleItemStoreSliceName> {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: ArticleItemStoreSaveActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleItemStore: ArticleItemStoreResource;
  readonly requestHandler: ArticleDomainItemSaveOperationRequestHandler;
}

interface Options extends Omit<ArticleItemStoreSaveActionPayload, 'actionResult'> {
  readonly actionResult?: ArticleItemStoreSaveActionResult;
}

export function createArticleItemStoreSaveActionPayload (
  options: Options
): ArticleItemStoreSaveActionPayload {
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
