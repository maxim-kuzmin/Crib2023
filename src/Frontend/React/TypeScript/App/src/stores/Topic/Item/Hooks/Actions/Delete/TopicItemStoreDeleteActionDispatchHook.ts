import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
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
    abortController,
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
      abortController = new AbortController()
    ) => {
      if (abortController.signal.aborted) {
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
            abortController
          )
        : null;

        if (abortController.signal.aborted) {
        return;
      }

      complete(response);
    },
    [complete, dispatch, requestHandler, resourceOfApiResponse, resourceOfTopicItemStore, sliceName]
  );

  useEffect(
    () => {
      const abortControllerInner = abortController ?? new AbortController();

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfDeleteAction) {
        run(payloadOfDeleteAction, abortControllerInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfDeleteAction) {
          run(payloadOfDeleteAction, abortControllerInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [abortController, dispatchType, payloadOfDeleteAction, run]
  );

  return useMemo<TopicItemStoreDeleteActionDispatch>(() => ({ run }), [run]);
}
