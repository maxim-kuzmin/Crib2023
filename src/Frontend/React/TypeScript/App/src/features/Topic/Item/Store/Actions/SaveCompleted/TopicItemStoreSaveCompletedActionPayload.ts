import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type TopicItemStoreSliceName } from '../../Slice';
import { type TopicItemStoreSaveCompletedActionResult } from './TopicItemStoreSaveCompletedActionResult';

export interface TopicItemStoreSaveCompletedActionPayload
  extends StoreActionPayload<TopicItemStoreSliceName> {
  actionResult: TopicItemStoreSaveCompletedActionResult;
}

interface Options extends Omit<TopicItemStoreSaveCompletedActionPayload, 'actionResult'> {
  readonly actionResult?: TopicItemStoreSaveCompletedActionResult;
}

export function createTopicItemStoreSaveCompletedActionPayload (
  options: Options
): TopicItemStoreSaveCompletedActionPayload {
  const { actionResult } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
