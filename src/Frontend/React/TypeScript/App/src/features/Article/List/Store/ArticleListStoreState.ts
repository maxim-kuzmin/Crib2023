import { OperationStatus } from '../../../../common';
import {
  type ArticleListStoreLoadActionResult,
  type ArticleListStoreLoadCompletedActionResult,
  type ArticleListStoreSetActionResult
} from './Actions';

export interface ArticleListStoreState {
  resultOfLoadAction: ArticleListStoreLoadActionResult;
  resultOfLoadCompletedAction: ArticleListStoreLoadCompletedActionResult;
  resultOfSetAction: ArticleListStoreSetActionResult;
  statusOfLoadAction: OperationStatus;
}

export function createArticleListStoreState (
  options?: Partial<ArticleListStoreState>
): ArticleListStoreState {
  return {
    resultOfLoadAction: options?.resultOfLoadAction ?? null,
    resultOfLoadCompletedAction: options?.resultOfLoadCompletedAction ?? null,
    resultOfSetAction: options?.resultOfSetAction ?? null,
    statusOfLoadAction: options?.statusOfLoadAction ?? OperationStatus.Initial,
  };
}
