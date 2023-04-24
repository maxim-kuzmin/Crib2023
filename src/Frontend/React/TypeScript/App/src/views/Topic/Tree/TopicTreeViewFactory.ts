import {
  type TopicTreeStoreClearActionInput,
  type TopicTreeStoreClearActionOutput,
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreSetActionInput,
  type TopicTreeStoreSetActionOutput,
  type TopicTreeStoreHooks,
  TopicTreeStoreSliceName,
  type TopicTreeStoreState,
} from '../../../app/Stores';
import { type TopicTreeViewHooks } from './TopicTreeViewHooks';

export function createTopicTreeViewHooks (storeHooks: TopicTreeStoreHooks): TopicTreeViewHooks {
  const sliceName = TopicTreeStoreSliceName.TopicTreeView;

  function useStoreClearActionOutput (input: TopicTreeStoreClearActionInput): TopicTreeStoreClearActionOutput {
    return storeHooks.useStoreClearActionOutput(sliceName, input);
  }

  function useStoreLoadActionOutput (input: TopicTreeStoreLoadActionInput): TopicTreeStoreLoadActionOutput {
    return storeHooks.useStoreLoadActionOutput(sliceName, input);
  }

  function useStoreSetActionOutput (input: TopicTreeStoreSetActionInput): TopicTreeStoreSetActionOutput {
    return storeHooks.useStoreSetActionOutput(sliceName, input);
  }

  function useStoreState (): TopicTreeStoreState {
    return storeHooks.useStoreState(sliceName);
  }

  return {
    useStoreClearActionOutput,
    useStoreLoadActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
