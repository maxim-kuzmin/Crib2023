import { type Dispatch, useEffect, useRef } from 'react';
import { getModule } from '../../../../../../app';
import {
  type TopicItemStoreDeleteCompletedActionCallback,
  type TopicItemStoreDeleteActionDispatch,
  type TopicItemStoreDeleteActionOptions,
  type TopicItemStoreDeleteActionPayload,
} from '../../../../../../app/Stores';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import {
  type TopicDomainItemDeleteOperationRequestHandler,
  createTopicDomainItemDeleteOperationRequest,
} from '../../../../../../domains';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../../../TopicItemStoreActionUnion';
import { useTopicItemStoreDispatchContext } from '../../../TopicItemStoreContext';
import { runDeleteCompletedAction } from '../DeleteCompleted/TopicItemStoreDeleteCompletedActionDispatchHook';

interface Options {
  readonly callback?: TopicItemStoreDeleteCompletedActionCallback;
  readonly dispatch: Dispatch<TopicItemStoreActionUnion>;
  readonly payload: TopicItemStoreDeleteActionPayload;
  readonly requestHandler: TopicDomainItemDeleteOperationRequestHandler;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runDeleteAction ({
  callback,
  dispatch,
  shouldBeCanceled,
  sliceName,
  payload,
  requestHandler
}: Options) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch({
    payload,
    sliceName,
    type: TopicItemStoreActionType.Delete
  });

  const response = payload
    ? await requestHandler.handle(
        createTopicDomainItemDeleteOperationRequest(payload, { operationName: '@@TopicDomainItemDelete' }),
        shouldBeCanceled
      )
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runDeleteCompletedAction({
    callback,
    dispatch,
    payload: response,
    sliceName
  });
}

export function useStoreDeleteActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfDeleteAction
  }: TopicItemStoreDeleteActionOptions = {}
): TopicItemStoreDeleteActionDispatch {
  const dispatch = useTopicItemStoreDispatchContext();

  const requestHandler = useRef(
    getModule().useTopicDomainItemDeleteOperationRequestHandler()
  ).current;

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfDeleteAction) {
        runDeleteAction({
          callback,
          dispatch,
          payload: payloadOfDeleteAction,
          requestHandler,
          shouldBeCanceled: shouldBeCanceledInner,
          sliceName
      });
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfDeleteAction) {
          runDeleteAction({
            callback,
            dispatch,
            payload: payloadOfDeleteAction,
            requestHandler,
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
      payloadOfDeleteAction,
      requestHandler,
      sliceName
    ]
  );

  async function run (
    payload: TopicItemStoreDeleteActionPayload,
    shouldBeCanceled: ShouldBeCanceled = () => false
  ): Promise<void> {
    await runDeleteAction({
      callback,
      dispatch,
      payload,
      requestHandler,
      shouldBeCanceled,
      sliceName
    });
  }

  const result: TopicItemStoreDeleteActionDispatch = {
    run
  };

  return useRef(result).current;
}
