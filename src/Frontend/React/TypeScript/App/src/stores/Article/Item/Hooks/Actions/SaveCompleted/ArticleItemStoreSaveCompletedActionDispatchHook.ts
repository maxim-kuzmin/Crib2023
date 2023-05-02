import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSaveCompletedActionCallback,
  type ArticleItemStoreSaveCompletedActionDispatch,
  type ArticleItemStoreSaveCompletedActionOptions,
  type ArticleItemStoreSaveCompletedActionPayload,
} from '../../../../../../features';
import { ArticleItemStoreActionType } from '../../../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../../../ArticleItemStoreActionUnion';
import { useArticleItemStoreDispatchContext } from '../../../ArticleItemStoreContext';

interface Options {
  readonly callback?: ArticleItemStoreSaveCompletedActionCallback;
  readonly dispatch: Dispatch<ArticleItemStoreActionUnion>;
  readonly payload: ArticleItemStoreSaveCompletedActionPayload;
  readonly sliceName: string;
}

export function runSaveCompletedAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: Options) {
  dispatch({
    payload,
    sliceName,
    type: ArticleItemStoreActionType.SaveCompleted
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreSaveCompletedActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payloadOfSaveCompletedAction
  }: ArticleItemStoreSaveCompletedActionOptions = {}
): ArticleItemStoreSaveCompletedActionDispatch {
  const dispatch = useArticleItemStoreDispatchContext();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSaveCompletedAction) {
        runSaveCompletedAction({
          callback,
          dispatch,
          payload: payloadOfSaveCompletedAction,
          sliceName
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSaveCompletedAction) {
          runSaveCompletedAction({
            callback,
            dispatch,
            payload: payloadOfSaveCompletedAction,
            sliceName
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfSaveCompletedAction,
      sliceName
    ]
  );

  function run (payload: ArticleItemStoreSaveCompletedActionPayload) {
    runSaveCompletedAction({
      callback,
      dispatch,
      payload,
      sliceName,
    });
  }

  return useRef({
    run
  }).current;
}
