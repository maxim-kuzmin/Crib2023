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
} from '../../../app';
import { type TopicItemViewHooks } from './TopicItemViewHooks';

export function createTopicItemViewHooks (storeHooks: TopicItemStoreHooks): TopicItemViewHooks {
  const sliceName = TopicItemStoreSliceName.TopicItemView;

  function useStoreClearActionOutput (input: TopicItemStoreClearActionInput): TopicItemStoreClearActionOutput {
    return storeHooks.useStoreClearActionOutput(sliceName, input);
  }

  function useStoreDeleteActionOutput (input?: TopicItemStoreDeleteActionInput): TopicItemStoreDeleteActionOutput {
    return storeHooks.useStoreDeleteActionOutput(sliceName, input);
  }

  function useStoreLoadActionOutput (input: TopicItemStoreLoadActionInput): TopicItemStoreLoadActionOutput {
    return storeHooks.useStoreLoadActionOutput(sliceName, input);
  }

  function useStoreSaveActionOutput (input?: TopicItemStoreSaveActionInput): TopicItemStoreSaveActionOutput {
    return storeHooks.useStoreSaveActionOutput(sliceName, input);
  }

  function useStoreSetActionOutput (input: TopicItemStoreSetActionInput): TopicItemStoreSetActionOutput {
    return storeHooks.useStoreSetActionOutput(sliceName, input);
  }

  function useStoreState (): TopicItemStoreState {
    return storeHooks.useStoreState(sliceName);
  }

  return {
    useStoreClearActionOutput,
    useStoreDeleteActionOutput,
    useStoreLoadActionOutput,
    useStoreSaveActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
