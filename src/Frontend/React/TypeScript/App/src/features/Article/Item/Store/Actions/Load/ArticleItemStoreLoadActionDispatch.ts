import { type ShouldBeCanceled } from '../../../../../../common';
import { type ArticleItemStoreLoadActionPayload } from './ArticleItemStoreLoadActionPayload';

export interface ArticleItemStoreLoadActionDispatch {
  readonly run: (
    payload: ArticleItemStoreLoadActionPayload,
    shouldBeCanceled?: ShouldBeCanceled
  ) => Promise<void>;
}
