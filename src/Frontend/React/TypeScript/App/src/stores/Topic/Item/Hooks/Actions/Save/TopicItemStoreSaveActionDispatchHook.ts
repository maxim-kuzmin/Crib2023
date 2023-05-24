import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createTopicDomainItemSaveOperationRequest } from '../../../../../../domains';
import {
  type TopicItemStoreSaveActionDispatch,
  type TopicItemStoreSaveActionOptions,
  type TopicItemStoreSaveActionPayload,
  type TopicItemStoreSliceName,
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreSaveActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    abortController,
    payloadOfSaveAction
  }: TopicItemStoreSaveActionOptions = {}
): TopicItemStoreSaveActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfTopicItemStore = hooks.Features.Topic.Item.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Topic.useItemSaveOperationRequestHandler()).current;

  const { run: complete } = hooks.Features.Topic.Item.Store.useStoreSaveCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (payload: TopicItemStoreSaveActionPayload, abortSignal?: AbortSignal) => {
      if (abortSignal?.aborted) {
        return;
      }

      dispatch({ payload, sliceName, type: TopicItemStoreActionType.Save });

      const response = payload
        ? await requestHandler.handle(
            createTopicDomainItemSaveOperationRequest(
              payload,
              {
                operationName: resourceOfTopicItemStore.getOperationNameForSave(),
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
    [complete, dispatch, requestHandler, resourceOfApiResponse, resourceOfTopicItemStore, sliceName]
  );

  useEffect(
    () => {
      const abortControllerInner = abortController ?? new AbortController();

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSaveAction) {
        run(payloadOfSaveAction, abortControllerInner.signal);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSaveAction) {
          run(payloadOfSaveAction, abortControllerInner.signal);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [abortController, dispatchType, payloadOfSaveAction, run]
  );

  return useMemo<TopicItemStoreSaveActionDispatch>(() => ({ run }), [run]);
}
