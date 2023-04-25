import { useMemo } from 'react';
import {
  getModule,
  type ArticleItemStoreClearActionInput,
  type ArticleItemStoreClearActionOutput,
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSetActionInput,
  type ArticleItemStoreSetActionOutput,
  type ArticleItemStoreHooks,
  ArticleItemStoreSliceName,
  type ArticleItemStoreState,
  LocalizationTarget
} from '../../../app';
import { type ArticleItemViewHooks } from './ArticleItemViewHooks';
import { type ArticleItemViewResource } from './ArticleItemViewResource';

export function createArticleItemViewHooks (storeHooks: ArticleItemStoreHooks): ArticleItemViewHooks {
  function useResource (): ArticleItemViewResource {
    const hooksOfLocalization = getModule().getLocalizationHooks();

    const localizer = hooksOfLocalization.useTranslator(LocalizationTarget.ArticleItemView);

    const tActionForBackToList: string = localizer.translate('@@ActionForBackToList');
    const tActionForEdit: string = localizer.translate('@@ActionForEdit');
    const tLabelForId: string = localizer.translate('@@LabelForId');
    const tTitle: string = localizer.translate('@@Title');

    return useMemo(() => {
        const result: ArticleItemViewResource = {
          getActionForBackToList: () => tActionForBackToList,
          getActionForEdit: () => tActionForEdit,
          getLabelForId: () => tLabelForId,
          getTitle: () => tTitle
        };

        return result;
      },
      [
        tTitle,
        tActionForBackToList,
        tActionForEdit,
        tLabelForId
      ]
    );
  }

  const sliceName = ArticleItemStoreSliceName.ArticleItemView;

  function useStoreClearActionOutput (input: ArticleItemStoreClearActionInput): ArticleItemStoreClearActionOutput {
    return storeHooks.useStoreClearActionOutput(sliceName, input);
  }

  function useStoreDeleteActionOutput (input?: ArticleItemStoreDeleteActionInput): ArticleItemStoreDeleteActionOutput {
    return storeHooks.useStoreDeleteActionOutput(sliceName, input);
  }

  function useStoreLoadActionOutput (input: ArticleItemStoreLoadActionInput): ArticleItemStoreLoadActionOutput {
    return storeHooks.useStoreLoadActionOutput(sliceName, input);
  }

  function useStoreSaveActionOutput (input?: ArticleItemStoreSaveActionInput): ArticleItemStoreSaveActionOutput {
    return storeHooks.useStoreSaveActionOutput(sliceName, input);
  }

  function useStoreSetActionOutput (input: ArticleItemStoreSetActionInput): ArticleItemStoreSetActionOutput {
    return storeHooks.useStoreSetActionOutput(sliceName, input);
  }

  function useStoreState (): ArticleItemStoreState {
    return storeHooks.useStoreState(sliceName);
  }

  return {
    useResource,
    useStoreClearActionOutput,
    useStoreDeleteActionOutput,
    useStoreLoadActionOutput,
    useStoreSaveActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
