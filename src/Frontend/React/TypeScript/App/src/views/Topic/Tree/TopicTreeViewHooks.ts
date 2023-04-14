import {
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreState,
  type TopicTreeStoreSetActionDispatch,
  type TopicTreeStoreSetActionOptions,
  type TopicTreeStoreClearActionOptions,
  type TopicTreeStoreLoadActionDispatch,
  type TopicTreeStoreLoadActionOptions
} from '../../../all';

type ClearActionDispatch = TopicTreeStoreClearActionDispatch;
type ClearActionOptions = TopicTreeStoreClearActionOptions;

type LoadActionDispatch = TopicTreeStoreLoadActionDispatch;
type LoadActionOptions = TopicTreeStoreLoadActionOptions;

type SetActionDispatch = TopicTreeStoreSetActionDispatch;
type SetActionOptions = TopicTreeStoreSetActionOptions;

type State = TopicTreeStoreState;

export interface TopicTreeViewHooks {
  readonly useDispatchToClear: (options: ClearActionOptions) => ClearActionDispatch;
  readonly useDispatchToLoad: (options: LoadActionOptions) => LoadActionDispatch;
  readonly useDispatchToSet: (options: SetActionOptions) => SetActionDispatch;
  readonly useState: () => State;
}
