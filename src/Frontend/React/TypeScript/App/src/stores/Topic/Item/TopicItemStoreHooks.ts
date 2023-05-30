import { type Dispatch, useContext, useMemo } from 'react';
import { useAppInstance } from '../../../app';
import {
  type TopicItemStoreHooks,
  type TopicItemStoreResource,
  type TopicItemStoreState,
} from '../../../features';
import { useStoreClearActionOutput } from './Hooks/Actions/Clear/TopicItemStoreClearActionOutputHook';
import { useStoreDeleteActionOutput } from './Hooks/Actions/Delete/TopicItemStoreDeleteActionOutputHook';
import { useStoreLoadActionOutput } from './Hooks/Actions/Load/TopicItemStoreLoadActionOutputHook';
import { useStoreSaveActionOutput } from './Hooks/Actions/Save/TopicItemStoreSaveActionOutputHook';
import { useStoreSetActionOutput } from './Hooks/Actions/Set/TopicItemStoreSetActionOutputHook';
import { useStoreState } from './Hooks/TopicItemStoreStateHook';
import {
  TopicItemStoreDispatchContext,
  TopicItemStoreStateContext,
  type TopicItemStoreActionUnion,
} from '.';

interface Options {
  readonly pathOfTopicItemStoreResource: string;
}

export function createTopicItemStoreHooks ({
  pathOfTopicItemStoreResource,
}: Options): TopicItemStoreHooks {
  function useResource (): TopicItemStoreResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.App.Localization.useTranslator(pathOfTopicItemStoreResource);

    const tOperationNameForDelete = translator.translate('@@OperationNameForDelete');
    const tOperationNameForGet = translator.translate('@@OperationNameForGet');
    const tOperationNameForSave = translator.translate('@@OperationNameForSave');

    const { language } = translator;

    return useMemo<TopicItemStoreResource>(
      () => ({
        getOperationNameForDelete: () => tOperationNameForDelete,
        getOperationNameForGet: () => tOperationNameForGet,
        getOperationNameForSave: () => tOperationNameForSave,
        language
      }),
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
    useStoreClearActionOutput,
    useStoreDeleteActionOutput,
    useStoreLoadActionOutput,
    useStoreSaveActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}

export function useTopicItemStoreDispatch (): Dispatch<TopicItemStoreActionUnion> {
  return useContext(TopicItemStoreDispatchContext)!;
}

export function useTopicItemStoreState (
  sliceName: string
): TopicItemStoreState {
  return useContext(TopicItemStoreStateContext)![sliceName];
}
