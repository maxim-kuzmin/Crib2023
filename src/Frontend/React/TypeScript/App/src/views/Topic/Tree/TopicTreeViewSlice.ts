import {
  type TopicTreeStoreClearActionOptions,
  type TopicTreeStoreHooks,
  type TopicTreeStoreLoadActionOptions,
  type TopicTreeStoreSetActionOptions,
  TopicTreeStoreSliceName
} from '../../../app/Stores';
import { type TopicTreeViewHooks } from '../..';

type ClearActionOptions = TopicTreeStoreClearActionOptions;
type LoadActionOptions = TopicTreeStoreLoadActionOptions;
type SetActionOptions = TopicTreeStoreSetActionOptions;

export function createTopicTreeViewHooks (
  hooks: TopicTreeStoreHooks
): TopicTreeViewHooks {
  const sliceName = TopicTreeStoreSliceName.TopicTreeView;

  return {
    useDispatchToClear: (options: ClearActionOptions) => hooks.useDispatchToClear(sliceName, options),
    useDispatchToLoad: (options: LoadActionOptions) => hooks.useDispatchToLoad(sliceName, options),
    useDispatchToSet: (options: SetActionOptions) => hooks.useDispatchToSet(sliceName, options),
    useState: () => hooks.useState(sliceName)
  };
}