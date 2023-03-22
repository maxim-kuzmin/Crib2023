import { type OptionValueObject } from '../../all';

export interface ArticleBaseEntity<TData> {
  data: TData;
  topicPathItems: OptionValueObject[];
}
