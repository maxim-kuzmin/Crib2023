import { type ArticleTypeEntity } from '../../../data';

export interface ArticleItemViewProps {
  articleId: number;
  articleEditPageUrl: string;
  onLoadActionCompleted?: (entity: ArticleTypeEntity) => void;
  topicPageLastUrl?: string;
}
