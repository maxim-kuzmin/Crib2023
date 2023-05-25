import { type ApiResponseResource } from '../../../../../../data';
import { type TopicDomainItemSaveOperationRequestHandler } from '../../../../../../domains';
import { type TopicItemStoreResource } from '../../TopicItemStoreResource';
import { type TopicItemStoreSaveActionResult } from './TopicItemStoreSaveActionResult';

export interface TopicItemStoreSaveActionPayload {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: TopicItemStoreSaveActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicItemStore: TopicItemStoreResource;
  readonly requestHandler: TopicDomainItemSaveOperationRequestHandler;
}

export function createTopicItemStoreSaveActionPayload (
  options?: Partial<TopicItemStoreSaveActionPayload>
): TopicItemStoreSaveActionPayload {
  if (!options?.resourceOfApiResponse) {
    throw new Error('resourceOfApiResponse is undefined');
  }

  if (!options?.resourceOfTopicItemStore) {
    throw new Error('resourceOfTopicItemStore is undefined');
  }

  if (!options?.requestHandler) {
    throw new Error('requestHandler is undefined');
  }

  return {
    abortSignal: options?.abortSignal,
    actionResult: options?.actionResult ?? null,
    resourceOfApiResponse: options?.resourceOfApiResponse,
    resourceOfTopicItemStore: options?.resourceOfTopicItemStore,
    requestHandler: options?.requestHandler,
  };
}
