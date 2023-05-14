import { useCallback } from 'react';
import {
  type ArticleListStoreSliceName,
  type ArticleListStoreSetActionInput,
  type ArticleListStoreSetActionOutput,
  type ArticleListStoreSetActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleListStoreStateHook';
import { useStoreSetActionDispatch } from './ArticleListStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  sliceName: ArticleListStoreSliceName,
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

  const dispatchOfSetAction = useStoreSetActionDispatch(sliceName, { callback });

  const { payloadOfSetAction } = useStoreState(sliceName);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
