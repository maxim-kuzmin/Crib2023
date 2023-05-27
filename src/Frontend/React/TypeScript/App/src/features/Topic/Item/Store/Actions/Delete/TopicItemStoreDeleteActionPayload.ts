import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type TopicItemStoreSliceName } from '../../Slice';
import { type TopicItemStoreDeleteActionResult } from './TopicItemStoreDeleteActionResult';

export interface TopicItemStoreDeleteActionPayload
  extends StoreActionPayload<TopicItemStoreSliceName> {
  readonly actionResult: TopicItemStoreDeleteActionResult;
}

interface Options extends Omit<TopicItemStoreDeleteActionPayload, 'actionResult'> {
  readonly actionResult?: TopicItemStoreDeleteActionResult;
}

export function createTopicItemStoreDeleteActionPayload (
  options: Options
): TopicItemStoreDeleteActionPayload {
  const {
    actionResult,
  } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
