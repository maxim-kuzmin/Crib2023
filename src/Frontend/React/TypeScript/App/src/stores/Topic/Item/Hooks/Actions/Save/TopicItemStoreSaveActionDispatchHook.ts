import { type Dispatch, useEffect, useRef } from 'react';
import { getModule } from '../../../../../../app';
import {
  type TopicItemStoreSetActionCallback,
  type TopicItemStoreSaveActionDispatch,
  type TopicItemStoreSaveActionOptions,
  type TopicItemStoreSaveActionPayload,
} from '../../../../../../app/Stores';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import {
  type TopicDomainItemSaveOperationRequestHandler,
  createTopicDomainItemSaveOperationRequest
} from '../../../../../../domains';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../../../TopicItemStoreActionUnion';
import { useTopicItemStoreDispatchContext } from '../../../TopicItemStoreContext';
import { runSaveCompletedAction } from '../SaveCompleted/TopicItemStoreSaveCompletedActionDispatchHook';

interface Options {
  readonly callback?: TopicItemStoreSetActionCallback;
  readonly dispatch: Dispatch<TopicItemStoreActionUnion>;
  readonly payload: TopicItemStoreSaveActionPayload;
  readonly requestHandler: TopicDomainItemSaveOperationRequestHandler;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runSaveAction ({
  callback,
  dispatch,
  shouldBeCanceled,
  sliceName,
  payload,
  requestHandler
}: Options): Promise<void> {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch({
    type: TopicItemStoreActionType.Save,
    payload,
    sliceName
  });

  const response = payload
    ? await requestHandler.handle(
        createTopicDomainItemSaveOperationRequest(payload, { operationName: '@@TopicDomainItemSave' }),
        shouldBeCanceled
      )
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runSaveCompletedAction({
    callback,
    dispatch,
    payload: response,
    sliceName
  });
}

export function useStoreSaveActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfSaveAction
  }: TopicItemStoreSaveActionOptions
): TopicItemStoreSaveActionDispatch {
  const dispatch = useTopicItemStoreDispatchContext();

  const requestHandler = useRef(
    getModule().useTopicDomainItemSaveOperationRequestHandler()
  ).current;

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSaveAction) {
        runSaveAction({
          callback,
          dispatch,
          payload: payloadOfSaveAction,
          requestHandler,
          shouldBeCanceled: shouldBeCanceledInner,
          sliceName
        });
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSaveAction) {
          runSaveAction({
            callback,
            dispatch,
            payload: payloadOfSaveAction,
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
      payloadOfSaveAction,
      requestHandler,
      sliceName
    ]
  );

  async function run (
    payload: TopicItemStoreSaveActionPayload,
    shouldBeCanceled: ShouldBeCanceled = () => false
  ): Promise<void> {
    await runSaveAction({
      callback,
      dispatch,
      payload,
      requestHandler,
      shouldBeCanceled,
      sliceName
    });
  }

  const result: TopicItemStoreSaveActionDispatch = {
    run
  };

  return useRef(result).current;
}
