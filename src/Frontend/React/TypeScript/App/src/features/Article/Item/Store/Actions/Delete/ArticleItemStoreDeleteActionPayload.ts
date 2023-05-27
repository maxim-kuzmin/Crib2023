import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ArticleItemStoreSliceName } from '../../Slice';
import { type ArticleItemStoreDeleteActionResult } from './ArticleItemStoreDeleteActionResult';

export interface ArticleItemStoreDeleteActionPayload
  extends StoreActionPayload<ArticleItemStoreSliceName> {
  readonly actionResult: ArticleItemStoreDeleteActionResult;
}

interface Options extends Omit<ArticleItemStoreDeleteActionPayload, 'actionResult'> {
  readonly actionResult?: ArticleItemStoreDeleteActionResult;
}

export function createArticleItemStoreDeleteActionPayload (
  options: Options
): ArticleItemStoreDeleteActionPayload {
  const {
    actionResult,
  } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
