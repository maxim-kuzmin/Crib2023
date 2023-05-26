import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ArticleItemStoreSliceName } from '../../Slice';
import { type ArticleItemStoreLoadCompletedActionResult } from './ArticleItemStoreLoadCompletedActionResult';

export interface ArticleItemStoreLoadCompletedActionPayload
  extends StoreActionPayload<ArticleItemStoreSliceName> {
  actionResult: ArticleItemStoreLoadCompletedActionResult;
}

interface Options extends Omit<ArticleItemStoreLoadCompletedActionPayload, 'actionResult'> {
  readonly actionResult?: ArticleItemStoreLoadCompletedActionResult;
}

export function createArticleItemStoreLoadCompletedActionPayload (
  options: Options
): ArticleItemStoreLoadCompletedActionPayload {
  const { actionResult } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
