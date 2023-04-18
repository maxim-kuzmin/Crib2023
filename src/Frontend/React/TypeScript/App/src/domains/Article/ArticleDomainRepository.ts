import { type ApiOperationResponse } from '../../data';
import {
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainItemSaveOperationRequest,
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationResponse
} from './Operations';

export interface ArticleDomainRepository {
  deleteItem: (
    request: ArticleDomainItemGetOperationRequest
  ) => Promise<ApiOperationResponse>;

  getItem: (
    request: ArticleDomainItemGetOperationRequest
  ) => Promise<ArticleDomainItemGetOperationResponse>;

  getList: (
    request: ArticleDomainListGetOperationRequest
  ) => Promise<ArticleDomainListGetOperationResponse>;

  saveItem: (
    request: ArticleDomainItemSaveOperationRequest
  ) => Promise<ArticleDomainItemGetOperationResponse>;
}
