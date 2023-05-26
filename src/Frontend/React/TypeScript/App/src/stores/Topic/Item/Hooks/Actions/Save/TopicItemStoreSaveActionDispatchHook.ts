import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createTopicDomainItemSaveOperationRequest } from '../../../../../../domains';
import {
  type TopicItemStoreSaveActionDispatch,
  type TopicItemStoreSaveActionOptions,
  type TopicItemStoreSaveActionPayload,
  type TopicItemStoreSliceName,
  type TopicItemStoreSaveActionResult,
  createTopicItemStoreSaveActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreSaveAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreSaveActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    abortController,
    resultOfSaveAction
  }: TopicItemStoreSaveActionOptions = {}
): TopicItemStoreSaveActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfTopicItemStore = hooks.Features.Topic.Item.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Topic.useItemSaveOperationRequestHandler()).current;

  const payloadOfSaveAction = useMemo(
    () => createTopicItemStoreSaveActionPayload({
      actionResult: resultOfSaveAction,
      resourceOfApiResponse,
      resourceOfTopicItemStore,
      requestHandler,
      sliceName,
    }),
    [resultOfSaveAction, requestHandler, resourceOfApiResponse, resourceOfTopicItemStore, sliceName]
  );

  const { run: complete } = hooks.Features.Topic.Item.Store.useStoreSaveCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (payload: TopicItemStoreSaveActionPayload) => {
      const {
        abortSignal,
        actionResult,
        requestHandler,
        resourceOfApiResponse,
        resourceOfTopicItemStore
      } = payload;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createTopicItemStoreSaveAction(payload));

      const response = actionResult
        ? await requestHandler.handle(
            createTopicDomainItemSaveOperationRequest(
              actionResult,
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
    [complete, dispatch]
  );

  useEffect(
    () => {
      if (abortController?.signal.aborted) {
        return;
      }

      const abortControllerInner = new AbortController();

      const payloadOfSaveActionInner = createTopicItemStoreSaveActionPayload({
        ...payloadOfSaveAction,
        abortSignal: abortControllerInner.signal,
      });

      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfSaveActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfSaveActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [abortController, dispatchType, payloadOfSaveAction, run]
  );

  return useMemo<TopicItemStoreSaveActionDispatch>(
    () => ({
      run: async (actionResult: TopicItemStoreSaveActionResult, abortSignal?: AbortSignal) => {
        const payloadOfSaveActionInner = createTopicItemStoreSaveActionPayload({
          ...payloadOfSaveAction,
          abortSignal,
          actionResult
        });

        await run(payloadOfSaveActionInner);
      }
    }),
    [payloadOfSaveAction, run]
  );
}
