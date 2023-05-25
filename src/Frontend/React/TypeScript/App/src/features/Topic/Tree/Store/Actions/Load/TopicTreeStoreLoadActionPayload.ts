import { type ApiResponseResource } from '../../../../../../data';
import { type TopicDomainTreeGetOperationRequestHandler } from '../../../../../../domains';
import { type TopicTreeStoreResource } from '../../TopicTreeStoreResource';
import { type TopicTreeStoreLoadActionResult } from './TopicTreeStoreLoadActionResult';

export interface TopicTreeStoreLoadActionPayload {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: TopicTreeStoreLoadActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicTreeStore: TopicTreeStoreResource;
  readonly requestHandler: TopicDomainTreeGetOperationRequestHandler;
}

export function createTopicTreeStoreLoadActionPayload (
  options?: Partial<TopicTreeStoreLoadActionPayload>
): TopicTreeStoreLoadActionPayload {
  if (!options?.resourceOfApiResponse) {
    throw new Error('resourceOfApiResponse is undefined');
  }

  if (!options?.resourceOfTopicTreeStore) {
    throw new Error('resourceOfTopicTreeStore is undefined');
  }

  if (!options?.requestHandler) {
    throw new Error('requestHandler is undefined');
  }

  return {
    abortSignal: options?.abortSignal,
    actionResult: options?.actionResult ?? null,
    resourceOfApiResponse: options?.resourceOfApiResponse,
    resourceOfTopicTreeStore: options?.resourceOfTopicTreeStore,
    requestHandler: options?.requestHandler,
  };
}
