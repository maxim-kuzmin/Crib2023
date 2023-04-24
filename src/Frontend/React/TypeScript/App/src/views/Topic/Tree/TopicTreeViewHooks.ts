import {
  type TopicTreeStoreClearActionInput,
  type TopicTreeStoreClearActionOutput,
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreSetActionInput,
  type TopicTreeStoreSetActionOutput,
  type TopicTreeStoreState,
} from '../../../app';

export interface TopicTreeViewHooks {
  readonly useStoreClearActionOutput: (
    input: TopicTreeStoreClearActionInput
  ) => TopicTreeStoreClearActionOutput;

  readonly useStoreLoadActionOutput: (
    input: TopicTreeStoreLoadActionInput
  ) => TopicTreeStoreLoadActionOutput;

  readonly useStoreSetActionOutput: (
    input: TopicTreeStoreSetActionInput
  ) => TopicTreeStoreSetActionOutput;

  readonly useStoreState: () => TopicTreeStoreState;
}
