import { type ArticleItemViewProps } from '../../../../all';

export interface ArticleItemEditViewProps extends ArticleItemViewProps {
  articleId: number;
  topicId: number;
}
