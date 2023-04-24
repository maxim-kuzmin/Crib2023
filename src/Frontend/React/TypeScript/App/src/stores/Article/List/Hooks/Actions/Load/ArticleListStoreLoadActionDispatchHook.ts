import { type Dispatch, useEffect, useRef } from 'react';
import {
  getModule,
  type ArticleListStoreSetActionCallback,
  type ArticleListStoreLoadActionDispatch,
  type ArticleListStoreLoadActionOptions,
  type ArticleListStoreLoadActionPayload,
  type ArticleListStoreResource,
} from '../../../../../../app';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import {
  type ArticleDomainListGetOperationRequestHandler,
  createArticleDomainListGetOperationRequest
} from '../../../../../../domains';
import { ArticleListStoreActionType } from '../../../ArticleListStoreActionType';
import { type ArticleListStoreActionUnion } from '../../../ArticleListStoreActionUnion';
import { useArticleListStoreDispatchContext } from '../../../ArticleListStoreContext';
import { runLoadCompletedAction } from '../LoadCompleted/ArticleListStoreLoadCompletedActionDispatchHook';

interface Options {
  readonly callback?: ArticleListStoreSetActionCallback;
  readonly dispatch: Dispatch<ArticleListStoreActionUnion>;
  readonly payload: ArticleListStoreLoadActionPayload;
  readonly requestHandler: ArticleDomainListGetOperationRequestHandler;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfArticleListStore: ArticleListStoreResource;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runLoadAction ({
  callback,
  dispatch,
  payload,
  requestHandler,
  resourceOfApiResponse,
  resourceOfArticleListStore,
  shouldBeCanceled,
  sliceName,
}: Options) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch({
    payload,
    sliceName,
    type: ArticleListStoreActionType.Load
  });

  const response = payload
    ? await requestHandler.handle(
        createArticleDomainListGetOperationRequest(
          payload,
          {
            operationName: resourceOfArticleListStore.getGetOperationName(),
            resourceOfApiResponse
          }
        ),
        shouldBeCanceled
      )
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runLoadCompletedAction({
    callback,
    dispatch,
    payload: response,
    sliceName
  });
}

export function useStoreLoadActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payloadOfLoadAction
  }: ArticleListStoreLoadActionOptions = {}
): ArticleListStoreLoadActionDispatch {
  const hooksOfApiResponse = getModule().getApiResponseHooks();

  const resourceOfApiResponse = hooksOfApiResponse.useResource();

  const hooksOfArticleListStore = getModule().getArticleListStoreHooks();

  const resourceOfArticleListStore = hooksOfArticleListStore.useResource();

  const dispatch = useArticleListStoreDispatchContext();

  const requestHandler = useRef(
    getModule().useArticleDomainListGetOperationRequestHandler()
  ).current;

  useEffect(
    () => {
      let isCanceledInner = isCanceled ?? false;

      const shouldBeCanceledInner = () => isCanceledInner;

      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadAction) {
        runLoadAction({
          callback,
          dispatch,
          payload: payloadOfLoadAction,
          requestHandler,
          resourceOfApiResponse,
          resourceOfArticleListStore,
          shouldBeCanceled: shouldBeCanceledInner,
          sliceName
        });
      }

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadAction) {
          runLoadAction({
            callback,
            dispatch,
            payload: payloadOfLoadAction,
            requestHandler,
            resourceOfApiResponse,
            resourceOfArticleListStore,
            shouldBeCanceled: shouldBeCanceledInner,
            sliceName
            });
        } else {
          isCanceledInner = true;
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      isCanceled,
      payloadOfLoadAction,
      requestHandler,
      resourceOfApiResponse,
      resourceOfArticleListStore,
      sliceName
    ]
  );

  async function run (
    payload: ArticleListStoreLoadActionPayload,
    shouldBeCanceled: ShouldBeCanceled = () => false
  ): Promise<void> {
    await runLoadAction({
      callback,
      dispatch,
      payload,
      requestHandler,
      resourceOfApiResponse,
      resourceOfArticleListStore,
      shouldBeCanceled,
      sliceName
    });
  }

  const result: ArticleListStoreLoadActionDispatch = {
    run
  };

  return useRef(result).current;
}
