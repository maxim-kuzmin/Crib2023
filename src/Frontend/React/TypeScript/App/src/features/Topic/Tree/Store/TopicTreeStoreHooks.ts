import {
  type TopicTreeStoreClearActionOutput,
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreSetActionOutput
} from './Actions';
import { type TopicTreeStoreSliceName } from './Slice';
import { type TopicTreeStoreResource } from './TopicTreeStoreResource';
import { type TopicTreeStoreState } from './TopicTreeStoreState';

export interface TopicTreeStoreHooks {
  readonly useResource: () => TopicTreeStoreResource;

  readonly useStoreClearActionOutput: (
    sliceName: TopicTreeStoreSliceName
  ) => TopicTreeStoreClearActionOutput;

  readonly useStoreLoadActionOutput: (
    sliceName: TopicTreeStoreSliceName,
    input: TopicTreeStoreLoadActionInput
  ) => TopicTreeStoreLoadActionOutput;

  readonly useStoreSetActionOutput: (
    sliceName: TopicTreeStoreSliceName
  ) => TopicTreeStoreSetActionOutput;

  readonly useStoreState: (sliceName: TopicTreeStoreSliceName) => TopicTreeStoreState;
}
