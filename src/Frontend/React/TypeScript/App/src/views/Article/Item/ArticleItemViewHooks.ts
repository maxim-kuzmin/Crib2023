import { useMemo } from 'react';
import app, {
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
import { type ArticleItemViewResource } from './ArticleItemViewResource';
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

export function createArticleItemViewHooks (storeHooks: ArticleItemStoreHooks): ArticleItemViewHooks {
  function useResource (): ArticleItemViewResource {
    const translator = app.hooks.Localization.useTranslator(LocalizationTarget.ArticleItemView);

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
