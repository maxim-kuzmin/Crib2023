import { useCallback, useMemo } from 'react';
import {
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreClearActionOptions,
  type TopicTreeStoreHooks,
  type TopicTreeStoreLoadActionDispatch,
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOptions,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreSetActionDispatch,
  type TopicTreeStoreSetActionOptions,
  type TopicTreeStoreSetActionPayload,
  TopicTreeStoreSliceName,
  type TopicTreeStoreState
} from '../../../app/Stores';
import { OperationStatus, StoreDispatchType } from '../../../common';
import { type TopicDomainTreeGetOperationInput } from '../../../domains';
import { type TopicTreeViewHooks } from './TopicTreeViewHooks';

type ClearActionDispatch = TopicTreeStoreClearActionDispatch;
type ClearActionOptions = TopicTreeStoreClearActionOptions;

type LoadActionDispatch = TopicTreeStoreLoadActionDispatch;
type LoadActionInput = TopicTreeStoreLoadActionInput;
type LoadActionOptions = TopicTreeStoreLoadActionOptions;
type LoadActionOutput = TopicTreeStoreLoadActionOutput;

type SetActionDispatch = TopicTreeStoreSetActionDispatch;
type SetActionOptions = TopicTreeStoreSetActionOptions;

type StoreState = TopicTreeStoreState;

export function createTopicTreeViewHooks (
  hooks: TopicTreeStoreHooks
): TopicTreeViewHooks {
  const sliceName = TopicTreeStoreSliceName.TopicTreeView;

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
    const { axis, sortField, sortDirection, topicId, isCanceled, onActionCompleted } = input;

    const callback = useCallback((payload: TopicTreeStoreSetActionPayload) => {
        if (onActionCompleted) {
          onActionCompleted(payload);
        }
      },
      [onActionCompleted]
    );

    const payload: TopicDomainTreeGetOperationInput = useMemo(
      () => ({
        axis,
        sortField,
        sortDirection,
        expandedNodeId: topicId
      }),
      [axis, sortDirection, sortField, topicId]
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
