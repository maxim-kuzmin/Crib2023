import { type Dispatch, useEffect, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import {
  type TopicDomainTreeGetOperationRequestHandler,
  createTopicDomainTreeGetOperationRequest
} from '../../../../../../domains';
import {
  type TopicTreeStoreSetActionCallback,
  type TopicTreeStoreLoadActionDispatch,
  type TopicTreeStoreLoadActionOptions,
  type TopicTreeStoreLoadActionPayload,
  type TopicTreeStoreResource,
  type TopicTreeStoreSliceName
} from '../../../../../../features';
import { TopicTreeStoreActionType } from '../../../TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from '../../../TopicTreeStoreActionUnion';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';
import { runLoadCompletedAction } from '../LoadCompleted/TopicTreeStoreLoadCompletedActionDispatchHook';

interface Options {
  readonly callback?: TopicTreeStoreSetActionCallback;
  readonly dispatch: Dispatch<TopicTreeStoreActionUnion>;
  readonly payload: TopicTreeStoreLoadActionPayload;
  readonly requestHandler: TopicDomainTreeGetOperationRequestHandler;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicTreeStore: TopicTreeStoreResource;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runLoadAction ({
  callback,
  dispatch,
  payload,
  requestHandler,
  resourceOfApiResponse,
  resourceOfTopicTreeStore,
  shouldBeCanceled,
  sliceName,
}: Options) {
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
        createTopicDomainTreeGetOperationRequest(
          payload,
          {
            operationName: resourceOfTopicTreeStore.getOperationNameForGet(),
            resourceOfApiResponse
          }),
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
  sliceName: TopicTreeStoreSliceName,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfLoadAction
  }: TopicTreeStoreLoadActionOptions = {}
): TopicTreeStoreLoadActionDispatch {
  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();

  const resourceOfTopicTreeStore = hooks.Features.Topic.Tree.Store.useResource();

  const dispatch = useTopicTreeStoreDispatch();

  const requestHandler = useRef(hooks.Domains.Topic.useTreeGetOperationRequestHandler()).current;

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
          resourceOfTopicTreeStore,
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
            resourceOfTopicTreeStore,
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
      resourceOfTopicTreeStore,
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
      resourceOfApiResponse,
      resourceOfTopicTreeStore,
      shouldBeCanceled,
      sliceName
    });
  }

  const result: TopicTreeStoreLoadActionDispatch = {
    run
  };

  return useRef(result).current;
}
