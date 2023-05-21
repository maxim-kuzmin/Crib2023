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
    async (
      payload: TopicItemStoreSaveActionPayload,
      abortController?: AbortController
    ) => {
      if (abortController?.signal.aborted) {
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
            abortController
          )
        : null;

        if (abortController?.signal.aborted) {
        return;
      }

      complete(response);
    },
    [complete, dispatch, requestHandler, resourceOfApiResponse, resourceOfTopicItemStore, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSaveAction) {
        run(payloadOfSaveAction, abortController);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSaveAction) {
          run(payloadOfSaveAction, abortController);
        } else {
          abortController?.abort();
        }
      };
    },
    [abortController, dispatchType, payloadOfSaveAction, run]
  );

  return useMemo<TopicItemStoreSaveActionDispatch>(() => ({ run }), [run]);
}
