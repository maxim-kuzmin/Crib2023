import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
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
  LocalizationNamespace
} from '../../../app';
import { type ArticleItemViewHooks } from './ArticleItemViewHooks';
import { type ArticleItemViewResource } from './ArticleItemViewResource';

export function createArticleItemViewHooks (storeHooks: ArticleItemStoreHooks): ArticleItemViewHooks {
  function useResource (): ArticleItemViewResource {
    const { t } = useTranslation(LocalizationNamespace.ArticleItemView);

    const tArticle: string = t('@@Article');
    const tBackToList: string = t('@@Back_to_list');
    const tEdit: string = t('@@Edit');
    const tId: string = t('@@Id');

    return useMemo(() => {
        const result: ArticleItemViewResource = {
          getArticle: () => tArticle,
          getBackToList: () => tBackToList,
          getEdit: () => tEdit,
          getId: () => tId
        };

        return result;
      },
      [
        tArticle,
        tBackToList,
        tEdit,
        tId
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
