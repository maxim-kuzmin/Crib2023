import {
  type TopicItemStoreClearActionDispatch,
  type TopicItemStoreClearActionOptions,
  type TopicItemStoreLoadActionDispatch,
  type TopicItemStoreLoadActionOptions,
  type TopicItemStoreSetActionDispatch,
  type TopicItemStoreSetActionOptions
} from './Actions';
import { type TopicItemStoreState } from './TopicItemStoreState';

type ClearActionDispatch = TopicItemStoreClearActionDispatch;
type ClearActionOptions = TopicItemStoreClearActionOptions;

type LoadActionDispatch = TopicItemStoreLoadActionDispatch;
type LoadActionOptions = TopicItemStoreLoadActionOptions;

type SetActionDispatch = TopicItemStoreSetActionDispatch;
type SetActionOptions = TopicItemStoreSetActionOptions;

type StoreState = TopicItemStoreState;

export interface TopicItemStoreHooks {
  readonly useClearActionDispatch: (sliceName: string, options: ClearActionOptions) => ClearActionDispatch;
  readonly useLoadActionDispatch: (sliceName: string, options: LoadActionOptions) => LoadActionDispatch;
  readonly useSetActionDispatch: (sliceName: string, options: SetActionOptions) => SetActionDispatch;
  readonly useStoreState: (sliceName: string) => StoreState;
}
