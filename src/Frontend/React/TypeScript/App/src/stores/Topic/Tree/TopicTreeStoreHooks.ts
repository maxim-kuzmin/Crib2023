import { useMemo } from 'react';
import appInstance from '../../../app/AppInstance';
import {
  type TopicTreeStoreHooks,
  type TopicTreeStoreResource,
  LocalizationTarget
} from '../../../app';
import { useStoreClearActionDispatch } from './Hooks/Actions/Clear/TopicTreeStoreClearActionDispatchHook';
import { useStoreClearActionOutput } from './Hooks/Actions/Clear/TopicTreeStoreClearActionOutputHook';
import { useStoreLoadActionDispatch } from './Hooks/Actions/Load/TopicTreeStoreLoadActionDispatchHook';
import { useStoreLoadActionOutput } from './Hooks/Actions/Load/TopicTreeStoreLoadActionOutputHook';
import {
  useStoreLoadCompletedActionDispatch
} from './Hooks/Actions/LoadCompleted/TopicTreeStoreLoadCompletedActionDispatchHook';
import { useStoreSetActionDispatch } from './Hooks/Actions/Set/TopicTreeStoreSetActionDispatchHook';
import { useStoreSetActionOutput } from './Hooks/Actions/Set/TopicTreeStoreSetActionOutputHook';
import { useStoreState } from './Hooks/TopicTreeStoreStateHook';

export function createTopicTreeStoreHooks (): TopicTreeStoreHooks {
  function useResource (): TopicTreeStoreResource {
    const translator = appInstance.hooks.Localization.useTranslator(LocalizationTarget.TopicTreeStore);

    const tOperationNameForGet = translator.translate('@@OperationNameForGet');
    const tOperationNameForGetChildren = translator.translate('@@OperationNameForGetChildren');

    const { language } = translator;

    return useMemo(
      () => {
        const result: TopicTreeStoreResource = {
          getOperationNameForGet: () => tOperationNameForGet,
          getOperationNameForGetChildren: () => tOperationNameForGetChildren,
          language
        };

        return result;
      },
      [
        tOperationNameForGet,
        tOperationNameForGetChildren,
        language
      ]
    );
  }

  return {
    useResource,
    useStoreClearActionDispatch,
    useStoreClearActionOutput,
    useStoreLoadActionDispatch,
    useStoreLoadActionOutput,
    useStoreLoadCompletedActionDispatch,
    useStoreSetActionDispatch,
    useStoreSetActionOutput,
    useStoreState
  };
}
