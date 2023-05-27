import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createTopicDomainItemSaveOperationRequest } from '../../../../../../domains';
import {
  type TopicItemStoreSaveActionData,
  type TopicItemStoreSaveActionDispatch,
  type TopicItemStoreSaveActionOptions,
  type TopicItemStoreSaveActionPayload,
  type TopicItemStoreSaveActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreSaveActionData,
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

  const dataOfSaveAction = useMemo(
    () => createTopicItemStoreSaveActionData({
      resourceOfApiResponse,
      resourceOfTopicItemStore,
      requestHandler,
    }),
    [requestHandler, resourceOfApiResponse, resourceOfTopicItemStore]
  );

  const payloadOfSaveAction = useMemo(
    () => createTopicItemStoreSaveActionPayload({
      actionResult: resultOfSaveAction,
      sliceName,
    }),
    [resultOfSaveAction, sliceName]
  );

  const { run: complete } = hooks.Features.Topic.Item.Store.useStoreSaveCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (
      payload: TopicItemStoreSaveActionPayload,
      dataOfSaveAction: TopicItemStoreSaveActionData
    ) => {
      const {
        abortSignal,
        requestHandler,
        resourceOfApiResponse,
        resourceOfTopicItemStore
      } = dataOfSaveAction;

      const { actionResult } = payload;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createTopicItemStoreSaveAction(payload));

      const response = actionResult
        ? await requestHandler.handle(
            createTopicDomainItemSaveOperationRequest(
              actionResult,
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
    [complete, dispatch]
  );

  const aborted = abortController?.signal.aborted;

  useEffect(
    () => {
      if (aborted) {
        return;
      }

      const abortControllerInner = new AbortController();

      const dataOfSaveActionInner: TopicItemStoreSaveActionData = {
        ...dataOfSaveAction,
        abortSignal: abortControllerInner.signal,
      };

      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfSaveAction, dataOfSaveActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfSaveAction, dataOfSaveActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [aborted, dataOfSaveAction, dispatchType, payloadOfSaveAction, run]
  );

  return useMemo<TopicItemStoreSaveActionDispatch>(
    () => ({
      run: async (actionResult: TopicItemStoreSaveActionResult, abortSignal?: AbortSignal) => {
        const dataOfSaveActionInner = createTopicItemStoreSaveActionData({
          ...dataOfSaveAction,
          abortSignal,
        });

        const payloadOfSaveActionInner = createTopicItemStoreSaveActionPayload({
          ...payloadOfSaveAction,
          actionResult
        });

        await run(payloadOfSaveActionInner, dataOfSaveActionInner);
      }
    }),
    [dataOfSaveAction, payloadOfSaveAction, run]
  );
}
