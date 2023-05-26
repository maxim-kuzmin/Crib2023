import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ArticleItemStoreSliceName } from '../../Slice';
import { type ArticleItemStoreDeleteCompletedActionResult } from './ArticleItemStoreDeleteCompletedActionResult';

export interface ArticleItemStoreDeleteCompletedActionPayload
  extends StoreActionPayload<ArticleItemStoreSliceName> {
  actionResult: ArticleItemStoreDeleteCompletedActionResult;
}

interface Options extends Omit<ArticleItemStoreDeleteCompletedActionPayload, 'actionResult'> {
  readonly actionResult?: ArticleItemStoreDeleteCompletedActionResult;
}

export function createArticleItemStoreDeleteCompletedActionPayload (
  options: Options
): ArticleItemStoreDeleteCompletedActionPayload {
  const { actionResult } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
