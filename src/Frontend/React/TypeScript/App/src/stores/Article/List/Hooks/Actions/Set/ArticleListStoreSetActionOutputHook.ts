import { useCallback } from 'react';
import {
  type ArticleListStoreSetActionInput,
  type ArticleListStoreSetActionOutput,
  type ArticleListStoreSetActionPayload,
} from '../../../../../../app/Stores';
import { useStoreState } from '../../ArticleListStoreStateHook';
import { useSetActionDispatch } from './ArticleListStoreSetActionDispatchHook';

export function useSetActionOutput (
  sliceName: string,
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

  const dispatchOfSetAction = useSetActionDispatch(sliceName, { callback });

  const { payloadOfSetAction } = useStoreState(sliceName);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
