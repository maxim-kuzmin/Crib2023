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

type StoreState = TopicTreeStoreState;

export interface TopicTreeStoreHooks {
  readonly useClearActionDispatch: (sliceName: string, options: ClearActionOptions) => ClearActionDispatch;
  readonly useLoadActionDispatch: (sliceName: string, options: LoadActionOptions) => LoadActionDispatch;
  readonly useSetActionDispatch: (sliceName: string, options: SetActionOptions) => SetActionDispatch;
  readonly useStoreState: (sliceName: string) => StoreState;
}
