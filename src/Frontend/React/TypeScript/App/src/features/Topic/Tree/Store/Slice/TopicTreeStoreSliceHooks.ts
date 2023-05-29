import {
  type TopicTreeStoreClearActionOutput,
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreSetActionOutput
} from '../Actions';
import { type TopicTreeStoreState } from '../TopicTreeStoreState';

export interface TopicTreeStoreSliceHooks {
  readonly useStoreClearActionOutput: () => TopicTreeStoreClearActionOutput;

  readonly useStoreLoadActionOutput: (
    input: TopicTreeStoreLoadActionInput
  ) => TopicTreeStoreLoadActionOutput;

  readonly useStoreSetActionOutput: () => TopicTreeStoreSetActionOutput;

  readonly useStoreState: () => TopicTreeStoreState;
}
