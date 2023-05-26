import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type TopicItemStoreSliceName } from '../../Slice';
import { type TopicItemStoreLoadCompletedActionResult } from './TopicItemStoreLoadCompletedActionResult';

export interface TopicItemStoreLoadCompletedActionPayload
  extends StoreActionPayload<TopicItemStoreSliceName> {
  actionResult: TopicItemStoreLoadCompletedActionResult;
}

interface Options extends Omit<TopicItemStoreLoadCompletedActionPayload, 'actionResult'> {
  readonly actionResult?: TopicItemStoreLoadCompletedActionResult;
}

export function createTopicItemStoreLoadCompletedActionPayload (
  options: Options
): TopicItemStoreLoadCompletedActionPayload {
  const { actionResult } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
