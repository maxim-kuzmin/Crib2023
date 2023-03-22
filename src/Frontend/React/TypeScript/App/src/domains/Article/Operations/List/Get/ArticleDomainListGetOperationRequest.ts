import {
  ApiRequestWithInput,
  type ArticleDomainListGetOperationInput
} from '../../../../../all';

export class ArticleDomainListGetOperationRequest
  extends ApiRequestWithInput<ArticleDomainListGetOperationInput> {
  constructor (input: ArticleDomainListGetOperationInput, operationCode?: string) {
    super('ArticleDomainListGet', input, operationCode);
  }
}
