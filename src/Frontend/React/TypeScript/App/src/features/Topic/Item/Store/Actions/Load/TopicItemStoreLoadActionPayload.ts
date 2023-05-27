import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type TopicItemStoreSliceName } from '../../Slice';
import { type TopicItemStoreLoadActionResult } from './TopicItemStoreLoadActionResult';

export interface TopicItemStoreLoadActionPayload
  extends StoreActionPayload<TopicItemStoreSliceName> {
  readonly actionResult: TopicItemStoreLoadActionResult;
}

interface Options extends Omit<TopicItemStoreLoadActionPayload, 'actionResult'> {
  readonly actionResult?: TopicItemStoreLoadActionResult;
}

export function createTopicItemStoreLoadActionPayload (
  options: Options
): TopicItemStoreLoadActionPayload {
  const {
    actionResult,
  } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
