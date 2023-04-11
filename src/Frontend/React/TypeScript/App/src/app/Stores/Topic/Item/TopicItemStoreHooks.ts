import {
  type TopicItemStoreClearActionOptions,
  type TopicItemStoreClearActionDispatch,
  type TopicItemStoreState,
  type TopicItemStoreLoadActionDispatch,
  type TopicItemStoreLoadActionOptions,
  type TopicItemStoreSetActionOptions,
  type TopicItemStoreSetActionDispatch
} from '../../../../all';

type ClearActionDispatch = TopicItemStoreClearActionDispatch;
type ClearActionOptions = TopicItemStoreClearActionOptions;

type LoadActionDispatch = TopicItemStoreLoadActionDispatch;
type LoadActionOptions = TopicItemStoreLoadActionOptions;

type SetActionDispatch = TopicItemStoreSetActionDispatch;
type SetActionOptions = TopicItemStoreSetActionOptions;

export interface TopicItemStoreHooks {
  readonly useDispatchToClear: (options?: ClearActionOptions) => ClearActionDispatch;
  readonly useDispatchToLoad: (options?: LoadActionOptions) => LoadActionDispatch;
  readonly useDispatchToSet: (options?: SetActionOptions) => SetActionDispatch;
  readonly useState: () => TopicItemStoreState;
}
