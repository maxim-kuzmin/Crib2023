import { OperationStatus } from '../../../../../../common';
import {
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSliceName,
} from '../../../../../../features';
import { useStoreSaveActionDispatch } from './ArticleItemStoreSaveActionDispatchHook';
import { useStoreState } from '../../ArticleItemStoreStateHook';

export function useStoreSaveActionOutput (
  sliceName: ArticleItemStoreSliceName,
  input: ArticleItemStoreSaveActionInput = {}
): ArticleItemStoreSaveActionOutput {
  const { abortController } = input;

  const dispatchOfSaveAction = useStoreSaveActionDispatch(sliceName, { abortController });

  const { resultOfSaveCompletedAction, statusOfSaveAction } = useStoreState(sliceName);

  return {
    dispatchOfSaveAction,
    pendingOfSaveAction: statusOfSaveAction === OperationStatus.Pending,
    resultOfSaveCompletedAction,
  };
}
