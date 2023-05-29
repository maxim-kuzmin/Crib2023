import { type ArticleTypeEntity } from '../../../../data';

export interface ArticleItemEditViewProps {
  articleId: number;
  articlePageUrl: string;
  onLoadActionCompleted?: (entity: ArticleTypeEntity) => void;
  topicId: number;
  topicPageLastUrl?: string;
}
