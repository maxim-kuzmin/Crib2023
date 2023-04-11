import { type ArticleItemStoreContentForInput, type ShouldBeCanceled } from '../../../../../all';

export interface ArticleItemStoreDispatchToLoad {
  run: (input: ArticleItemStoreContentForInput, shouldBeCanceled: ShouldBeCanceled) => void;
}
