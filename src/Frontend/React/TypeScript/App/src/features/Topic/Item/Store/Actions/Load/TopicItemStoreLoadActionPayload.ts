import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import { type TopicDomainItemGetOperationRequestHandler } from '../../../../../../domains';
import { type TopicItemStoreSliceName } from '../../Slice';
import { type TopicItemStoreResource } from '../../TopicItemStoreResource';
import { type TopicItemStoreLoadActionResult } from './TopicItemStoreLoadActionResult';

export interface TopicItemStoreLoadActionPayload
  extends StoreActionPayload<TopicItemStoreSliceName> {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: TopicItemStoreLoadActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicItemStore: TopicItemStoreResource;
  readonly requestHandler: TopicDomainItemGetOperationRequestHandler;
}

interface Options extends Omit<TopicItemStoreLoadActionPayload, 'actionResult'> {
  readonly actionResult?: TopicItemStoreLoadActionResult;
}

export function createTopicItemStoreLoadActionPayload (
  options: Options
): TopicItemStoreLoadActionPayload {
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
