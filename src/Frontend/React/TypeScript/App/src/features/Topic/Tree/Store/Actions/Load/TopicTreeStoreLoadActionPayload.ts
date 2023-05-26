import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ApiResponseResource } from '../../../../../../data';
import { type TopicDomainTreeGetOperationRequestHandler } from '../../../../../../domains';
import { type TopicTreeStoreSliceName } from '../../Slice';
import { type TopicTreeStoreResource } from '../../TopicTreeStoreResource';
import { type TopicTreeStoreLoadActionResult } from './TopicTreeStoreLoadActionResult';

export interface TopicTreeStoreLoadActionPayload
  extends StoreActionPayload<TopicTreeStoreSliceName> {
  readonly abortSignal?: AbortSignal;
  readonly actionResult: TopicTreeStoreLoadActionResult;
  readonly resourceOfApiResponse: ApiResponseResource;
  readonly resourceOfTopicTreeStore: TopicTreeStoreResource;
  readonly requestHandler: TopicDomainTreeGetOperationRequestHandler;
}

interface Options extends Omit<TopicTreeStoreLoadActionPayload, 'actionResult'> {
  readonly actionResult?: TopicTreeStoreLoadActionResult;
}

export function createTopicTreeStoreLoadActionPayload (
  options: Options
): TopicTreeStoreLoadActionPayload {
  const {
    abortSignal,
    actionResult,
    resourceOfApiResponse,
    resourceOfTopicTreeStore,
    requestHandler,
  } = options;

  const base = createStoreActionPayload(options);

  return {
    ...base,
    abortSignal,
    actionResult: actionResult ?? null,
    resourceOfApiResponse,
    resourceOfTopicTreeStore,
    requestHandler,
  };
}
