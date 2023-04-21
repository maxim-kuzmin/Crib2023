import {
  type TopicItemStoreClearActionInput,
  type TopicItemStoreClearActionOutput,
  type TopicItemStoreDeleteActionInput,
  type TopicItemStoreDeleteActionOutput,
  type TopicItemStoreLoadActionInput,
  type TopicItemStoreLoadActionOutput,
  type TopicItemStoreSaveActionInput,
  type TopicItemStoreSaveActionOutput,
  type TopicItemStoreSetActionInput,
  type TopicItemStoreSetActionOutput,
  type TopicItemStoreHooks,
  TopicItemStoreSliceName,
  type TopicItemStoreState,
} from '../../../app/Stores';
import { type TopicItemViewHooks } from './TopicItemViewHooks';

export function createTopicItemViewHooks (hooks: TopicItemStoreHooks): TopicItemViewHooks {
  const sliceName = TopicItemStoreSliceName.TopicItemView;

  function useClearActionOutput (input: TopicItemStoreClearActionInput): TopicItemStoreClearActionOutput {
    return hooks.useClearActionOutput(sliceName, input);
  }

  function useDeleteActionOutput (input?: TopicItemStoreDeleteActionInput): TopicItemStoreDeleteActionOutput {
    return hooks.useDeleteActionOutput(sliceName, input);
  }

  function useLoadActionOutput (input: TopicItemStoreLoadActionInput): TopicItemStoreLoadActionOutput {
    return hooks.useLoadActionOutput(sliceName, input);
  }

  function useSaveActionOutput (input?: TopicItemStoreSaveActionInput): TopicItemStoreSaveActionOutput {
    return hooks.useSaveActionOutput(sliceName, input);
  }

  function useSetActionOutput (input: TopicItemStoreSetActionInput): TopicItemStoreSetActionOutput {
    return hooks.useSetActionOutput(sliceName, input);
  }

  function useStoreState (): TopicItemStoreState {
    return hooks.useStoreState(sliceName);
  }

  return {
    useClearActionOutput,
    useDeleteActionOutput,
    useLoadActionOutput,
    useSaveActionOutput,
    useSetActionOutput,
    useStoreState
  };
}
