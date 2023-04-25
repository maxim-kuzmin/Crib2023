import { useMemo } from 'react';
import {
  getModule,
  type TopicItemStoreHooks,
  type TopicItemStoreResource,
  LocalizationTarget,
} from '../../../app';
import { useStoreClearActionDispatch } from './Hooks/Actions/Clear/TopicItemStoreClearActionDispatchHook';
import { useStoreClearActionOutput } from './Hooks/Actions/Clear/TopicItemStoreClearActionOutputHook';
import { useStoreDeleteActionDispatch } from './Hooks/Actions/Delete/TopicItemStoreDeleteActionDispatchHook';
import { useStoreDeleteActionOutput } from './Hooks/Actions/Delete/TopicItemStoreDeleteActionOutputHook';
import {
  useStoreDeleteCompletedActionDispatch
} from './Hooks/Actions/DeleteCompleted/TopicItemStoreDeleteCompletedActionDispatchHook';
import { useStoreLoadActionDispatch } from './Hooks/Actions/Load/TopicItemStoreLoadActionDispatchHook';
import { useStoreLoadActionOutput } from './Hooks/Actions/Load/TopicItemStoreLoadActionOutputHook';
import {
  useStoreLoadCompletedActionDispatch
} from './Hooks/Actions/LoadCompleted/TopicItemStoreLoadCompletedActionDispatchHook';
import { useStoreSaveActionDispatch } from './Hooks/Actions/Save/TopicItemStoreSaveActionDispatchHook';
import { useStoreSaveActionOutput } from './Hooks/Actions/Save/TopicItemStoreSaveActionOutputHook';
import {
  useStoreSaveCompletedActionDispatch
} from './Hooks/Actions/SaveCompleted/TopicItemStoreSaveCompletedActionDispatchHook';
import { useStoreSetActionDispatch } from './Hooks/Actions/Set/TopicItemStoreSetActionDispatchHook';
import { useStoreSetActionOutput } from './Hooks/Actions/Set/TopicItemStoreSetActionOutputHook';
import { useStoreState } from './Hooks/TopicItemStoreStateHook';

export function createTopicItemStoreHooks (): TopicItemStoreHooks {
  function useResource (): TopicItemStoreResource {
    const hooksOfLocalization = getModule().getLocalizationHooks();

    const translator = hooksOfLocalization.useTranslator(LocalizationTarget.TopicItemStore);

    const tOperationNameForDelete = translator.translate('@@OperationNameForDelete');
    const tOperationNameForGet = translator.translate('@@OperationNameForGet');
    const tOperationNameForSave = translator.translate('@@OperationNameForSave');

    const { language } = translator;

    return useMemo(
      () => {
        const result: TopicItemStoreResource = {
          getOperationNameForDelete: () => tOperationNameForDelete,
          getOperationNameForGet: () => tOperationNameForGet,
          getOperationNameForSave: () => tOperationNameForSave,
          language
        };

        return result;
      },
      [
        tOperationNameForDelete,
        tOperationNameForGet,
        tOperationNameForSave,
        language
      ]
    );
  }

  return {
    useResource,
    useStoreClearActionDispatch,
    useStoreClearActionOutput,
    useStoreDeleteActionDispatch,
    useStoreDeleteActionOutput,
    useStoreDeleteCompletedActionDispatch,
    useStoreLoadActionDispatch,
    useStoreLoadActionOutput,
    useStoreLoadCompletedActionDispatch,
    useStoreSaveActionDispatch,
    useStoreSaveActionOutput,
    useStoreSaveCompletedActionDispatch,
    useStoreSetActionDispatch,
    useStoreSetActionOutput,
    useStoreState
  };
}
