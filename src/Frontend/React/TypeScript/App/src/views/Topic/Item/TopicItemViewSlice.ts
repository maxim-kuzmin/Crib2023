import {
  type TopicItemStoreClearActionOptions,
  type TopicItemViewHooks,
  type TopicItemStoreSetActionOptions,
  type TopicItemStoreLoadActionOptions,
  type TopicItemStoreHooks
} from '../../../all';
import { TopicItemStoreSliceName } from '../../../app/Stores';

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
