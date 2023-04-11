import { type ArticleItemStoreLoadActionPayload, type ShouldBeCanceled } from '../../../../../../all';

export interface ArticleItemStoreLoadActionDispatch {
  run: (input: ArticleItemStoreLoadActionPayload, shouldBeCanceled: ShouldBeCanceled) => void;
}
