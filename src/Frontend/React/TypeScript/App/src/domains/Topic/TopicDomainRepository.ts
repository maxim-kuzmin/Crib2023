import {
  type TopicDomainItemGetOperationRequest,
  type TopicDomainItemGetOperationResponse,
  type TopicDomainListGetOperationRequest,
  type TopicDomainListGetOperationResponse,
  type TopicDomainTreeGetOperationRequest,
  type TopicDomainTreeGetOperationResponse
} from './Operations';

export interface TopicDomainRepository {
  getItem: (
    request: TopicDomainItemGetOperationRequest
  ) => Promise<TopicDomainItemGetOperationResponse>;

  getList: (
    request: TopicDomainListGetOperationRequest
  ) => Promise<TopicDomainListGetOperationResponse>;

  getTree: (
    request: TopicDomainTreeGetOperationRequest
  ) => Promise<TopicDomainTreeGetOperationResponse>;
}
