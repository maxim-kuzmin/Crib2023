import { useCallback } from 'react';
import {
  type ArticleListStoreSetActionInput,
  type ArticleListStoreSetActionOutput,
  type ArticleListStoreSetActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleListStoreStateHook';
import { useStoreSetActionDispatch } from './ArticleListStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  owner: string,
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

  const dispatchOfSetAction = useStoreSetActionDispatch(owner, { callback });

  const { payloadOfSetAction } = useStoreState(owner);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
