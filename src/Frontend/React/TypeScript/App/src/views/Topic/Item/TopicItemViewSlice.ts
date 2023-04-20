import { useCallback, useMemo } from 'react';
import {
  type TopicItemStoreClearActionDispatch,
  type TopicItemStoreClearActionOptions,
  type TopicItemStoreHooks,
  type TopicItemStoreLoadActionDispatch,
  type TopicItemStoreLoadActionInput,
  type TopicItemStoreLoadActionOptions,
  type TopicItemStoreLoadActionOutput,
  type TopicItemStoreSetActionDispatch,
  type TopicItemStoreSetActionOptions,
  type TopicItemStoreSetActionPayload,
  TopicItemStoreSliceName,
  type TopicItemStoreState
} from '../../../app/Stores';
import { OperationStatus, StoreDispatchType, TreeGetOperationAxisForItem } from '../../../common';
import { type TopicDomainItemGetOperationInput } from '../../../domains';
import { type TopicItemViewHooks } from './TopicItemViewHooks';

type ClearActionDispatch = TopicItemStoreClearActionDispatch;
type ClearActionOptions = TopicItemStoreClearActionOptions;

type LoadActionDispatch = TopicItemStoreLoadActionDispatch;
type LoadActionInput = TopicItemStoreLoadActionInput;
type LoadActionOptions = TopicItemStoreLoadActionOptions;
type LoadActionOutput = TopicItemStoreLoadActionOutput;

type SetActionDispatch = TopicItemStoreSetActionDispatch;
type SetActionOptions = TopicItemStoreSetActionOptions;

type StoreState = TopicItemStoreState;

export function createTopicItemViewHooks (
  hooks: TopicItemStoreHooks
): TopicItemViewHooks {
  const sliceName = TopicItemStoreSliceName.TopicItemView;

  function useClearActionDispatch (options: ClearActionOptions): ClearActionDispatch {
    return hooks.useClearActionDispatch(sliceName, options);
  }

  function useLoadActionDispatch (options: LoadActionOptions): LoadActionDispatch {
    return hooks.useLoadActionDispatch(sliceName, options);
  }

  function useSetActionDispatch (options: SetActionOptions): SetActionDispatch {
    return hooks.useSetActionDispatch(sliceName, options);
  }

  function useStoreState (): StoreState {
    return hooks.useStoreState(sliceName);
  }

  function useLoadActionOutput (input: LoadActionInput): LoadActionOutput {
    const { topicId, isCanceled, onActionCompleted } = input;

    const callback = useCallback((payload: TopicItemStoreSetActionPayload) => {
        if (onActionCompleted) {
          onActionCompleted(payload);
        }
      },
      [onActionCompleted]
    );

    const payload: TopicDomainItemGetOperationInput = useMemo(
      () => ({
        axis: TreeGetOperationAxisForItem.Self,
        id: topicId
      }),
      [topicId]
    );

    useLoadActionDispatch({
      dispatchType: StoreDispatchType.MountOrUpdate,
      callback,
      isCanceled,
      payload
    });

    useClearActionDispatch({
      dispatchType: StoreDispatchType.Unmount
    });

    const { payloadOfSetAction, statusOfLoadAction } = useStoreState();

    return {
      loading: statusOfLoadAction === OperationStatus.Pending,
      payload: payloadOfSetAction
    };
  }

  return {
    useClearActionDispatch,
    useLoadActionDispatch,
    useLoadActionOutput,
    useSetActionDispatch,
    useStoreState
  };
}
