import { type Dispatch, useEffect, useRef } from 'react';
import { getModule } from '../../../../../../app';
import {
  type TopicTreeStoreSetActionCallback,
  type TopicTreeStoreLoadActionDispatch,
  type TopicTreeStoreLoadActionOptions,
  type TopicTreeStoreLoadActionPayload,
} from '../../../../../../app/Stores';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import {
  type TopicDomainTreeGetOperationRequestHandler,
  createTopicDomainTreeGetOperationRequest
} from '../../../../../../domains';
import { TopicTreeStoreActionType } from '../../../TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from '../../../TopicTreeStoreActionUnion';
import { useTopicTreeStoreDispatchContext } from '../../../TopicTreeStoreContext';
import { runLoadCompletedAction } from '../LoadCompleted/TopicTreeStoreLoadCompletedActionDispatchHook';

interface RunOptions {
  readonly callback?: TopicTreeStoreSetActionCallback;
  readonly dispatch: Dispatch<TopicTreeStoreActionUnion>;
  readonly payload: TopicTreeStoreLoadActionPayload;
  readonly requestHandler: TopicDomainTreeGetOperationRequestHandler;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runLoadAction ({
  callback,
  dispatch,
  shouldBeCanceled,
  sliceName,
  payload,
  requestHandler
}: RunOptions) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch({
    payload,
    sliceName,
    type: TopicTreeStoreActionType.Load
  });

  const response = payload
    ? await requestHandler.handle(
        createTopicDomainTreeGetOperationRequest(payload, { operationName: '@@TopicDomainTreeGet' }),
        shouldBeCanceled
      )
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runLoadCompletedAction({
    callback,
    dispatch,
    payload: response,
    sliceName
  });
}

export function useStoreLoadActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfLoadAction
  }: TopicTreeStoreLoadActionOptions = {}
): TopicTreeStoreLoadActionDispatch {
  const dispatch = useTopicTreeStoreDispatchContext();

  const requestHandler = useRef(
    getModule().useTopicDomainTreeGetOperationRequestHandler()
  ).current;

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadAction) {
        runLoadAction({
          callback,
          dispatch,
          requestHandler,
          payload: payloadOfLoadAction,
          shouldBeCanceled: shouldBeCanceledInner,
          sliceName
        });
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadAction) {
          runLoadAction({
            callback,
            dispatch,
            requestHandler,
            payload: payloadOfLoadAction,
            shouldBeCanceled: shouldBeCanceledInner,
            sliceName
            });
        } else {
          isCanceledInner = true;
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      isCanceled,
      payloadOfLoadAction,
      requestHandler,
      sliceName
    ]
  );

  async function run (
    payload: TopicTreeStoreLoadActionPayload,
    shouldBeCanceled: ShouldBeCanceled = () => false
  ): Promise<void> {
    await runLoadAction({
      callback,
      dispatch,
      payload,
      requestHandler,
      shouldBeCanceled,
      sliceName
    });
  }

  const result: TopicTreeStoreLoadActionDispatch = {
    run
  };

  return useRef(result).current;
}
