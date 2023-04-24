import { useCallback } from 'react';
import {
  type ArticleItemStoreSetActionInput,
  type ArticleItemStoreSetActionOutput,
  type ArticleItemStoreSetActionPayload,
} from '../../../../../../app/Stores';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useStoreSetActionDispatch } from './ArticleItemStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  sliceName: string,
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
