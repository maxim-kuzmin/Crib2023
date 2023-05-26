import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type TopicTreeStoreSliceName } from '../../Slice';
import { type TopicTreeStoreSetActionResult } from './TopicTreeStoreSetActionResult';

export interface TopicTreeStoreSetActionPayload
  extends StoreActionPayload<TopicTreeStoreSliceName> {
  actionResult: TopicTreeStoreSetActionResult;
}

interface Options extends Omit<TopicTreeStoreSetActionPayload, 'actionResult'> {
  readonly actionResult?: TopicTreeStoreSetActionResult;
}

export function createTopicTreeStoreSetActionPayload (
  options: Options
): TopicTreeStoreSetActionPayload {
  const { actionResult } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
