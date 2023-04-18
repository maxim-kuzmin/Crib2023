import {
  type TopicItemStoreClearActionDispatch,
  type TopicItemStoreClearActionOptions,
  type TopicItemStoreLoadActionDispatch,
  type TopicItemStoreLoadActionInput,
  type TopicItemStoreLoadActionOptions,
  type TopicItemStoreLoadActionOutput,
  type TopicItemStoreSetActionDispatch,
  type TopicItemStoreSetActionOptions,
  type TopicItemStoreState,
} from '../../../app/Stores';

type ClearActionDispatch = TopicItemStoreClearActionDispatch;
type ClearActionOptions = TopicItemStoreClearActionOptions;

type LoadActionDispatch = TopicItemStoreLoadActionDispatch;
type LoadActionInput = TopicItemStoreLoadActionInput;
type LoadActionOptions = TopicItemStoreLoadActionOptions;
type LoadActionOutput = TopicItemStoreLoadActionOutput;

type SetActionDispatch = TopicItemStoreSetActionDispatch;
type SetActionOptions = TopicItemStoreSetActionOptions;

type StoreState = TopicItemStoreState;

export interface TopicItemViewHooks {
  readonly useClearActionDispatch: (options: ClearActionOptions) => ClearActionDispatch;
  readonly useLoadActionDispatch: (options: LoadActionOptions) => LoadActionDispatch;
  readonly useLoadActionOutput: (input: LoadActionInput) => LoadActionOutput;
  readonly useSetActionDispatch: (options: SetActionOptions) => SetActionDispatch;
  readonly useStoreState: () => StoreState;
}
