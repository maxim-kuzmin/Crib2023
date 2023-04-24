import {
  type ApiRequestCreationOptions,
  type ApiRequestWithInput,
  type ArticleTypeEntity,
  createApiRequestWithInput
} from '../../../../../data';

export interface ArticleDomainItemSaveOperationRequest extends ApiRequestWithInput<ArticleTypeEntity> {}

export function createArticleDomainItemSaveOperationRequest (
  input: ArticleTypeEntity,
  options: ApiRequestCreationOptions
): ArticleDomainItemSaveOperationRequest {
  return createApiRequestWithInput(input, options);
}
