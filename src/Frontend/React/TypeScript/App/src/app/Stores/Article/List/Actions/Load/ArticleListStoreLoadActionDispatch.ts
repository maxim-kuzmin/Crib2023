import { type ArticleListStoreLoadActionPayload, type ShouldBeCanceled } from '../../../../../../all';

export interface ArticleListStoreLoadActionDispatch {
  run: (input: ArticleListStoreLoadActionPayload, shouldBeCanceled: ShouldBeCanceled) => void;
}
