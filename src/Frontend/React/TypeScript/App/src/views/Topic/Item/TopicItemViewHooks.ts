import { useCallback, useMemo } from 'react';
import { getModule } from '../../../app/ModuleImpl';
import {
  type TopicItemStoreSetActionPayload,
  type TopicItemStoreClearActionDispatch,
  type TopicItemStoreClearActionOptions,
  type TopicItemStoreLoadActionDispatch,
  type TopicItemStoreLoadActionOptions,
  type TopicItemStoreSetActionDispatch,
  type TopicItemStoreSetActionOptions,
  type TopicItemStoreState
} from '../../../app/Stores';
import { OperationStatus, StoreDispatchType, TreeGetOperationAxisForItem } from '../../../common';
import { type TopicDomainItemGetOperationInput } from '../../../domains';

type ClearActionDispatch = TopicItemStoreClearActionDispatch;
type ClearActionOptions = TopicItemStoreClearActionOptions;

type LoadActionDispatch = TopicItemStoreLoadActionDispatch;
type LoadActionOptions = TopicItemStoreLoadActionOptions;

type SetActionDispatch = TopicItemStoreSetActionDispatch;
type SetActionOptions = TopicItemStoreSetActionOptions;

type State = TopicItemStoreState;

export interface TopicItemViewHooks {
  readonly useDispatchToClear: (options: ClearActionOptions) => ClearActionDispatch;
  readonly useDispatchToLoad: (options: LoadActionOptions) => LoadActionDispatch;
  readonly useDispatchToSet: (options: SetActionOptions) => SetActionDispatch;
  readonly useState: () => State;
}

interface LoadOptions {
  readonly topicId: number;
  readonly isCanceled?: boolean;
  readonly onTopicLoaded?: (payload: TopicItemStoreSetActionPayload) => void;
}

interface LoadResult {
  readonly loading: boolean;
  readonly payload: TopicItemStoreSetActionPayload;
}

export function useTopicItemViewLoad (options: LoadOptions): LoadResult {
  const { topicId, isCanceled, onTopicLoaded } = options;

  const hooks = getModule().getTopicItemViewHooks();

  const { payloadFromSetAction, status } = hooks.useState();

  const callback = useCallback((payload: TopicItemStoreSetActionPayload) => {
    console.log('MAKC:useTopicItemViewLoad:callback:payload', payload);

    if (onTopicLoaded) {
      onTopicLoaded(payload);
    }
  }, [onTopicLoaded]);

  const payload: TopicDomainItemGetOperationInput = useMemo(
    () => ({
      axis: TreeGetOperationAxisForItem.Self,
      id: topicId
    }),
    [topicId]
  );

  hooks.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback,
    isCanceled,
    payload
  });

  hooks.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  return {
    loading: status === OperationStatus.Pending,
    payload: payloadFromSetAction
  };
}
