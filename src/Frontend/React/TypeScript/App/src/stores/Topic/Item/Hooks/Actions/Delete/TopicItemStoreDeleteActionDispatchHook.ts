import { type Dispatch, useEffect, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import { type ApiResponseFactory, type ApiResponseResource } from '../../../../../../data';
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
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';
import { runDeleteCompletedAction } from '../DeleteCompleted/TopicItemStoreDeleteCompletedActionDispatchHook';

interface Options {
  readonly callback?: TopicItemStoreDeleteCompletedActionCallback;
  readonly dispatch: Dispatch<TopicItemStoreActionUnion>;
  readonly factoryOfApiResponse: ApiResponseFactory;
  readonly payload: TopicItemStoreDeleteActionPayload;
  readonly requestHandler: TopicDomainItemDeleteOperationRequestHandler;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicItemStore: TopicItemStoreResource;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly storeKey: string;
}

async function runDeleteAction ({
  callback,
  dispatch,
  factoryOfApiResponse,
  payload,
  requestHandler,
  resourceOfApiResponse,
  resourceOfTopicItemStore,
  shouldBeCanceled,
  storeKey,
}: Options) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch({
    payload,
    storeKey,
    type: TopicItemStoreActionType.Delete
  });

  const response = payload
    ? await requestHandler.handle(
        createTopicDomainItemDeleteOperationRequest(
          payload,
          {
            factoryOfApiResponse,
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
    storeKey
  });
}

export function useStoreDeleteActionDispatch (
  storeKey: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfDeleteAction
  }: TopicItemStoreDeleteActionOptions = {}
): TopicItemStoreDeleteActionDispatch {
  const { factories, hooks } = useAppInstance();

  const factoryOfApiResponse = factories.Data.Api.Response;

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();

  const resourceOfTopicItemStore = hooks.Features.Stores.Topic.Item.useResource();

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
          factoryOfApiResponse,
          payload: payloadOfDeleteAction,
          requestHandler,
          resourceOfApiResponse,
          resourceOfTopicItemStore,
          shouldBeCanceled: shouldBeCanceledInner,
          storeKey
      });
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfDeleteAction) {
          runDeleteAction({
            callback,
            dispatch,
            factoryOfApiResponse,
            payload: payloadOfDeleteAction,
            requestHandler,
            resourceOfApiResponse,
            resourceOfTopicItemStore,
            shouldBeCanceled: shouldBeCanceledInner,
            storeKey
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
      factoryOfApiResponse,
      isCanceled,
      payloadOfDeleteAction,
      requestHandler,
      resourceOfApiResponse,
      resourceOfTopicItemStore,
      storeKey
    ]
  );

  async function run (
    payload: TopicItemStoreDeleteActionPayload,
    shouldBeCanceled: ShouldBeCanceled = () => false
  ): Promise<void> {
    await runDeleteAction({
      callback,
      dispatch,
      factoryOfApiResponse,
      payload,
      requestHandler,
      resourceOfApiResponse,
      resourceOfTopicItemStore,
      shouldBeCanceled,
      storeKey
    });
  }

  const result: TopicItemStoreDeleteActionDispatch = {
    run
  };

  return useRef(result).current;
}
