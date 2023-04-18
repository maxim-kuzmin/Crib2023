import { type ArticleTypeEntity, type ApiRequestWithInput } from '../../../../../data';

export interface ArticleDomainItemSaveOperationRequest extends ApiRequestWithInput<ArticleTypeEntity> {}

export function createArticleDomainItemSaveOperationRequest (
  input: ArticleTypeEntity,
  operationCode: string = ''
): ArticleDomainItemSaveOperationRequest {
  return {
    operationName: '@@ArticleDomainItemSave',
    operationCode,
    input
  };
}
