import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import { type TopicDomainItemSaveOperationRequestHandler } from '../../../../../../domains';
import { type TopicItemStoreSliceName } from '../../Slice';
import { type TopicItemStoreResource } from '../../TopicItemStoreResource';
import { type TopicItemStoreSaveActionResult } from './TopicItemStoreSaveActionResult';

export interface TopicItemStoreSaveActionPayload
  extends StoreActionPayload<TopicItemStoreSliceName> {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: TopicItemStoreSaveActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicItemStore: TopicItemStoreResource;
  readonly requestHandler: TopicDomainItemSaveOperationRequestHandler;
}

interface Options extends Omit<TopicItemStoreSaveActionPayload, 'actionResult'> {
  readonly actionResult?: TopicItemStoreSaveActionResult;
}

export function createTopicItemStoreSaveActionPayload (
  options: Options
): TopicItemStoreSaveActionPayload {
  const {
    abortSignal,
    actionResult,
    resourceOfApiResponse,
    resourceOfTopicItemStore,
    requestHandler,
  } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    abortSignal,
    actionResult: actionResult ?? null,
    resourceOfApiResponse,
    resourceOfTopicItemStore,
    requestHandler,
  };
}
