import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ArticleItemStoreSliceName } from '../../Slice';
import { type ArticleItemStoreLoadActionResult } from './ArticleItemStoreLoadActionResult';

export interface ArticleItemStoreLoadActionPayload
  extends StoreActionPayload<ArticleItemStoreSliceName> {
  readonly actionResult: ArticleItemStoreLoadActionResult;
}

interface Options extends Omit<ArticleItemStoreLoadActionPayload, 'actionResult'> {
  readonly actionResult?: ArticleItemStoreLoadActionResult;
}

export function createArticleItemStoreLoadActionPayload (
  options: Options
): ArticleItemStoreLoadActionPayload {
  const {
    actionResult,
  } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
