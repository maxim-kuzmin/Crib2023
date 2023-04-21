import {
  type TopicTreeStoreClearActionInput,
  type TopicTreeStoreClearActionOutput,
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreSetActionInput,
  type TopicTreeStoreSetActionOutput,
  type TopicTreeStoreState,
} from '../../../app/Stores';

export interface TopicTreeViewHooks {
  readonly useClearActionOutput: (input: TopicTreeStoreClearActionInput) => TopicTreeStoreClearActionOutput;
  readonly useLoadActionOutput: (input: TopicTreeStoreLoadActionInput) => TopicTreeStoreLoadActionOutput;
  readonly useSetActionOutput: (input: TopicTreeStoreSetActionInput) => TopicTreeStoreSetActionOutput;
  readonly useStoreState: () => TopicTreeStoreState;
}
