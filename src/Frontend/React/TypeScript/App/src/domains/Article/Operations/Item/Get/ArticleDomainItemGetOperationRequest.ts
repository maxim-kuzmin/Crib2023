import {
  ApiRequestWithInput,
  type ArticleDomainItemGetOperationInput
} from '../../../../../all';

export class ArticleDomainItemGetOperationRequest
  extends ApiRequestWithInput<ArticleDomainItemGetOperationInput> {
  constructor (input: ArticleDomainItemGetOperationInput, operationCode?: string) {
    super('ArticleDomainItemGet', input, operationCode);
  }
}
