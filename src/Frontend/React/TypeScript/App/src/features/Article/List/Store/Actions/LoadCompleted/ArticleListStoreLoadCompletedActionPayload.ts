import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ArticleListStoreSliceName } from '../../Slice';
import { type ArticleListStoreLoadCompletedActionResult } from './ArticleListStoreLoadCompletedActionResult';

export interface ArticleListStoreLoadCompletedActionPayload
  extends StoreActionPayload<ArticleListStoreSliceName> {
  actionResult: ArticleListStoreLoadCompletedActionResult;
}

interface Options extends Omit<ArticleListStoreLoadCompletedActionPayload, 'actionResult'> {
  readonly actionResult?: ArticleListStoreLoadCompletedActionResult;
}

export function createArticleListStoreLoadCompletedActionPayload (
  options: Options
): ArticleListStoreLoadCompletedActionPayload {
  const { actionResult } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
