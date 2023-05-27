import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type TopicTreeStoreSliceName } from '../../Slice';
import { type TopicTreeStoreLoadActionResult } from './TopicTreeStoreLoadActionResult';

export interface TopicTreeStoreLoadActionPayload
  extends StoreActionPayload<TopicTreeStoreSliceName> {
  readonly actionResult: TopicTreeStoreLoadActionResult;
}

interface Options extends Omit<TopicTreeStoreLoadActionPayload, 'actionResult'> {
  readonly actionResult?: TopicTreeStoreLoadActionResult;
}

export function createTopicTreeStoreLoadActionPayload (
  options: Options
): TopicTreeStoreLoadActionPayload {
  const {
    actionResult,
  } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
