import { type OperationState } from '../../../../common';
import {
  type ArticleItemStoreDeleteActionPayload,
  type ArticleItemStoreDeleteCompletedActionPayload,
  type ArticleItemStoreSaveActionPayload,
  type ArticleItemStoreLoadActionPayload,
  type ArticleItemStoreSetActionPayload
} from './Actions';

export interface ArticleItemStoreState extends OperationState {
  payloadFromDeleteAction: ArticleItemStoreDeleteActionPayload;
  payloadFromDeleteCompletedAction: ArticleItemStoreDeleteCompletedActionPayload;
  payloadFromLoadAction: ArticleItemStoreLoadActionPayload;
  payloadFromSaveAction: ArticleItemStoreSaveActionPayload;
  payloadFromSetAction: ArticleItemStoreSetActionPayload;
}
