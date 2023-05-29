import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreClearActionOutput,
  type ArticleItemStoreSliceName,
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './ArticleItemStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  sliceName: ArticleItemStoreSliceName
): ArticleItemStoreClearActionOutput {
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
