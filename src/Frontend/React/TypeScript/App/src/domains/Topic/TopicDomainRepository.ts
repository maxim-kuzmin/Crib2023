import { type ApiOperationResponse } from '../../data';
import {
  type TopicDomainItemGetOperationRequest,
  type TopicDomainItemGetOperationResponse,
  type TopicDomainItemSaveOperationRequest,
  type TopicDomainListGetOperationRequest,
  type TopicDomainListGetOperationResponse,
  type TopicDomainTreeGetOperationRequest,
  type TopicDomainTreeGetOperationResponse
} from './Operations';

export interface TopicDomainRepository {
  deleteItem: (
    request: TopicDomainItemGetOperationRequest
  ) => Promise<ApiOperationResponse>;

  getItem: (
    request: TopicDomainItemGetOperationRequest
  ) => Promise<TopicDomainItemGetOperationResponse>;

  getList: (
    request: TopicDomainListGetOperationRequest
  ) => Promise<TopicDomainListGetOperationResponse>;

  getTree: (
    request: TopicDomainTreeGetOperationRequest
  ) => Promise<TopicDomainTreeGetOperationResponse>;

  saveItem: (
    request: TopicDomainItemSaveOperationRequest
  ) => Promise<TopicDomainItemGetOperationResponse>;
}
