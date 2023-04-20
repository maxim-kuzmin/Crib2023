import { useCallback } from 'react';
import {
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSaveCompletedActionPayload,
} from '../../../../../../app/Stores';
import { OperationStatus } from '../../../../../../common';
import { useStoreState } from '../../ArticleItemStoreStateHook';
import { useSaveActionDispatch } from './ArticleItemStoreSaveActionDispatchHook';

// ---Store---> //

type SaveActionInput = ArticleItemStoreSaveActionInput;
type SaveActionOutput = ArticleItemStoreSaveActionOutput;

type SaveCompletedActionPayload = ArticleItemStoreSaveCompletedActionPayload;

// <---Store--- //

export function useSaveActionOutput (sliceName: string, input: SaveActionInput): SaveActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback((payload: SaveCompletedActionPayload) => {
      if (onActionCompleted) {
        onActionCompleted(payload);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfSaveAction = useSaveActionDispatch(sliceName, { callback });

  const { payloadOfSaveCompletedAction, statusOfSaveAction } = useStoreState(sliceName);

  return {
    dispatchOfSaveAction,
    payloadOfSaveCompletedAction,
    pendingOfSaveAction: statusOfSaveAction === OperationStatus.Pending
  };
}
