import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type TopicTreeStoreSliceName } from '../../Slice';
import { type TopicTreeStoreLoadCompletedActionResult } from './TopicTreeStoreLoadCompletedActionResult';

export interface TopicTreeStoreLoadCompletedActionPayload
  extends StoreActionPayload<TopicTreeStoreSliceName> {
  actionResult: TopicTreeStoreLoadCompletedActionResult;
}

interface Options extends Omit<TopicTreeStoreLoadCompletedActionPayload, 'actionResult'> {
  readonly actionResult?: TopicTreeStoreLoadCompletedActionResult;
}

export function createTopicTreeStoreLoadCompletedActionPayload (
  options: Options
): TopicTreeStoreLoadCompletedActionPayload {
  const { actionResult } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
