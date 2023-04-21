import { type ShouldBeCanceled } from '../../../../../common';
import { type ApiOperationResponse } from '../../../../../data';
import { type TopicDomainItemDeleteOperationRequest } from './TopicDomainItemDeleteOperationRequest';

export interface TopicDomainItemDeleteOperationRequestHandler {
  handle: (
    request: TopicDomainItemDeleteOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<ApiOperationResponse | null>;
}
