import { type ArticleItemViewProps } from '../ArticleItemViewProps';

export interface ArticleItemEditViewProps extends ArticleItemViewProps {
  articleId: number;
  topicId: number;
}
