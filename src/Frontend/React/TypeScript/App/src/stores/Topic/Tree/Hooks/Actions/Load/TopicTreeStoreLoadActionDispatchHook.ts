import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createTopicDomainTreeGetOperationRequest } from '../../../../../../domains';
import {
  type TopicTreeStoreLoadActionData,
  type TopicTreeStoreLoadActionDispatch,
  type TopicTreeStoreLoadActionOptions,
  type TopicTreeStoreLoadActionPayload,
  type TopicTreeStoreLoadActionResult,
  type TopicTreeStoreSliceName,
  createTopicTreeStoreLoadActionData,
  createTopicTreeStoreLoadActionPayload,
} from '../../../../../../features';
import { createTopicTreeStoreLoadAction } from '../../../Actions';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

export function useStoreLoadActionDispatch (
  sliceName: TopicTreeStoreSliceName,
  {
    callback,
    dispatchType,
    abortController,
    resultOfLoadAction
  }: TopicTreeStoreLoadActionOptions = {}
): TopicTreeStoreLoadActionDispatch {
  const dispatch = useTopicTreeStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfTopicTreeStore = hooks.Features.Topic.Tree.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Topic.useTreeGetOperationRequestHandler()).current;

  const dataOfLoadAction = useMemo(
    () => createTopicTreeStoreLoadActionData({
      resourceOfApiResponse,
      resourceOfTopicTreeStore,
      requestHandler,
    }),
    [requestHandler, resourceOfApiResponse, resourceOfTopicTreeStore]
  );

  const payloadOfLoadAction = useMemo(
    () => createTopicTreeStoreLoadActionPayload({
      actionResult: resultOfLoadAction,
      sliceName,
    }),
    [resultOfLoadAction, sliceName]
  );

  const { run: complete } = hooks.Features.Topic.Tree.Store.useStoreLoadCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const runInner = useCallback(
    async (payload: TopicTreeStoreLoadActionPayload, data: TopicTreeStoreLoadActionData) => {
      const {
        abortSignal,
        requestHandler,
        resourceOfApiResponse,
        resourceOfTopicTreeStore
      } = data;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createTopicTreeStoreLoadAction(payload));

      const { actionResult } = payload;

      const response = actionResult
        ? await requestHandler.handle(
            createTopicDomainTreeGetOperationRequest(
              actionResult,
              {
                operationName: resourceOfTopicTreeStore.getOperationNameForGet(),
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

      const dataOfLoadActionInner: TopicTreeStoreLoadActionData = {
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

  return useMemo<TopicTreeStoreLoadActionDispatch>(
    () => ({
      run: async (actionResult: TopicTreeStoreLoadActionResult, abortSignal?: AbortSignal) => {
        const dataOfLoadActionInner = createTopicTreeStoreLoadActionData({
          ...dataOfLoadAction,
          abortSignal,
        });

        const payloadOfLoadActionInner = createTopicTreeStoreLoadActionPayload({
          ...payloadOfLoadAction,
          actionResult
        });

        await runInner(payloadOfLoadActionInner, dataOfLoadActionInner);
      }
    }),
    [dataOfLoadAction, payloadOfLoadAction, runInner]
  );
}
