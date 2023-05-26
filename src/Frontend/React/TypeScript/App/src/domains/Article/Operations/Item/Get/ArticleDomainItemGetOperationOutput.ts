import { type ItemGetOperationOutput, createItemGetOperationOutput } from '../../../../../common';
import { type ArticleDomainEntityForItem } from '../../../Entities';

export interface ArticleDomainItemGetOperationOutput extends ItemGetOperationOutput<ArticleDomainEntityForItem> {}

export function createArticleDomainItemGetOperationOutput (
  options: ArticleDomainItemGetOperationOutput
): ArticleDomainItemGetOperationOutput {
  return createItemGetOperationOutput(options);
}
