import { type OptionValueObjectWithNumberId } from '../../all';

export interface ArticleDomainEntity<TData> {
  data: TData;
  topicPathItems: OptionValueObjectWithNumberId[];
}
