import { OperationStatus } from '../../../../common';
import {
  type ArticleListStoreLoadActionPayload,
  type ArticleListStoreLoadCompletedActionPayload,
  type ArticleListStoreSetActionPayload
} from './Actions';

export interface ArticleListStoreState {
  payloadOfLoadAction: ArticleListStoreLoadActionPayload;
  payloadOfLoadCompletedAction: ArticleListStoreLoadCompletedActionPayload;
  payloadOfSetAction: ArticleListStoreSetActionPayload;
  statusOfLoadAction: OperationStatus;
}

export function createArticleListStoreState (
  options?: Partial<ArticleListStoreState>
): ArticleListStoreState {
  return {
    payloadOfLoadAction: options?.payloadOfLoadAction ?? null,
    payloadOfLoadCompletedAction: options?.payloadOfLoadCompletedAction ?? null,
    payloadOfSetAction: options?.payloadOfSetAction ?? null,
    statusOfLoadAction: options?.statusOfLoadAction ?? OperationStatus.Initial,
  };
}
