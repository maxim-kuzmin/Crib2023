import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ArticleItemStoreSliceName } from '../../Slice';
import { type ArticleItemStoreSaveActionResult } from './ArticleItemStoreSaveActionResult';

export interface ArticleItemStoreSaveActionPayload
  extends StoreActionPayload<ArticleItemStoreSliceName> {
  readonly actionResult: ArticleItemStoreSaveActionResult;
}

interface Options extends Omit<ArticleItemStoreSaveActionPayload, 'actionResult'> {
  readonly actionResult?: ArticleItemStoreSaveActionResult;
}

export function createArticleItemStoreSaveActionPayload (
  options: Options
): ArticleItemStoreSaveActionPayload {
  const {
    actionResult,
  } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
