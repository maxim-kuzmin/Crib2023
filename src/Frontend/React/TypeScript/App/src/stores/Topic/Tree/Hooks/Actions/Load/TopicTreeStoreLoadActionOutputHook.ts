import { StoreDispatchType, OperationStatus } from '../../../../../../common';
import {
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreSliceName,
} from '../../../../../../features';
import { useStoreState } from '../../TopicTreeStoreStateHook';
import { useStoreLoadActionDispatch } from './TopicTreeStoreLoadActionDispatchHook';

export function useStoreLoadActionOutput (
  sliceName: TopicTreeStoreSliceName,
  input: TopicTreeStoreLoadActionInput
): TopicTreeStoreLoadActionOutput {
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
