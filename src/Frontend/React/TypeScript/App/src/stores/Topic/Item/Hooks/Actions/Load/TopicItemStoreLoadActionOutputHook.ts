import { StoreDispatchType, OperationStatus } from '../../../../../../common';
import {
  type TopicItemStoreLoadActionInput,
  type TopicItemStoreLoadActionOutput,
  type TopicItemStoreSliceName,
} from '../../../../../../features';
import { useStoreState } from '../../TopicItemStoreStateHook';
import { useStoreLoadActionDispatch } from './TopicItemStoreLoadActionDispatchHook';

export function useStoreLoadActionOutput (
  sliceName: TopicItemStoreSliceName,
  input: TopicItemStoreLoadActionInput
): TopicItemStoreLoadActionOutput {
  const { abortController, resultOfLoadAction } = input;

  const dispatchOfLoadAction = useStoreLoadActionDispatch(
    sliceName,
    {
      abortController,
      dispatchType: StoreDispatchType.MountOrUpdate,
      resultOfLoadAction
    }
  );

  const { resultOfLoadCompletedAction, statusOfLoadAction } = useStoreState(sliceName);

  return {
    dispatchOfLoadAction,
    pendingOfLoadAction: statusOfLoadAction === OperationStatus.Pending,
    resultOfLoadCompletedAction,
  };
}
