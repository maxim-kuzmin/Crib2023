import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
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
    abortController,
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
    async (payload: TopicItemStoreLoadActionPayload, abortSignal?: AbortSignal) => {
      if (abortSignal?.aborted) {
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
            abortSignal
          )
        : null;

        if (abortSignal?.aborted) {
        return;
      }

      complete(response);
    },
    [dispatch, requestHandler, resourceOfApiResponse, resourceOfTopicItemStore, complete, sliceName]
  );

  useEffect(
    () => {
      const abortControllerInner = abortController ?? new AbortController();

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadAction) {
        run(payloadOfLoadAction, abortControllerInner.signal);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadAction) {
          run(payloadOfLoadAction, abortControllerInner.signal);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [abortController, dispatchType, payloadOfLoadAction, run]
  );

  return useMemo<TopicItemStoreLoadActionDispatch>(() => ({ run }), [run]);
}
