import { type OptionValueObject } from '../../common';

export interface ArticleDomainEntity<TData> {
  data: TData;
  topicPathItems: OptionValueObject[];
}
