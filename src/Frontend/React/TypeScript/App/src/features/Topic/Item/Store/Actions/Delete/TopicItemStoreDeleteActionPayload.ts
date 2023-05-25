import { type ApiResponseResource } from '../../../../../../data';
import { type TopicDomainItemDeleteOperationRequestHandler } from '../../../../../../domains';
import { type TopicItemStoreResource } from '../../TopicItemStoreResource';
import { type TopicItemStoreDeleteActionResult } from './TopicItemStoreDeleteActionResult';

export interface TopicItemStoreDeleteActionPayload {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: TopicItemStoreDeleteActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicItemStore: TopicItemStoreResource;
  readonly requestHandler: TopicDomainItemDeleteOperationRequestHandler;
}

export function createTopicItemStoreDeleteActionPayload (
  options?: Partial<TopicItemStoreDeleteActionPayload>
): TopicItemStoreDeleteActionPayload {
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
