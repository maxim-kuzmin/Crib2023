import { useMemo } from 'react';
import { useAppInstance } from '../../../app';
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
  ArticleItemStoreKey,
  type ArticleItemStoreState,
} from '../../../features';
import {
  type ArticleItemViewResource,
  getArticleItemViewResourcePath
} from './ArticleItemViewResource';
import { createArticleItemEditViewHooks } from './Edit/ArticleItemEditViewHooks';
import { type ArticleItemEditViewHooks } from './Edit';

export interface ArticleItemViewHooks {
  readonly Edit: ArticleItemEditViewHooks;

  readonly useResource: () => ArticleItemViewResource;

  readonly useStoreClearActionOutput: (
    input: ArticleItemStoreClearActionInput
  ) => ArticleItemStoreClearActionOutput;

  readonly useStoreDeleteActionOutput: (
    input?: ArticleItemStoreDeleteActionInput
  ) => ArticleItemStoreDeleteActionOutput;

  readonly useStoreLoadActionOutput: (
    input: ArticleItemStoreLoadActionInput
  ) => ArticleItemStoreLoadActionOutput;

  readonly useStoreSaveActionOutput: (
    input?: ArticleItemStoreSaveActionInput
  ) => ArticleItemStoreSaveActionOutput;

  readonly useStoreSetActionOutput: (
    input: ArticleItemStoreSetActionInput
  ) => ArticleItemStoreSetActionOutput;

  readonly useStoreState: () => ArticleItemStoreState;
}

interface Options {
  readonly hooksOfArticleItemStore: ArticleItemStoreHooks;
}

export function createArticleItemViewHooks ({
  hooksOfArticleItemStore
}: Options): ArticleItemViewHooks {
  function useResource (): ArticleItemViewResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.Localization.useTranslator(getArticleItemViewResourcePath());

    const tActionForBackToList: string = translator.translate('@@ActionForBackToList');
    const tActionForEdit: string = translator.translate('@@ActionForEdit');
    const tLabelForId: string = translator.translate('@@LabelForId');
    const tTitle: string = translator.translate('@@Title');

    const { language } = translator;

    return useMemo(() => {
        const result: ArticleItemViewResource = {
          getActionForBackToList: () => tActionForBackToList,
          getActionForEdit: () => tActionForEdit,
          getLabelForId: () => tLabelForId,
          getTitle: () => tTitle,
          language
        };

        return result;
      },
      [
        tTitle,
        tActionForBackToList,
        tActionForEdit,
        tLabelForId,
        language
      ]
    );
  }

  const storeKey = ArticleItemStoreKey.ArticleItemView;

  function useStoreClearActionOutput (input: ArticleItemStoreClearActionInput): ArticleItemStoreClearActionOutput {
    return hooksOfArticleItemStore.useStoreClearActionOutput(storeKey, input);
  }

  function useStoreDeleteActionOutput (input?: ArticleItemStoreDeleteActionInput): ArticleItemStoreDeleteActionOutput {
    return hooksOfArticleItemStore.useStoreDeleteActionOutput(storeKey, input);
  }

  function useStoreLoadActionOutput (input: ArticleItemStoreLoadActionInput): ArticleItemStoreLoadActionOutput {
    return hooksOfArticleItemStore.useStoreLoadActionOutput(storeKey, input);
  }

  function useStoreSaveActionOutput (input?: ArticleItemStoreSaveActionInput): ArticleItemStoreSaveActionOutput {
    return hooksOfArticleItemStore.useStoreSaveActionOutput(storeKey, input);
  }

  function useStoreSetActionOutput (input: ArticleItemStoreSetActionInput): ArticleItemStoreSetActionOutput {
    return hooksOfArticleItemStore.useStoreSetActionOutput(storeKey, input);
  }

  function useStoreState (): ArticleItemStoreState {
    return hooksOfArticleItemStore.useStoreState(storeKey);
  }

  return {
    Edit: createArticleItemEditViewHooks(),
    useResource,
    useStoreClearActionOutput,
    useStoreDeleteActionOutput,
    useStoreLoadActionOutput,
    useStoreSaveActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
