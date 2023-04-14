import {
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationResponse
} from './Operations';

export interface ArticleDomainRepository {
  getItem: (
    request: ArticleDomainItemGetOperationRequest
  ) => Promise<ArticleDomainItemGetOperationResponse>;

  getList: (
    request: ArticleDomainListGetOperationRequest
  ) => Promise<ArticleDomainListGetOperationResponse>;
}
