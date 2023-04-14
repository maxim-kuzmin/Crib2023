import {
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreClearActionOptions,
  type TopicTreeStoreLoadActionDispatch,
  type TopicTreeStoreLoadActionOptions,
  type TopicTreeStoreSetActionDispatch,
  type TopicTreeStoreSetActionOptions
} from './Actions';
import { type TopicTreeStoreState } from './TopicTreeStoreState';

type ClearActionDispatch = TopicTreeStoreClearActionDispatch;
type ClearActionOptions = TopicTreeStoreClearActionOptions;

type LoadActionDispatch = TopicTreeStoreLoadActionDispatch;
type LoadActionOptions = TopicTreeStoreLoadActionOptions;

type SetActionDispatch = TopicTreeStoreSetActionDispatch;
type SetActionOptions = TopicTreeStoreSetActionOptions;

type State = TopicTreeStoreState;

export interface TopicTreeStoreHooks {
  readonly useDispatchToClear: (sliceName: string, options: ClearActionOptions) => ClearActionDispatch;
  readonly useDispatchToLoad: (sliceName: string, options: LoadActionOptions) => LoadActionDispatch;
  readonly useDispatchToSet: (sliceName: string, options: SetActionOptions) => SetActionDispatch;
  readonly useState: (sliceName: string) => State;
}
