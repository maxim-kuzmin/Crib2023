import { type Dispatch, useContext, useMemo } from 'react';
import { useAppInstance } from '../../../app';
import {
  type TopicTreeStoreHooks,
  type TopicTreeStoreResource,
  type TopicTreeStoreState,
} from '../../../features';
import { useStoreClearActionOutput } from './Hooks/Actions/Clear/TopicTreeStoreClearActionOutputHook';
import { useStoreLoadActionOutput } from './Hooks/Actions/Load/TopicTreeStoreLoadActionOutputHook';
import { useStoreSetActionOutput } from './Hooks/Actions/Set/TopicTreeStoreSetActionOutputHook';
import { useStoreState } from './Hooks/TopicTreeStoreStateHook';
import {
  TopicTreeStoreDispatchContext,
  TopicTreeStoreStateContext,
  type TopicTreeStoreActionUnion,
} from '.';

interface Options {
  readonly pathOfTopicTreeStoreResource: string;
}

export function createTopicTreeStoreHooks ({
  pathOfTopicTreeStoreResource,
}: Options): TopicTreeStoreHooks {
  function useResource (): TopicTreeStoreResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.App.Localization.useTranslator(pathOfTopicTreeStoreResource);

    const tOperationNameForGet = translator.translate('@@OperationNameForGet');
    const tOperationNameForGetChildren = translator.translate('@@OperationNameForGetChildren');

    const { language } = translator;

    return useMemo<TopicTreeStoreResource>(
      () => ({
        getOperationNameForGet: () => tOperationNameForGet,
        getOperationNameForGetChildren: () => tOperationNameForGetChildren,
        language
      }),
      [
        tOperationNameForGet,
        tOperationNameForGetChildren,
        language
      ]
    );
  }

  return {
    useResource,
    useStoreClearActionOutput,
    useStoreLoadActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}

export function useTopicTreeStoreDispatch (): Dispatch<TopicTreeStoreActionUnion> {
  return useContext(TopicTreeStoreDispatchContext)!;
}

export function useTopicTreeStoreState (
  sliceName: string
): TopicTreeStoreState {
  return useContext(TopicTreeStoreStateContext)![sliceName];
}
