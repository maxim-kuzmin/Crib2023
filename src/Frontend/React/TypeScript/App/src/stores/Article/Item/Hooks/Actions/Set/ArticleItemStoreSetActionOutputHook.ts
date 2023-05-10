import { useCallback } from 'react';
import {
  type ArticleItemStoreSetActionInput,
  type ArticleItemStoreSetActionOutput,
  type ArticleItemStoreSetActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useStoreSetActionDispatch } from './ArticleItemStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  owner: string,
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

  const dispatchOfSetAction = useStoreSetActionDispatch(owner, { callback });

  const { payloadOfSetAction } = useStoreState(owner);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
