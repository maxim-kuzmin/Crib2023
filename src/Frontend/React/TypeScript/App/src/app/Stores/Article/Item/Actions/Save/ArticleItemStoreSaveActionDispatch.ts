import { type ShouldBeCanceled } from '../../../../../../common';
import { type ArticleItemStoreSaveActionPayload } from './ArticleItemStoreSaveActionPayload';

export interface ArticleItemStoreSaveActionDispatch {
  readonly run: (payload: ArticleItemStoreSaveActionPayload, shouldBeCanceled: ShouldBeCanceled) => void;
}
