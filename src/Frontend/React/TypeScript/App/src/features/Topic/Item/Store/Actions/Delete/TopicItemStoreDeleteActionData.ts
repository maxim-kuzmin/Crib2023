import { type ApiResponseResource } from '../../../../../../data';
import { type TopicDomainItemDeleteOperationRequestHandler } from '../../../../../../domains';
import { type TopicItemStoreResource } from '../../TopicItemStoreResource';

export interface TopicItemStoreDeleteActionData {
  readonly abortSignal?: AbortSignal;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicItemStore: TopicItemStoreResource;
  readonly requestHandler: TopicDomainItemDeleteOperationRequestHandler;
}

export function createTopicItemStoreDeleteActionData (
  options: TopicItemStoreDeleteActionData
): TopicItemStoreDeleteActionData {
  const {
    abortSignal,
    resourceOfApiResponse,
    resourceOfTopicItemStore,
    requestHandler,
    } = options;

  return {
    abortSignal,
    resourceOfApiResponse,
    resourceOfTopicItemStore,
    requestHandler,
  }
}
