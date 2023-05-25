import { type ApiResponseResource } from '../../../../../../data';
import { type TopicDomainItemGetOperationRequestHandler } from '../../../../../../domains';
import { type TopicItemStoreResource } from '../../TopicItemStoreResource';
import { type TopicItemStoreLoadActionResult } from './TopicItemStoreLoadActionResult';

export interface TopicItemStoreLoadActionPayload {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: TopicItemStoreLoadActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicItemStore: TopicItemStoreResource;
  readonly requestHandler: TopicDomainItemGetOperationRequestHandler;
}

export function createTopicItemStoreLoadActionPayload (
  options?: Partial<TopicItemStoreLoadActionPayload>
): TopicItemStoreLoadActionPayload {
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
