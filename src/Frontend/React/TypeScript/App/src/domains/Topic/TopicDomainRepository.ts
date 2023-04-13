import {
  type TopicDomainTreeGetOperationRequest,
  type TopicDomainItemGetOperationRequest,
  type TopicDomainItemGetOperationResponse,
  type TopicDomainListGetOperationRequest,
  type TopicDomainListGetOperationResponse,
  type TopicDomainTreeGetOperationResponse
} from '../../all';

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
