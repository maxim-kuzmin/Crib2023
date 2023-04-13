import {
  type ShouldBeCanceled,
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationResponse
} from '../../../../../all';

export interface ArticleDomainItemGetOperationRequestHandler {
  handle: (
    request: ArticleDomainItemGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<ArticleDomainItemGetOperationResponse | null>;
}
