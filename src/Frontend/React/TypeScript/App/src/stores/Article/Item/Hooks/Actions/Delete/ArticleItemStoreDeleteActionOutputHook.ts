import { OperationStatus } from '../../../../../../common';
import {
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreSliceName,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useStoreDeleteActionDispatch } from './ArticleItemStoreDeleteActionDispatchHook';

export function useStoreDeleteActionOutput (
  sliceName: ArticleItemStoreSliceName,
  input: ArticleItemStoreDeleteActionInput = {}
): ArticleItemStoreDeleteActionOutput {
  const { abortController } = input;

  const dispatchOfDeleteAction = useStoreDeleteActionDispatch(sliceName, { abortController });

  const { resultOfDeleteCompletedAction, statusOfDeleteAction } = useStoreState(sliceName);

  return {
    dispatchOfDeleteAction,
    pendingOfDeleteAction: statusOfDeleteAction === OperationStatus.Pending,
    resultOfDeleteCompletedAction,
  };
}
