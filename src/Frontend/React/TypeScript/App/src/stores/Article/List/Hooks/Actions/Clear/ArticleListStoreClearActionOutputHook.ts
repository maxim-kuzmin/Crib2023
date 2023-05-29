import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreClearActionOutput,
  type ArticleListStoreSliceName,
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './ArticleListStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  sliceName: ArticleListStoreSliceName
): ArticleListStoreClearActionOutput {
  const dispatchOfClearAction = useStoreClearActionDispatch(
    sliceName,
    {
      dispatchType: StoreDispatchType.Unmount
    }
  );

  return {
    dispatchOfClearAction
  };
}
