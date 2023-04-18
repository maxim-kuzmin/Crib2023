import {
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreClearActionOptions,
  type TopicTreeStoreLoadActionDispatch,
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOptions,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreSetActionDispatch,
  type TopicTreeStoreSetActionOptions,
  type TopicTreeStoreState,
} from '../../../app/Stores';

type ClearActionDispatch = TopicTreeStoreClearActionDispatch;
type ClearActionOptions = TopicTreeStoreClearActionOptions;

type LoadActionDispatch = TopicTreeStoreLoadActionDispatch;
type LoadActionInput = TopicTreeStoreLoadActionInput;
type LoadActionOptions = TopicTreeStoreLoadActionOptions;
type LoadActionOutput = TopicTreeStoreLoadActionOutput;

type SetActionDispatch = TopicTreeStoreSetActionDispatch;
type SetActionOptions = TopicTreeStoreSetActionOptions;

type StoreState = TopicTreeStoreState;

export interface TopicTreeViewHooks {
  readonly useClearActionDispatch: (options: ClearActionOptions) => ClearActionDispatch;
  readonly useLoadActionDispatch: (options: LoadActionOptions) => LoadActionDispatch;
  readonly useLoadActionOutput: (input: LoadActionInput) => LoadActionOutput;
  readonly useSetActionDispatch: (options: SetActionOptions) => SetActionDispatch;
  readonly useStoreState: () => StoreState;
}
