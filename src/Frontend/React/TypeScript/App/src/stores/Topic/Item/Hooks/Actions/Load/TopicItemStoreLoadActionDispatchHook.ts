import { type Dispatch, useEffect, useRef } from 'react';
import app, {
  type TopicItemStoreSetActionCallback,
  type TopicItemStoreLoadActionDispatch,
  type TopicItemStoreLoadActionOptions,
  type TopicItemStoreLoadActionPayload,
  type TopicItemStoreResource,
} from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import {
  type TopicDomainItemGetOperationRequestHandler,
  createTopicDomainItemGetOperationRequest
} from '../../../../../../domains';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../../../TopicItemStoreActionUnion';
import { useTopicItemStoreDispatchContext } from '../../../TopicItemStoreContext';
import { runLoadCompletedAction } from '../LoadCompleted/TopicItemStoreLoadCompletedActionDispatchHook';

interface Options {
  readonly callback?: TopicItemStoreSetActionCallback;
  readonly dispatch: Dispatch<TopicItemStoreActionUnion>;
  readonly payload: TopicItemStoreLoadActionPayload;
  readonly requestHandler: TopicDomainItemGetOperationRequestHandler;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicItemStore: TopicItemStoreResource;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runLoadAction ({
  callback,
  dispatch,
  payload,
  requestHandler,
  resourceOfApiResponse,
  resourceOfTopicItemStore,
  shouldBeCanceled,
  sliceName,
}: Options) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch({
    payload,
    sliceName,
    type: TopicItemStoreActionType.Load
  });

  const response = payload
    ? await requestHandler.handle(
        createTopicDomainItemGetOperationRequest(
          payload,
          {
            operationName: resourceOfTopicItemStore.getOperationNameForGet(),
            resourceOfApiResponse
          }
        ),
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
  }: TopicItemStoreLoadActionOptions = {}
): TopicItemStoreLoadActionDispatch {
  const resourceOfApiResponse = app.hooks.Api.Response.useResource();

  const resourceOfTopicItemStore = app.hooks.Stores.Topic.Item.useResource();

  const dispatch = useTopicItemStoreDispatchContext();

  const requestHandler = useRef(
    app.module.useTopicDomainItemGetOperationRequestHandler()
  ).current;

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadAction) {
        runLoadAction({
          callback,
          dispatch,
          payload: payloadOfLoadAction,
          requestHandler,
          resourceOfApiResponse,
          resourceOfTopicItemStore,
          shouldBeCanceled: shouldBeCanceledInner,
          sliceName
        });
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadAction) {
          runLoadAction({
            callback,
            dispatch,
            payload: payloadOfLoadAction,
            requestHandler,
            resourceOfApiResponse,
            resourceOfTopicItemStore,
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
      resourceOfApiResponse,
      resourceOfTopicItemStore,
      sliceName
    ]
  );

  async function run (
    payload: TopicItemStoreLoadActionPayload,
    shouldBeCanceled: ShouldBeCanceled = () => false
  ): Promise<void> {
    await runLoadAction({
      callback,
      dispatch,
      payload,
      requestHandler,
      resourceOfApiResponse,
      resourceOfTopicItemStore,
      shouldBeCanceled,
      sliceName
    });
  }

  const result: TopicItemStoreLoadActionDispatch = {
    run
  };

  return useRef(result).current;
}
