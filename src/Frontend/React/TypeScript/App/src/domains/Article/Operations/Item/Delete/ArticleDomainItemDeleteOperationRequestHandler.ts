import { type ShouldBeCanceled } from '../../../../../common';
import { type ApiOperationResponse } from '../../../../../data';
import { type ArticleDomainItemDeleteOperationRequest } from './ArticleDomainItemDeleteOperationRequest';

export interface ArticleDomainItemDeleteOperationRequestHandler {
  handle: (
    request: ArticleDomainItemDeleteOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<ApiOperationResponse | null>;
}
