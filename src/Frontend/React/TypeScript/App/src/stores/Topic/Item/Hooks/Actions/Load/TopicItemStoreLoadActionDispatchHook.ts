import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType, shouldNotBeCanceled } from '../../../../../../common';
import { createTopicDomainItemGetOperationRequest } from '../../../../../../domains';
import {
  type TopicItemStoreLoadActionDispatch,
  type TopicItemStoreLoadActionOptions,
  type TopicItemStoreLoadActionPayload,
  type TopicItemStoreSliceName,
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreLoadActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfLoadAction
  }: TopicItemStoreLoadActionOptions = {}
): TopicItemStoreLoadActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfTopicItemStore = hooks.Features.Topic.Item.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Topic.useItemGetOperationRequestHandler()).current;

  const { run: complete } = hooks.Features.Topic.Item.Store.useStoreLoadCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (
      payload: TopicItemStoreLoadActionPayload,
      shouldBeCanceled: ShouldBeCanceled = shouldNotBeCanceled
    ) => {
      if (shouldBeCanceled()) {
        return;
      }

      dispatch({ payload, sliceName, type: TopicItemStoreActionType.Load });

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

      complete(response);
    },
    [dispatch, requestHandler, resourceOfApiResponse, resourceOfTopicItemStore, complete, sliceName]
  );

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadAction) {
        run(payloadOfLoadAction, shouldBeCanceledInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadAction) {
          run(payloadOfLoadAction, shouldBeCanceledInner);
        } else {
          isCanceledInner = true;
        }
      };
    },
    [dispatchType, isCanceled, payloadOfLoadAction, run]
  );

  return useMemo<TopicItemStoreLoadActionDispatch>(() => ({ run }), [run]);
}
