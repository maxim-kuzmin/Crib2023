import { useCallback } from 'react';
import {
  type ArticleItemStoreSetActionInput,
  type ArticleItemStoreSetActionOutput,
  type ArticleItemStoreSetActionPayload,
} from '../../../../../../app/Stores';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useSetActionDispatch } from './ArticleItemStoreSetActionDispatchHook';

export function useSetActionOutput (
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

  const dispatchOfSetAction = useSetActionDispatch(sliceName, { callback });

  const { payloadOfSetAction } = useStoreState(sliceName);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
