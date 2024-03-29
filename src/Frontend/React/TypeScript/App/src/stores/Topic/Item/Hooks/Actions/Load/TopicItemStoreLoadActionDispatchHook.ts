import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import { type ApiOperationResponse } from '../../../../../../data';
import {
  createTopicDomainItemGetOperationRequest,
  createTopicDomainItemGetOperationResponse,
} from '../../../../../../domains';
import {
  type TopicItemStoreLoadActionData,
  type TopicItemStoreLoadActionDispatch,
  type TopicItemStoreLoadActionPayload,
  type TopicItemStoreLoadActionResult,
  type TopicItemStoreLoadCompletedActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreLoadActionData,
  createTopicItemStoreLoadActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreLoadAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';
import {
  useStoreLoadCompletedActionDispatch
} from '../LoadCompleted/TopicItemStoreLoadCompletedActionDispatchHook';

interface Options extends StoreActionOptions {
  readonly resultOfLoadAction?: TopicItemStoreLoadActionResult;
}

export function useStoreLoadActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    dispatchType,
    abortController,
    resultOfLoadAction
  }: Options = {}
): TopicItemStoreLoadActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfTopicItemStore = hooks.Features.Topic.Item.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Topic.useItemGetOperationRequestHandler()).current;

  const dataOfLoadAction = useMemo(
    () => createTopicItemStoreLoadActionData({
      resourceOfApiResponse,
      resourceOfTopicItemStore,
      requestHandler,
    }),
    [requestHandler, resourceOfApiResponse, resourceOfTopicItemStore]
  );

  const payloadOfLoadAction = useMemo(
    () => createTopicItemStoreLoadActionPayload({
      actionResult: resultOfLoadAction,
      sliceName,
    }),
    [resultOfLoadAction, sliceName]
  );

  const { run: complete } = useStoreLoadCompletedActionDispatch(sliceName);

  const runInner = useCallback(
    async (payload: TopicItemStoreLoadActionPayload, data: TopicItemStoreLoadActionData) => {
      const {
        abortSignal,
        requestHandler,
        resourceOfApiResponse,
        resourceOfTopicItemStore
      } = data;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createTopicItemStoreLoadAction(payload));

      const { actionResult } = payload;

      let response: TopicItemStoreLoadCompletedActionResult = null;

      try {
        response = actionResult
          ? await requestHandler.handle(
            createTopicDomainItemGetOperationRequest(
                actionResult,
                {
                  operationName: resourceOfTopicItemStore.getOperationNameForGet(),
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

      const dataOfLoadActionInner: TopicItemStoreLoadActionData = {
        ...dataOfLoadAction,
        abortSignal: abortControllerInner.signal,
      };

      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner(payloadOfLoadAction, dataOfLoadActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfLoadAction, dataOfLoadActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [aborted, dataOfLoadAction, dispatchType, payloadOfLoadAction, runInner]
  );

  return useMemo<TopicItemStoreLoadActionDispatch>(
    () => ({
      run: async (actionResult: TopicItemStoreLoadActionResult, abortSignal?: AbortSignal) => {
        const dataOfLoadActionInner = createTopicItemStoreLoadActionData({
          ...dataOfLoadAction,
          abortSignal,
        });

        const payloadOfLoadActionInner = createTopicItemStoreLoadActionPayload({
          ...payloadOfLoadAction,
          actionResult
        });

        await runInner(payloadOfLoadActionInner, dataOfLoadActionInner);
      }
    }),
    [dataOfLoadAction, payloadOfLoadAction, runInner]
  );
}
