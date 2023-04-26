import {
  type TopicDomainItemDeleteOperationRequestHandler,
  type TopicDomainItemGetOperationRequestHandler,
  type TopicDomainItemSaveOperationRequestHandler,
  type TopicDomainListGetOperationRequestHandler,
  type TopicDomainTreeGetOperationRequestHandler,
} from './Operations';

export interface TopicDomainHooks {
  readonly useItemDeleteOperationRequestHandler: () => TopicDomainItemDeleteOperationRequestHandler;
  readonly useItemGetOperationRequestHandler: () => TopicDomainItemGetOperationRequestHandler;
  readonly useItemSaveOperationRequestHandler: () => TopicDomainItemSaveOperationRequestHandler;
  readonly useListGetOperationRequestHandler: () => TopicDomainListGetOperationRequestHandler;
  readonly useTreeGetOperationRequestHandler: () => TopicDomainTreeGetOperationRequestHandler;
}
