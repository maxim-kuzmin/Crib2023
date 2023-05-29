import { OperationStatus } from '../../../../../../common';
import {
  type TopicItemStoreSaveActionInput,
  type TopicItemStoreSaveActionOutput,
  type TopicItemStoreSliceName,
} from '../../../../../../features';
import { useStoreSaveActionDispatch } from './TopicItemStoreSaveActionDispatchHook';
import { useStoreState } from '../../TopicItemStoreStateHook';

export function useStoreSaveActionOutput (
  sliceName: TopicItemStoreSliceName,
  input: TopicItemStoreSaveActionInput = {}
): TopicItemStoreSaveActionOutput {
  const { abortController } = input;

  const dispatchOfSaveAction = useStoreSaveActionDispatch(sliceName, { abortController });

  const { resultOfSaveCompletedAction, statusOfSaveAction } = useStoreState(sliceName);

  return {
    dispatchOfSaveAction,
    pendingOfSaveAction: statusOfSaveAction === OperationStatus.Pending,
    resultOfSaveCompletedAction,
  };
}
