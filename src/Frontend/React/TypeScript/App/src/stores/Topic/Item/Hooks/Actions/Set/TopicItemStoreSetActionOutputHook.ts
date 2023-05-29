import {
  type TopicItemStoreSetActionOutput,
  type TopicItemStoreSliceName,
} from '../../../../../../features';
import { useStoreState } from '../../TopicItemStoreStateHook';
import { useStoreSetActionDispatch } from './TopicItemStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  sliceName: TopicItemStoreSliceName
): TopicItemStoreSetActionOutput {
  const dispatchOfSetAction = useStoreSetActionDispatch(sliceName);

  const { resultOfSetAction } = useStoreState(sliceName);

  return {
    dispatchOfSetAction,
    resultOfSetAction,
  };
}
