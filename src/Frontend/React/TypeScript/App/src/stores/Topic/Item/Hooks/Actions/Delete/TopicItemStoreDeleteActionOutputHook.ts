import { OperationStatus } from '../../../../../../common';
import {
  type TopicItemStoreDeleteActionInput,
  type TopicItemStoreDeleteActionOutput,
  type TopicItemStoreSliceName,
} from '../../../../../../features';
import { useStoreState } from '../../TopicItemStoreStateHook';
import { useStoreDeleteActionDispatch } from './TopicItemStoreDeleteActionDispatchHook';

export function useStoreDeleteActionOutput (
  sliceName: TopicItemStoreSliceName,
  input: TopicItemStoreDeleteActionInput = {}
): TopicItemStoreDeleteActionOutput {
  const { abortController } = input;

  const dispatchOfDeleteAction = useStoreDeleteActionDispatch(sliceName, { abortController });

  const { resultOfDeleteCompletedAction, statusOfDeleteAction } = useStoreState(sliceName);

  return {
    dispatchOfDeleteAction,
    pendingOfDeleteAction: statusOfDeleteAction === OperationStatus.Pending,
    resultOfDeleteCompletedAction,
  };
}
