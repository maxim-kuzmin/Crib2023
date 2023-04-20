import { useCallback } from 'react';
import {
  type ArticleItemStoreSetActionInput,
  type ArticleItemStoreSetActionOutput,
  type ArticleItemStoreSetActionPayload,
} from '../../../../../../app/Stores';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useSetActionDispatch } from './ArticleItemStoreSetActionDispatchHook';

// ---Store---> //

type SetActionInput = ArticleItemStoreSetActionInput;
type SetActionOutput = ArticleItemStoreSetActionOutput;
type SetActionPayload = ArticleItemStoreSetActionPayload;

// <---Store--- //

export function useSetActionOutput (sliceName: string, input: SetActionInput): SetActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback((payload: SetActionPayload) => {
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
