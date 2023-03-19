import {
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationResponse,
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationResponse
} from '../../all';

export interface ArticleDomainService {
  GetItem: (request: ArticleDomainItemGetOperationRequest) => ArticleDomainItemGetOperationResponse;
  GetList: (request: ArticleDomainListGetOperationRequest) => ArticleDomainListGetOperationResponse;
}
