import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ArticleItemStoreSliceName } from '../../Slice';
import { type ArticleItemStoreSaveCompletedActionResult } from './ArticleItemStoreSaveCompletedActionResult';

export interface ArticleItemStoreSaveCompletedActionPayload
  extends StoreActionPayload<ArticleItemStoreSliceName> {
  actionResult: ArticleItemStoreSaveCompletedActionResult;
}

interface Options extends Omit<ArticleItemStoreSaveCompletedActionPayload, 'actionResult'> {
  readonly actionResult?: ArticleItemStoreSaveCompletedActionResult;
}

export function createArticleItemStoreSaveCompletedActionPayload (
  options: Options
): ArticleItemStoreSaveCompletedActionPayload {
  const { actionResult } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
