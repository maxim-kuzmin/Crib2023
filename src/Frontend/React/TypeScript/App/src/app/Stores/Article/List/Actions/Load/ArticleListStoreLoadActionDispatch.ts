import { type ArticleListStoreLoadActionPayload, type ShouldBeCanceled } from '../../../../../../all';

export interface ArticleListStoreLoadActionDispatch {
  run: (payload: ArticleListStoreLoadActionPayload, shouldBeCanceled: ShouldBeCanceled) => void;
}
