import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreClearActionOutput,
  type TopicItemStoreSliceName,
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './TopicItemStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  sliceName: TopicItemStoreSliceName
): TopicItemStoreClearActionOutput {
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
