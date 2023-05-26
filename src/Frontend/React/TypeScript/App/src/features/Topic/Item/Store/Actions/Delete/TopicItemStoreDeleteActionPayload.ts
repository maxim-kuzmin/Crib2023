import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import { type TopicDomainItemDeleteOperationRequestHandler } from '../../../../../../domains';
import { type TopicItemStoreSliceName } from '../../Slice';
import { type TopicItemStoreResource } from '../../TopicItemStoreResource';
import { type TopicItemStoreDeleteActionResult } from './TopicItemStoreDeleteActionResult';

export interface TopicItemStoreDeleteActionPayload
  extends StoreActionPayload<TopicItemStoreSliceName> {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: TopicItemStoreDeleteActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicItemStore: TopicItemStoreResource;
  readonly requestHandler: TopicDomainItemDeleteOperationRequestHandler;
}

interface Options extends Omit<TopicItemStoreDeleteActionPayload, 'actionResult'> {
  readonly actionResult?: TopicItemStoreDeleteActionResult;
}

export function createTopicItemStoreDeleteActionPayload (
  options: Options
): TopicItemStoreDeleteActionPayload {
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
