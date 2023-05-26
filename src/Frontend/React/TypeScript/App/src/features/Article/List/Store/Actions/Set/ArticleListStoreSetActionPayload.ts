import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ArticleListStoreSliceName } from '../../Slice';
import { type ArticleListStoreSetActionResult } from './ArticleListStoreSetActionResult';

export interface ArticleListStoreSetActionPayload
  extends StoreActionPayload<ArticleListStoreSliceName> {
  actionResult: ArticleListStoreSetActionResult;
}

interface Options extends Omit<ArticleListStoreSetActionPayload, 'actionResult'> {
  readonly actionResult?: ArticleListStoreSetActionResult;
}

export function createArticleListStoreSetActionPayload (
  options: Options
): ArticleListStoreSetActionPayload {
  const { actionResult } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
