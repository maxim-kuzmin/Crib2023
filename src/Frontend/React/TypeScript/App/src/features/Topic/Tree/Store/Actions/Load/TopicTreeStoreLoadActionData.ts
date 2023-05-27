import { type ApiResponseResource } from '../../../../../../data';
import { type TopicDomainTreeGetOperationRequestHandler } from '../../../../../../domains';
import { type TopicTreeStoreResource } from '../../TopicTreeStoreResource';

export interface TopicTreeStoreLoadActionData {
  readonly abortSignal?: AbortSignal;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicTreeStore: TopicTreeStoreResource;
  readonly requestHandler: TopicDomainTreeGetOperationRequestHandler;
}

export function createTopicTreeStoreLoadActionData (
  options: TopicTreeStoreLoadActionData
): TopicTreeStoreLoadActionData {
  const {
    abortSignal,
    resourceOfApiResponse,
    resourceOfTopicTreeStore,
    requestHandler,
    } = options;

  return {
    abortSignal,
    resourceOfApiResponse,
    resourceOfTopicTreeStore,
    requestHandler,
  }
}
