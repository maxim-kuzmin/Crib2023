import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type TopicItemStoreSliceName } from '../../Slice';
import { type TopicItemStoreSetActionResult } from './TopicItemStoreSetActionResult';

export interface TopicItemStoreSetActionPayload
  extends StoreActionPayload<TopicItemStoreSliceName> {
  actionResult: TopicItemStoreSetActionResult;
}

interface Options extends Omit<TopicItemStoreSetActionPayload, 'actionResult'> {
  readonly actionResult?: TopicItemStoreSetActionResult;
}

export function createTopicItemStoreSetActionPayload (
  options: Options
): TopicItemStoreSetActionPayload {
  const { actionResult } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
