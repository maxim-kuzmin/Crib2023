import { useCallback } from 'react';
import {
  type ArticleListStoreSetActionResult,
  type ArticleListStoreSetActionInput,
  type ArticleListStoreSetActionOutput,
  type ArticleListStoreSliceName,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleListStoreStateHook';
import { useStoreSetActionDispatch } from './ArticleListStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  sliceName: ArticleListStoreSliceName,
  input: ArticleListStoreSetActionInput
): ArticleListStoreSetActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (data: ArticleListStoreSetActionResult) => {
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
