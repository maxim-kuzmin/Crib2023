import { type OptionValueObject } from '../../all';

export interface ArticleDomainEntity<TData> {
  data: TData;
  topicPathItems: OptionValueObject[];
}
