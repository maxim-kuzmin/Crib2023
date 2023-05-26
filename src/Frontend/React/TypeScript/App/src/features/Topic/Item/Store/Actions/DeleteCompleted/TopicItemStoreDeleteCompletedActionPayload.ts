import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type TopicItemStoreSliceName } from '../../Slice';
import { type TopicItemStoreDeleteCompletedActionResult } from './TopicItemStoreDeleteCompletedActionResult';

export interface TopicItemStoreDeleteCompletedActionPayload
  extends StoreActionPayload<TopicItemStoreSliceName> {
  actionResult: TopicItemStoreDeleteCompletedActionResult;
}

interface Options extends Omit<TopicItemStoreDeleteCompletedActionPayload, 'actionResult'> {
  readonly actionResult?: TopicItemStoreDeleteCompletedActionResult;
}

export function createTopicItemStoreDeleteCompletedActionPayload (
  options: Options
): TopicItemStoreDeleteCompletedActionPayload {
  const { actionResult } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
