import { type ShouldBeCanceled } from '../../../../../../common';
import { type ArticleItemStoreLoadActionPayload } from './ArticleItemStoreLoadActionPayload';

export interface ArticleItemStoreLoadActionDispatch {
  run: (payload: ArticleItemStoreLoadActionPayload, shouldBeCanceled: ShouldBeCanceled) => void;
}
