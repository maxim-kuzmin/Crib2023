import {
  type TopicItemStoreClearActionOptions,
  type TopicItemStoreHooks,
  type TopicItemStoreLoadActionOptions,
  type TopicItemStoreSetActionOptions,
  TopicItemStoreSliceName
} from '../../../app/Stores';
import { type TopicItemViewHooks } from '../..';

type ClearActionOptions = TopicItemStoreClearActionOptions;
type LoadActionOptions = TopicItemStoreLoadActionOptions;
type SetActionOptions = TopicItemStoreSetActionOptions;

export function createTopicItemViewHooks (
  hooks: TopicItemStoreHooks
): TopicItemViewHooks {
  const sliceName = TopicItemStoreSliceName.TopicItemView;

  return {
    useDispatchToClear: (options: ClearActionOptions) => hooks.useDispatchToClear(sliceName, options),
    useDispatchToLoad: (options: LoadActionOptions) => hooks.useDispatchToLoad(sliceName, options),
    useDispatchToSet: (options: SetActionOptions) => hooks.useDispatchToSet(sliceName, options),
    useState: () => hooks.useState(sliceName)
  };
}
