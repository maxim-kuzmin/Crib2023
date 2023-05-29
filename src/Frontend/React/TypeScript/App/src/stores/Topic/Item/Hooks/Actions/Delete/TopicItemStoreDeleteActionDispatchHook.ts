import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import { createTopicDomainItemDeleteOperationRequest } from '../../../../../../domains';
import {
  type TopicItemStoreDeleteActionData,
  type TopicItemStoreDeleteActionDispatch,
  type TopicItemStoreDeleteActionPayload,
  type TopicItemStoreDeleteActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreDeleteActionData,
  createTopicItemStoreDeleteActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreDeleteAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';
import {
  useStoreDeleteCompletedActionDispatch
} from '../DeleteCompleted/TopicItemStoreDeleteCompletedActionDispatchHook';

interface Options extends StoreActionOptions {
  readonly resultOfDeleteAction?: TopicItemStoreDeleteActionResult;
}

export function useStoreDeleteActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    dispatchType,
    abortController,
    resultOfDeleteAction
  }: Options = {}
): TopicItemStoreDeleteActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfTopicItemStore = hooks.Features.Topic.Item.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Topic.useItemDeleteOperationRequestHandler()).current;

  const dataOfDeleteAction = useMemo(
    () => createTopicItemStoreDeleteActionData({
      resourceOfApiResponse,
      resourceOfTopicItemStore,
      requestHandler,
    }),
    [requestHandler, resourceOfApiResponse, resourceOfTopicItemStore]
  );

  const payloadOfDeleteAction = useMemo(
    () => createTopicItemStoreDeleteActionPayload({
      actionResult: resultOfDeleteAction,
      sliceName,
    }),
    [resultOfDeleteAction, sliceName]
  );

  const { run: complete } = useStoreDeleteCompletedActionDispatch(sliceName);

  const runInner = useCallback(
    async (payload: TopicItemStoreDeleteActionPayload, data: TopicItemStoreDeleteActionData) => {
      const {
        abortSignal,
        requestHandler,
        resourceOfApiResponse,
        resourceOfTopicItemStore
      } = data;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createTopicItemStoreDeleteAction(payload));

      const { actionResult } = payload;

      const response = actionResult
        ? await requestHandler.handle(
            createTopicDomainItemDeleteOperationRequest(
              actionResult,
              {
                operationName: resourceOfTopicItemStore.getOperationNameForDelete(),
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

      const dataOfDeleteActionInner: TopicItemStoreDeleteActionData = {
        ...dataOfDeleteAction,
        abortSignal: abortControllerInner.signal,
      };

      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner(payloadOfDeleteAction, dataOfDeleteActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfDeleteAction, dataOfDeleteActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [aborted, dataOfDeleteAction, dispatchType, payloadOfDeleteAction, runInner]
  );

  return useMemo<TopicItemStoreDeleteActionDispatch>(
    () => ({
      run: async (actionResult: TopicItemStoreDeleteActionResult, abortSignal?: AbortSignal) => {
        const dataOfDeleteActionInner = createTopicItemStoreDeleteActionData({
          ...dataOfDeleteAction,
          abortSignal,
        });

        const payloadOfDeleteActionInner = createTopicItemStoreDeleteActionPayload({
          ...payloadOfDeleteAction,
          actionResult
        });

        await runInner(payloadOfDeleteActionInner, dataOfDeleteActionInner);
      }
    }),
    [dataOfDeleteAction, payloadOfDeleteAction, runInner]
  );
}
