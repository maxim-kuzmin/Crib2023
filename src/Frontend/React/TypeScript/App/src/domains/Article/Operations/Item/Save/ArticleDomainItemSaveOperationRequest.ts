import {
  type ApiRequest,
  type ApiRequestWithInput,
  type ArticleTypeEntity,
  createApiRequestWithInput
} from '../../../../../data';

export interface ArticleDomainItemSaveOperationRequest extends ApiRequestWithInput<ArticleTypeEntity> {}

export function createArticleDomainItemSaveOperationRequest (
  input: ArticleTypeEntity,
  options?: Partial<ApiRequest>
): ArticleDomainItemSaveOperationRequest {
  return createApiRequestWithInput(input, options);
}
