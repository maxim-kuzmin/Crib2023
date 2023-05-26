import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ArticleItemStoreSliceName } from '../../Slice';
import { type ArticleItemStoreSetActionResult } from './ArticleItemStoreSetActionResult';

export interface ArticleItemStoreSetActionPayload
  extends StoreActionPayload<ArticleItemStoreSliceName> {
  actionResult: ArticleItemStoreSetActionResult;
}

interface Options extends Omit<ArticleItemStoreSetActionPayload, 'actionResult'> {
  readonly actionResult?: ArticleItemStoreSetActionResult;
}

export function createArticleItemStoreSetActionPayload (
  options: Options
): ArticleItemStoreSetActionPayload {
  const { actionResult } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
