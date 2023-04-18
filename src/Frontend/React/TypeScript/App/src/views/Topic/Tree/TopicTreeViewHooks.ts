import { useCallback, useMemo } from 'react';
import { getModule } from '../../../app/ModuleImpl';
import {
  type TopicTreeStoreSetActionPayload,
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreClearActionOptions,
  type TopicTreeStoreLoadActionDispatch,
  type TopicTreeStoreLoadActionOptions,
  type TopicTreeStoreSetActionDispatch,
  type TopicTreeStoreSetActionOptions,
  type TopicTreeStoreState
} from '../../../app/Stores';
import { type TopicDomainTreeGetOperationInput } from '../../../domains';
import { OperationStatus, StoreDispatchType, type TreeGetOperationAxisForList } from '../../../common';

type ClearActionDispatch = TopicTreeStoreClearActionDispatch;
type ClearActionOptions = TopicTreeStoreClearActionOptions;

type LoadActionDispatch = TopicTreeStoreLoadActionDispatch;
type LoadActionOptions = TopicTreeStoreLoadActionOptions;

type SetActionDispatch = TopicTreeStoreSetActionDispatch;
type SetActionOptions = TopicTreeStoreSetActionOptions;

type State = TopicTreeStoreState;

export interface TopicTreeViewHooks {
  readonly useDispatchToClear: (options: ClearActionOptions) => ClearActionDispatch;
  readonly useDispatchToLoad: (options: LoadActionOptions) => LoadActionDispatch;
  readonly useDispatchToSet: (options: SetActionOptions) => SetActionDispatch;
  readonly useState: () => State;
}

interface LoadOptions {
  readonly axis: TreeGetOperationAxisForList;
  readonly sortField?: string;
  readonly sortDirection?: 'asc' | 'desc';
  readonly topicId: number;
  readonly isCanceled?: boolean;
  readonly onTopicTreeLoaded?: (payload: TopicTreeStoreSetActionPayload) => void;
}

interface LoadResult {
  readonly loading: boolean;
  readonly payload: TopicTreeStoreSetActionPayload;
}

export function useTopicTreeViewLoad (options: LoadOptions): LoadResult {
  const { axis, sortField, sortDirection, topicId, isCanceled, onTopicTreeLoaded } = options;

  const hooks = getModule().getTopicTreeViewHooks();

  const { payloadFromSetAction, status } = hooks.useState();

  const callback = useCallback((payload: TopicTreeStoreSetActionPayload) => {
    console.log('MAKC:useTopicTreeViewLoad:callback:payload', payload);

    if (onTopicTreeLoaded) {
      onTopicTreeLoaded(payload);
    }
  }, [onTopicTreeLoaded]);

  const payload: TopicDomainTreeGetOperationInput = useMemo(
    () => ({
      axis,
      sortField,
      sortDirection,
      expandedNodeId: topicId
    }),
    [axis, sortDirection, sortField, topicId]
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
