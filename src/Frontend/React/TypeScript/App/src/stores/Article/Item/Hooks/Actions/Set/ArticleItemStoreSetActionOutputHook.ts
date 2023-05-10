import { useCallback } from 'react';
import {
  type ArticleItemStoreSetActionInput,
  type ArticleItemStoreSetActionOutput,
  type ArticleItemStoreSetActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useStoreSetActionDispatch } from './ArticleItemStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  storeKey: string,
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

  const dispatchOfSetAction = useStoreSetActionDispatch(storeKey, { callback });

  const { payloadOfSetAction } = useStoreState(storeKey);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
