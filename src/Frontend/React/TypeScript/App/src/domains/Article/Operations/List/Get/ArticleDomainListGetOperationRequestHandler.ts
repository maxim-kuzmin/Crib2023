import {
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationResponse
} from '../../../../../all';

export interface ArticleDomainListGetOperationRequestHandler {
  handle: (
    request: ArticleDomainListGetOperationRequest
  ) => Promise<ArticleDomainListGetOperationResponse | null>;
}
