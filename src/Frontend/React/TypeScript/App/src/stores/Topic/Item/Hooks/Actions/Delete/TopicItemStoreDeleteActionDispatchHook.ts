import { type Dispatch, useEffect, useRef } from 'react';
import appInstance from '../../../../../../app/AppInstance';
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
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../../../TopicItemStoreActionUnion';
import { useTopicItemStoreDispatchContext } from '../../../TopicItemStoreContext';
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
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfDeleteAction
  }: TopicItemStoreDeleteActionOptions = {}
): TopicItemStoreDeleteActionDispatch {
  const resourceOfApiResponse = appInstance.hooks.Data.Api.Response.useResource();

  const resourceOfTopicItemStore = appInstance.hooks.Features.Stores.Topic.Item.useResource();

  const dispatch = useTopicItemStoreDispatchContext();

  const requestHandler = useRef(appInstance.hooks.Domains.Topic.useItemDeleteOperationRequestHandler()).current;

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
