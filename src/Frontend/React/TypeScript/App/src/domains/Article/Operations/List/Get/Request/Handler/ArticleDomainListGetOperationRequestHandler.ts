import {
  type ShouldBeCanceled,
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationResponse
} from '../../../../../../../all';

export interface ArticleDomainListGetOperationRequestHandler {
  handle: (
    request: ArticleDomainListGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<ArticleDomainListGetOperationResponse | null>;
}
