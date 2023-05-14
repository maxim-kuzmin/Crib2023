import { useCallback } from 'react';
import {
  type ArticleListStoreSlice,
  type ArticleListStoreSetActionInput,
  type ArticleListStoreSetActionOutput,
  type ArticleListStoreSetActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleListStoreStateHook';
import { useStoreSetActionDispatch } from './ArticleListStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  slice: ArticleListStoreSlice,
  input: ArticleListStoreSetActionInput
): ArticleListStoreSetActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (payload: ArticleListStoreSetActionPayload) => {
      if (onActionCompleted) {
        onActionCompleted(payload);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfSetAction = useStoreSetActionDispatch(slice, { callback });

  const { payloadOfSetAction } = useStoreState(slice);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
