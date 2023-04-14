import { type ShouldBeCanceled } from '../../../../../common';
import { type ArticleDomainItemGetOperationRequest } from './ArticleDomainItemGetOperationRequest';
import { type ArticleDomainItemGetOperationResponse } from './ArticleDomainItemGetOperationResponse';

export interface ArticleDomainItemGetOperationRequestHandler {
  handle: (
    request: ArticleDomainItemGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<ArticleDomainItemGetOperationResponse | null>;
}
