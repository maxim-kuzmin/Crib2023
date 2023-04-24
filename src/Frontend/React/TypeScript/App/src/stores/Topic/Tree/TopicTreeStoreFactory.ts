import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type TopicTreeStoreHooks,
  type TopicTreeStoreResource,
  LocalizationNamespace
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
    const { t } = useTranslation(LocalizationNamespace.TopicTreeStore);

    const tGetOperationName = t('@@GetOperationName');

    return useMemo(
      () => {
        const result: TopicTreeStoreResource = {
          getGetOperationName: () => tGetOperationName,
        };

        return result;
      },
      [
        tGetOperationName,
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
