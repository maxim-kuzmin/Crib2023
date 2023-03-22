import {
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationResponse
} from '../../../../../all';

export interface ArticleDomainItemGetOperationRequestHandler {
  handle: (
    request: ArticleDomainItemGetOperationRequest
  ) => Promise<ArticleDomainItemGetOperationResponse | null>;
}
