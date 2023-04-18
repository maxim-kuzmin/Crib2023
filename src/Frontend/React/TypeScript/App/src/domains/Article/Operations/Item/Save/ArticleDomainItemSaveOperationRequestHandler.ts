import { type ShouldBeCanceled } from '../../../../../common';
import { type ArticleDomainItemGetOperationResponse } from '../Get';
import { type ArticleDomainItemSaveOperationRequest } from './ArticleDomainItemSaveOperationRequest';

export interface ArticleDomainItemSaveOperationRequestHandler {
  handle: (
    request: ArticleDomainItemSaveOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<ArticleDomainItemGetOperationResponse | null>;
}
