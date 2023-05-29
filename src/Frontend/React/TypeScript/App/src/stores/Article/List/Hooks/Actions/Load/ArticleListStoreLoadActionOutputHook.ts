import { StoreDispatchType, OperationStatus } from '../../../../../../common';
import {
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreSliceName,
} from '../../../../../../features';
import { useStoreState } from '../../ArticleListStoreStateHook';
import { useStoreLoadActionDispatch } from './ArticleListStoreLoadActionDispatchHook';

export function useStoreLoadActionOutput (
  sliceName: ArticleListStoreSliceName,
  input: ArticleListStoreLoadActionInput
): ArticleListStoreLoadActionOutput {
  const { abortController, resultOfLoadAction } = input;

  const dispatchOfLoadAction = useStoreLoadActionDispatch(
    sliceName,
    {
      abortController,
      dispatchType: StoreDispatchType.MountOrUpdate,
      resultOfLoadAction
    }
  );

  const { resultOfLoadCompletedAction, statusOfLoadAction } = useStoreState(sliceName);

  return {
    dispatchOfLoadAction,
    pendingOfLoadAction: statusOfLoadAction === OperationStatus.Pending,
    resultOfLoadCompletedAction,
  };
}
