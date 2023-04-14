import { type ShouldBeCanceled } from '../../../../../common';
import { type ArticleDomainListGetOperationRequest } from './ArticleDomainListGetOperationRequest';
import { type ArticleDomainListGetOperationResponse } from './ArticleDomainListGetOperationResponse';

export interface ArticleDomainListGetOperationRequestHandler {
  handle: (
    request: ArticleDomainListGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<ArticleDomainListGetOperationResponse | null>;
}
