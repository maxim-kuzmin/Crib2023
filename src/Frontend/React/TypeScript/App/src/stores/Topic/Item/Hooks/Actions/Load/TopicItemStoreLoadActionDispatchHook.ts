import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createTopicDomainItemGetOperationRequest } from '../../../../../../domains';
import {
  type TopicItemStoreLoadActionData,
  type TopicItemStoreLoadActionDispatch,
  type TopicItemStoreLoadActionOptions,
  type TopicItemStoreLoadActionPayload,
  type TopicItemStoreLoadActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreLoadActionData,
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

  const { run: complete } = hooks.Features.Topic.Item.Store.useStoreLoadCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (
      payload: TopicItemStoreLoadActionPayload,
      dataOfLoadAction: TopicItemStoreLoadActionData
    ) => {
      const {
        abortSignal,
        requestHandler,
        resourceOfApiResponse,
        resourceOfTopicItemStore
      } = dataOfLoadAction;

      const { actionResult } = payload;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createTopicItemStoreLoadAction(payload));

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
        run(payloadOfLoadAction, dataOfLoadActionInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfLoadAction, dataOfLoadActionInner);
        } else {
          abortControllerInner.abort();
        }
      };
    },
    [aborted, dataOfLoadAction, dispatchType, payloadOfLoadAction, run]
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

        await run(payloadOfLoadActionInner, dataOfLoadActionInner);
      }
    }),
    [dataOfLoadAction, payloadOfLoadAction, run]
  );
}
