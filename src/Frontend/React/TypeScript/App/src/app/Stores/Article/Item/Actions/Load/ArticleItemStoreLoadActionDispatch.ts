import { type ArticleItemStoreLoadActionPayload, type ShouldBeCanceled } from '../../../../../../all';

export interface ArticleItemStoreLoadActionDispatch {
  run: (payload: ArticleItemStoreLoadActionPayload, shouldBeCanceled: ShouldBeCanceled) => void;
}
