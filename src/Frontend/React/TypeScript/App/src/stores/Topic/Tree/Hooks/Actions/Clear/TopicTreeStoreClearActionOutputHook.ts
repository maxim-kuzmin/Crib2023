import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreClearActionOutput,
  type TopicTreeStoreSliceName,
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './TopicTreeStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  sliceName: TopicTreeStoreSliceName
): TopicTreeStoreClearActionOutput {
  const dispatchOfClearAction = useStoreClearActionDispatch(
    sliceName,
    {
      dispatchType: StoreDispatchType.Unmount
    }
  );

  return {
    dispatchOfClearAction
  };
}
