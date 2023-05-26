import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createTopicDomainItemGetOperationRequest } from '../../../../../../domains';
import {
  type TopicItemStoreLoadActionDispatch,
  type TopicItemStoreLoadActionOptions,
  type TopicItemStoreLoadActionPayload,
  type TopicItemStoreLoadActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreLoadActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreLoadAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreLoadActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    abortController,
    resultOfLoadAction
  }: TopicItemStoreLoadActionOptions = {}
): TopicItemStoreLoadActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfTopicItemStore = hooks.Features.Topic.Item.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Topic.useItemGetOperationRequestHandler()).current;

  const payloadOfLoadAction = useMemo(
    () => createTopicItemStoreLoadActionPayload({
      actionResult: resultOfLoadAction,
      resourceOfApiResponse,
      resourceOfTopicItemStore,
      requestHandler,
      sliceName,
    }),
    [resultOfLoadAction, requestHandler, resourceOfApiResponse, resourceOfTopicItemStore, sliceName]
  );

  const { run: complete } = hooks.Features.Topic.Item.Store.useStoreLoadCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (payload: TopicItemStoreLoadActionPayload) => {
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

      dispatch(createTopicItemStoreLoadAction({ payload }));

      const response = actionResult
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

      const payloadOfLoadActionInner = createTopicItemStoreLoadActionPayload({
        ...payloadOfLoadAction,
        abortSignal: abortControllerInner.signal,
      });

      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfLoadActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfLoadActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [abortController, dispatchType, payloadOfLoadAction, run]
  );

  return useMemo<TopicItemStoreLoadActionDispatch>(
    () => ({
      run: async (actionResult: TopicItemStoreLoadActionResult, abortSignal?: AbortSignal) => {
        const payloadOfLoadActionInner = createTopicItemStoreLoadActionPayload({
          ...payloadOfLoadAction,
          abortSignal,
          actionResult
        });

        await run(payloadOfLoadActionInner);
      }
    }),
    [payloadOfLoadAction, run]
  );
}
