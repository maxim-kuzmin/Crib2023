import { type Dispatch, useEffect, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import {
  type TopicDomainItemDeleteOperationRequestHandler,
  createTopicDomainItemDeleteOperationRequest,
} from '../../../../../../domains';
import {
  type TopicItemStoreDeleteCompletedActionCallback,
  type TopicItemStoreDeleteActionDispatch,
  type TopicItemStoreDeleteActionOptions,
  type TopicItemStoreDeleteActionPayload,
  type TopicItemStoreResource,
  type TopicItemStoreSliceName,
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../../../TopicItemStoreActionUnion';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';
import { runDeleteCompletedAction } from '../DeleteCompleted/TopicItemStoreDeleteCompletedActionDispatchHook';

interface Options {
  readonly callback?: TopicItemStoreDeleteCompletedActionCallback;
  readonly dispatch: Dispatch<TopicItemStoreActionUnion>;
  readonly payload: TopicItemStoreDeleteActionPayload;
  readonly requestHandler: TopicDomainItemDeleteOperationRequestHandler;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicItemStore: TopicItemStoreResource;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runDeleteAction ({
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
    type: TopicItemStoreActionType.Delete
  });

  const response = payload
    ? await requestHandler.handle(
        createTopicDomainItemDeleteOperationRequest(
          payload,
          {
            operationName: resourceOfTopicItemStore.getOperationNameForDelete(),
            resourceOfApiResponse
          }
        ),
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
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfDeleteAction
  }: TopicItemStoreDeleteActionOptions = {}
): TopicItemStoreDeleteActionDispatch {
  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();

  const resourceOfTopicItemStore = hooks.Features.Topic.Item.Store.useResource();

  const dispatch = useTopicItemStoreDispatch();

  const requestHandler = useRef(hooks.Domains.Topic.useItemDeleteOperationRequestHandler()).current;

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
          resourceOfApiResponse,
          resourceOfTopicItemStore,
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
      payloadOfDeleteAction,
      requestHandler,
      resourceOfApiResponse,
      resourceOfTopicItemStore,
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
      resourceOfApiResponse,
      resourceOfTopicItemStore,
      shouldBeCanceled,
      sliceName
    });
  }

  const result: TopicItemStoreDeleteActionDispatch = {
    run
  };

  return useRef(result).current;
}
