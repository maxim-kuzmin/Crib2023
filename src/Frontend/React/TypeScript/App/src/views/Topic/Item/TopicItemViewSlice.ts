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

  function useLoadActionOutput (options: LoadActionInput): LoadActionOutput {
    const { topicId, isCanceled, onTopicItemLoaded } = options;

    const { payloadFromSetAction, status } = useStoreState();

    const callback = useCallback((payload: TopicItemStoreSetActionPayload) => {
        console.log('MAKC:createTopicItemViewHooks:useLoadActionOutput:callback:payload', payload);

        if (onTopicItemLoaded) {
          onTopicItemLoaded(payload);
        }
      },
      [onTopicItemLoaded]
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

    return {
      loading: status === OperationStatus.Pending,
      payload: payloadFromSetAction
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
