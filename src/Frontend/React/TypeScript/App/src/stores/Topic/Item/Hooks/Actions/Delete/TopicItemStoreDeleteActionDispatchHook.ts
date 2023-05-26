import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createTopicDomainItemDeleteOperationRequest } from '../../../../../../domains';
import {
  type TopicItemStoreDeleteActionDispatch,
  type TopicItemStoreDeleteActionOptions,
  type TopicItemStoreDeleteActionPayload,
  type TopicItemStoreDeleteActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreDeleteActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreDeleteAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreDeleteActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    abortController,
    resultOfDeleteAction
  }: TopicItemStoreDeleteActionOptions = {}
): TopicItemStoreDeleteActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfTopicItemStore = hooks.Features.Topic.Item.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Topic.useItemDeleteOperationRequestHandler()).current;

  const payloadOfDeleteAction = useMemo(
    () => createTopicItemStoreDeleteActionPayload({
      actionResult: resultOfDeleteAction,
      resourceOfApiResponse,
      resourceOfTopicItemStore,
      requestHandler,
      sliceName,
    }),
    [resultOfDeleteAction, requestHandler, resourceOfApiResponse, resourceOfTopicItemStore, sliceName]
  );

  const { run: complete } = hooks.Features.Topic.Item.Store.useStoreDeleteCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (payload: TopicItemStoreDeleteActionPayload) => {
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

      dispatch(createTopicItemStoreDeleteAction({ payload }));

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

  useEffect(
    () => {
      if (abortController?.signal.aborted) {
        return;
      }

      const abortControllerInner = new AbortController();

      const payloadOfDeleteActionInner = createTopicItemStoreDeleteActionPayload({
        ...payloadOfDeleteAction,
        abortSignal: abortControllerInner.signal,
      });

      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfDeleteActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfDeleteActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [abortController, dispatchType, payloadOfDeleteAction, run]
  );

  return useMemo<TopicItemStoreDeleteActionDispatch>(
    () => ({
      run: async (actionResult: TopicItemStoreDeleteActionResult, abortSignal?: AbortSignal) => {
        const payloadOfDeleteActionInner = createTopicItemStoreDeleteActionPayload({
          ...payloadOfDeleteAction,
          abortSignal,
          actionResult
        });

        await run(payloadOfDeleteActionInner);
      }
    }),
    [payloadOfDeleteAction, run]
  );
}
