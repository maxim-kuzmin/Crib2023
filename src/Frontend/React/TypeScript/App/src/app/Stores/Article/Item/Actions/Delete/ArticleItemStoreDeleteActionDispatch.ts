import { type ShouldBeCanceled } from '../../../../../../common';
import { type ArticleItemStoreDeleteActionPayload } from './ArticleItemStoreDeleteActionPayload';

export interface ArticleItemStoreDeleteActionDispatch {
  readonly run: (payload: ArticleItemStoreDeleteActionPayload, shouldBeCanceled?: ShouldBeCanceled) => void;
}
