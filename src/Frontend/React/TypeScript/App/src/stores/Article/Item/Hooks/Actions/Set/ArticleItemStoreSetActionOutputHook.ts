import { useCallback } from 'react';
import {
  type ArticleItemStoreSliceName,
  type ArticleItemStoreSetActionResult,
  type ArticleItemStoreSetActionInput,
  type ArticleItemStoreSetActionOutput,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useStoreSetActionDispatch } from './ArticleItemStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  sliceName: ArticleItemStoreSliceName,
  input: ArticleItemStoreSetActionInput
): ArticleItemStoreSetActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (data: ArticleItemStoreSetActionResult) => {
      if (onActionCompleted) {
        onActionCompleted(data);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfSetAction = useStoreSetActionDispatch(sliceName, { callback });

  const { resultOfSetAction } = useStoreState(sliceName);

  return {
    dispatchOfSetAction,
    resultOfSetAction,
  };
}
