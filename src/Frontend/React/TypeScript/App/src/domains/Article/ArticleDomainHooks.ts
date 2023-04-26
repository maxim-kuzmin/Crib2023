import {
  type ArticleDomainItemDeleteOperationRequestHandler,
  type ArticleDomainItemGetOperationRequestHandler,
  type ArticleDomainItemSaveOperationRequestHandler,
  type ArticleDomainListGetOperationRequestHandler,
} from './Operations';

export interface ArticleDomainHooks {
  readonly useItemDeleteOperationRequestHandler: () => ArticleDomainItemDeleteOperationRequestHandler;
  readonly useItemGetOperationRequestHandler: () => ArticleDomainItemGetOperationRequestHandler;
  readonly useItemSaveOperationRequestHandler: () => ArticleDomainItemSaveOperationRequestHandler;
  readonly useListGetOperationRequestHandler: () => ArticleDomainListGetOperationRequestHandler;
}
