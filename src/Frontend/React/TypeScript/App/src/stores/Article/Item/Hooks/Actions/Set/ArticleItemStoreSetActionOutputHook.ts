import { useCallback } from 'react';
import {
  type ArticleItemStoreSliceName,
  type ArticleItemStoreSetActionInput,
  type ArticleItemStoreSetActionOutput,
  type ArticleItemStoreSetActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useStoreSetActionDispatch } from './ArticleItemStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  sliceName: ArticleItemStoreSliceName,
  input: ArticleItemStoreSetActionInput
): ArticleItemStoreSetActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (payload: ArticleItemStoreSetActionPayload) => {
      if (onActionCompleted) {
        onActionCompleted(payload);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfSetAction = useStoreSetActionDispatch(sliceName, { callback });

  const { payloadOfSetAction } = useStoreState(sliceName);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
