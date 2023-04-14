import { type OperationState } from '../../../../common';
import { type ArticleItemStoreLoadActionPayload, type ArticleItemStoreSetActionPayload } from './Actions';

export interface ArticleItemStoreState extends OperationState {
  payloadFromLoadAction: ArticleItemStoreLoadActionPayload;
  payloadFromSetAction: ArticleItemStoreSetActionPayload;
}
