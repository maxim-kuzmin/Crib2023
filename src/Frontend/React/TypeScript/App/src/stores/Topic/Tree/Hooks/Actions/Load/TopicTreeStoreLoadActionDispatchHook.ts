import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { createTopicDomainTreeGetOperationRequest } from '../../../../../../domains';
import {
  type TopicTreeStoreLoadActionDispatch,
  type TopicTreeStoreLoadActionOptions,
  type TopicTreeStoreLoadActionPayload,
  type TopicTreeStoreLoadActionResult,
  type TopicTreeStoreSliceName,
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

  const payloadOfLoadAction = useMemo(
    () => createTopicTreeStoreLoadActionPayload({
      actionResult: resultOfLoadAction,
      resourceOfApiResponse,
      resourceOfTopicTreeStore,
      requestHandler,
      sliceName,
    }),
    [resultOfLoadAction, requestHandler, resourceOfApiResponse, resourceOfTopicTreeStore, sliceName]
  );

  const { run: complete } = hooks.Features.Topic.Tree.Store.useStoreLoadCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (payload: TopicTreeStoreLoadActionPayload) => {
      const {
        abortSignal,
        actionResult,
        requestHandler,
        resourceOfApiResponse,
        resourceOfTopicTreeStore
      } = payload;

      if (abortSignal?.aborted) {
        return;
      }

      dispatch(createTopicTreeStoreLoadAction({ payload }));

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

  useEffect(
    () => {
      if (abortController?.signal.aborted) {
        return;
      }

      const abortControllerInner = new AbortController();

      const payloadOfLoadActionInner = createTopicTreeStoreLoadActionPayload({
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

  return useMemo<TopicTreeStoreLoadActionDispatch>(
    () => ({
      run: async (actionResult: TopicTreeStoreLoadActionResult, abortSignal?: AbortSignal) => {
        const payloadOfLoadActionInner = createTopicTreeStoreLoadActionPayload({
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
