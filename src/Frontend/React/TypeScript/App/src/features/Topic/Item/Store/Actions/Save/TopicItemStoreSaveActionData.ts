import { type ApiResponseResource } from '../../../../../../data';
import { type TopicDomainItemSaveOperationRequestHandler } from '../../../../../../domains';
import { type TopicItemStoreResource } from '../../TopicItemStoreResource';

export interface TopicItemStoreSaveActionData {
  readonly abortSignal?: AbortSignal;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicItemStore: TopicItemStoreResource;
  readonly requestHandler: TopicDomainItemSaveOperationRequestHandler;
}

export function createTopicItemStoreSaveActionData (
  options: TopicItemStoreSaveActionData
): TopicItemStoreSaveActionData {
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
