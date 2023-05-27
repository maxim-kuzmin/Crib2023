import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ArticleListStoreSliceName } from '../../Slice';
import { type ArticleListStoreLoadActionResult } from './ArticleListStoreLoadActionResult';

export interface ArticleListStoreLoadActionPayload
  extends StoreActionPayload<ArticleListStoreSliceName> {
  readonly actionResult: ArticleListStoreLoadActionResult;
}

interface Options extends Omit<ArticleListStoreLoadActionPayload, 'actionResult'> {
  readonly actionResult?: ArticleListStoreLoadActionResult;
}

export function createArticleListStoreLoadActionPayload (
  options: Options
): ArticleListStoreLoadActionPayload {
  const {
    actionResult,
  } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
