import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import { type ApiOperationResponse } from '../../../../../../data';
import {
  createTopicDomainItemSaveOperationRequest,
  createTopicDomainItemGetOperationResponse,
} from '../../../../../../domains';
import {
  type TopicItemStoreSaveActionData,
  type TopicItemStoreSaveActionDispatch,
  type TopicItemStoreSaveActionPayload,
  type TopicItemStoreSaveActionResult,
  type TopicItemStoreSaveCompletedActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreSaveActionData,
  createTopicItemStoreSaveActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreSaveAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';
import {
  useStoreSaveCompletedActionDispatch
} from '../SaveCompleted/TopicItemStoreSaveCompletedActionDispatchHook';

interface Options extends StoreActionOptions {
  readonly resultOfSaveAction?: TopicItemStoreSaveActionResult;
}

export function useStoreSaveActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    dispatchType,
    abortController,
    resultOfSaveAction
  }: Options = {}
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

  const { run: complete } = useStoreSaveCompletedActionDispatch(sliceName);

  const runInner = useCallback(
    async (payload: TopicItemStoreSaveActionPayload, data: TopicItemStoreSaveActionData) => {
      const {
        abortSignal,
        requestHandler,
        resourceOfApiResponse,
        resourceOfTopicItemStore
      } = data;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createTopicItemStoreSaveAction(payload));

      const { actionResult } = payload;

      let response: TopicItemStoreSaveCompletedActionResult = null;

      try {
        response = actionResult
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
      } catch (error: unknown) {
        const errorResponse = error as ApiOperationResponse;

        if (errorResponse) {
          response = createTopicDomainItemGetOperationResponse(errorResponse);
        }
      }

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
        runInner(payloadOfSaveAction, dataOfSaveActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfSaveAction, dataOfSaveActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [aborted, dataOfSaveAction, dispatchType, payloadOfSaveAction, runInner]
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

        await runInner(payloadOfSaveActionInner, dataOfSaveActionInner);
      }
    }),
    [dataOfSaveAction, payloadOfSaveAction, runInner]
  );
}
