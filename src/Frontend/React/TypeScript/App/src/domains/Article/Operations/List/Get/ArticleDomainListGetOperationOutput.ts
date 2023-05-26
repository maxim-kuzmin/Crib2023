import { type ListGetOperationOutput, createListGetOperationOutput } from '../../../../../common';
import { type ArticleDomainEntityForList } from '../../../Entities';

export interface ArticleDomainListGetOperationOutput extends ListGetOperationOutput<ArticleDomainEntityForList> {}

export function createArticleDomainListGetOperationOutput (
  options: ArticleDomainListGetOperationOutput
): ArticleDomainListGetOperationOutput {
  return createListGetOperationOutput(options);
}
