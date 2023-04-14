import { type ShouldBeCanceled } from '../../../../../../common';
import { type ArticleListStoreLoadActionPayload } from './ArticleListStoreLoadActionPayload';

export interface ArticleListStoreLoadActionDispatch {
  run: (payload: ArticleListStoreLoadActionPayload, shouldBeCanceled: ShouldBeCanceled) => void;
}
