import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type TopicItemStoreSliceName } from '../../Slice';
import { type TopicItemStoreSaveActionResult } from './TopicItemStoreSaveActionResult';

export interface TopicItemStoreSaveActionPayload
  extends StoreActionPayload<TopicItemStoreSliceName> {
  readonly actionResult: TopicItemStoreSaveActionResult;
}

interface Options extends Omit<TopicItemStoreSaveActionPayload, 'actionResult'> {
  readonly actionResult?: TopicItemStoreSaveActionResult;
}

export function createTopicItemStoreSaveActionPayload (
  options: Options
): TopicItemStoreSaveActionPayload {
  const {
    actionResult,
  } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
