import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType, shouldNotBeCanceled } from '../../../../../../common';
import { createTopicDomainItemDeleteOperationRequest } from '../../../../../../domains';
import {
  type TopicItemStoreDeleteActionDispatch,
  type TopicItemStoreDeleteActionOptions,
  type TopicItemStoreDeleteActionPayload,
  type TopicItemStoreSliceName,
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreDeleteActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfDeleteAction
  }: TopicItemStoreDeleteActionOptions = {}
): TopicItemStoreDeleteActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfTopicItemStore = hooks.Features.Topic.Item.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Topic.useItemDeleteOperationRequestHandler()).current;

  const { run: complete } = hooks.Features.Topic.Item.Store.useStoreDeleteCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (
      payload: TopicItemStoreDeleteActionPayload,
      shouldBeCanceled: ShouldBeCanceled = shouldNotBeCanceled
    ) => {
      if (shouldBeCanceled()) {
        return;
      }

      dispatch({ payload, sliceName, type: TopicItemStoreActionType.Delete });

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

      complete(response);
    },
    [complete, dispatch, requestHandler, resourceOfApiResponse, resourceOfTopicItemStore, sliceName]
  );

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfDeleteAction) {
        run(payloadOfDeleteAction, shouldBeCanceledInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfDeleteAction) {
          run(payloadOfDeleteAction, shouldBeCanceledInner);
        } else {
          isCanceledInner = true;
        }
      };
    },
    [dispatchType, isCanceled, payloadOfDeleteAction, run]
  );

  return useMemo<TopicItemStoreDeleteActionDispatch>(() => ({ run }), [run]);
}
