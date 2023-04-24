import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type ArticleListStoreClearActionInput,
  type ArticleListStoreClearActionOutput,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreSetActionInput,
  type ArticleListStoreSetActionOutput,
  type ArticleListStoreHooks,
  ArticleListStoreSliceName,
  type ArticleListStoreState,
} from '../../../app/Stores';
import { type ArticleTableViewHooks } from './ArticleTableViewHooks';
import { type ArticleTableViewResource } from './ArticleTableViewResource';

export function createArticleTableViewHooks (storeHooks: ArticleListStoreHooks): ArticleTableViewHooks {
  function useResource (): ArticleTableViewResource {
    const { t } = useTranslation('views/Article/Table/ArticleTableView');

    const tArticles: string = t('@@Articles');
    const tActions: string = t('@@Actions');
    const tDelete: string = t('@@Delete');
    const tDisplay: string = t('@@Display');
    const tEdit: string = t('@@Edit');
    const tId: string = t('@@Id');
    const tNew: string = t('@@New');
    const tPath: string = t('@@Path');
    const tTitle: string = t('@@Title');

    return useMemo(() => {
        const result: ArticleTableViewResource = {
          getArticles: () => tArticles,
          getActions: () => tActions,
          getDelete: () => tDelete,
          getDisplay: () => tDisplay,
          getEdit: () => tEdit,
          getId: () => tId,
          getNew: () => tNew,
          getPath: () => tPath,
          getTitle: () => tTitle
        };

        return result;
      },
      [
        tArticles,
        tActions,
        tDelete,
        tDisplay,
        tEdit,
        tId,
        tNew,
        tPath,
        tTitle
    ]
    );
  }

  const sliceName = ArticleListStoreSliceName.ArticleTableView;

  function useStoreClearActionOutput (input: ArticleListStoreClearActionInput): ArticleListStoreClearActionOutput {
    return storeHooks.useStoreClearActionOutput(sliceName, input);
  }

  function useStoreLoadActionOutput (input: ArticleListStoreLoadActionInput): ArticleListStoreLoadActionOutput {
    return storeHooks.useStoreLoadActionOutput(sliceName, input);
  }

  function useStoreSetActionOutput (input: ArticleListStoreSetActionInput): ArticleListStoreSetActionOutput {
    return storeHooks.useStoreSetActionOutput(sliceName, input);
  }

  function useStoreState (): ArticleListStoreState {
    return storeHooks.useStoreState(sliceName);
  }

  return {
    useResource,
    useStoreClearActionOutput,
    useStoreLoadActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
