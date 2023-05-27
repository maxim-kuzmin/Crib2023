import { type ApiResponseResource } from '../../../../../../data';
import { type TopicDomainItemGetOperationRequestHandler } from '../../../../../../domains';
import { type TopicItemStoreResource } from '../../TopicItemStoreResource';

export interface TopicItemStoreLoadActionData {
  readonly abortSignal?: AbortSignal;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicItemStore: TopicItemStoreResource;
  readonly requestHandler: TopicDomainItemGetOperationRequestHandler;
}

export function createTopicItemStoreLoadActionData (
  options: TopicItemStoreLoadActionData
): TopicItemStoreLoadActionData {
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
