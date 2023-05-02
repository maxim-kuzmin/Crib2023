import { type Dispatch, useEffect, useRef } from 'react';
import app from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import {
  type TopicDomainItemSaveOperationRequestHandler,
  createTopicDomainItemSaveOperationRequest
} from '../../../../../../domains';
import {
  type TopicItemStoreSetActionCallback,
  type TopicItemStoreSaveActionDispatch,
  type TopicItemStoreSaveActionOptions,
  type TopicItemStoreSaveActionPayload,
  type TopicItemStoreResource
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../../../TopicItemStoreActionUnion';
import { useTopicItemStoreDispatchContext } from '../../../TopicItemStoreContext';
import { runSaveCompletedAction } from '../SaveCompleted/TopicItemStoreSaveCompletedActionDispatchHook';

interface Options {
  readonly callback?: TopicItemStoreSetActionCallback;
  readonly dispatch: Dispatch<TopicItemStoreActionUnion>;
  readonly payload: TopicItemStoreSaveActionPayload;
  readonly requestHandler: TopicDomainItemSaveOperationRequestHandler;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicItemStore: TopicItemStoreResource;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runSaveAction ({
  callback,
  dispatch,
  payload,
  requestHandler,
  resourceOfApiResponse,
  resourceOfTopicItemStore,
  shouldBeCanceled,
  sliceName,
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
        createTopicDomainItemSaveOperationRequest(
          payload,
          {
            operationName: resourceOfTopicItemStore.getOperationNameForSave(),
            resourceOfApiResponse
          }
        ),
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
  const resourceOfApiResponse = app.hooks.Data.Api.Response.useResource();

  const resourceOfTopicItemStore = app.hooks.Features.Stores.Topic.Item.useResource();

  const dispatch = useTopicItemStoreDispatchContext();

  const requestHandler = useRef(app.hooks.Domains.Topic.useItemSaveOperationRequestHandler()).current;

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
          resourceOfApiResponse,
          resourceOfTopicItemStore,
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
      payloadOfSaveAction,
      requestHandler,
      resourceOfApiResponse,
      resourceOfTopicItemStore,
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
      resourceOfApiResponse,
      resourceOfTopicItemStore,
      shouldBeCanceled,
      sliceName
    });
  }

  const result: TopicItemStoreSaveActionDispatch = {
    run
  };

  return useRef(result).current;
}
