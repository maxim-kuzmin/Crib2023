import { type Dispatch, useEffect, useRef } from 'react';
import {
  type ArticleListStoreSetActionCallback,
  type ArticleListStoreSetActionDispatch,
  type ArticleListStoreSetActionOptions,
  type ArticleListStoreSetActionPayload,
} from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { ArticleListStoreActionType } from '../../../ArticleListStoreActionType';
import { type ArticleListStoreActionUnion } from '../../../ArticleListStoreActionUnion';
import { useArticleListStoreDispatchContext } from '../../../ArticleListStoreContext';

interface Options {
  readonly callback?: ArticleListStoreSetActionCallback;
  readonly dispatch: Dispatch<ArticleListStoreActionUnion>;
  readonly payload: ArticleListStoreSetActionPayload;
  readonly sliceName: string;
}

function runSetAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: Options) {
  dispatch({
    payload,
    sliceName,
    type: ArticleListStoreActionType.Set
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreSetActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payloadOfSetAction
  }: ArticleListStoreSetActionOptions
): ArticleListStoreSetActionDispatch {
  const dispatch = useArticleListStoreDispatchContext();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSetAction) {
        runSetAction({
          callback,
          dispatch,
          payload: payloadOfSetAction,
          sliceName
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSetAction) {
          runSetAction({
            callback,
            dispatch,
            payload: payloadOfSetAction,
            sliceName
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfSetAction,
      sliceName
    ]
  );

  function run (payload: ArticleListStoreSetActionPayload) {
    runSetAction({
      callback,
      dispatch,
      payload,
      sliceName
    });
  }

  return useRef({
    run
  }).current;
}
