import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType, shouldNotBeCanceled } from '../../../../../../common';
import { createTopicDomainTreeGetOperationRequest } from '../../../../../../domains';
import {
  type TopicTreeStoreLoadActionDispatch,
  type TopicTreeStoreLoadActionOptions,
  type TopicTreeStoreLoadActionPayload,
  type TopicTreeStoreSliceName,
} from '../../../../../../features';
import { TopicTreeStoreActionType } from '../../../TopicTreeStoreActionType';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

export function useStoreLoadActionDispatch (
  sliceName: TopicTreeStoreSliceName,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfLoadAction
  }: TopicTreeStoreLoadActionOptions = {}
): TopicTreeStoreLoadActionDispatch {
  const dispatch = useTopicTreeStoreDispatch();

  const { hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();
  const resourceOfTopicTreeStore = hooks.Features.Topic.Tree.Store.useResource();
  const requestHandler = useRef(hooks.Domains.Topic.useTreeGetOperationRequestHandler()).current;

  const { run: complete } = hooks.Features.Topic.Tree.Store.useStoreLoadCompletedActionDispatch(
    sliceName,
    { callback }
  );

  const run = useCallback(
    async (
      payload: TopicTreeStoreLoadActionPayload,
      shouldBeCanceled: ShouldBeCanceled = shouldNotBeCanceled
    ) => {
      if (shouldBeCanceled()) {
        return;
      }

      dispatch({ payload, sliceName, type: TopicTreeStoreActionType.Load });

      const response = payload
        ? await requestHandler.handle(
            createTopicDomainTreeGetOperationRequest(
              payload,
              {
                operationName: resourceOfTopicTreeStore.getOperationNameForGet(),
                resourceOfApiResponse
              }
            ),
            shouldBeCanceled
          )
        : null;

      if (shouldBeCanceled()) {
        return;
      }

      complete(response);
    },
    [complete, dispatch, requestHandler, resourceOfApiResponse, resourceOfTopicTreeStore, sliceName]
  );

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadAction) {
        run(payloadOfLoadAction, shouldBeCanceledInner);
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadAction) {
          run(payloadOfLoadAction, shouldBeCanceledInner);
        } else {
          isCanceledInner = true;
        }
      };
    },
    [dispatchType, isCanceled, payloadOfLoadAction, run]
  );

  return useMemo<TopicTreeStoreLoadActionDispatch>(() => ({ run }), [run]);
}
