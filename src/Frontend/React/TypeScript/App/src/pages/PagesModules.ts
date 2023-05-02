import { type TableControlService } from '../common';
import { type ArticlePageModule } from './Article';
import { createArticlePageModule } from './Article/ArticlePageModule';
import { type TopicPageModule } from './Topic';
import { createTopicPageModule } from './Topic/TopicPageModule';

export interface PagesModules {
  readonly Article: ArticlePageModule;
  readonly Topic: TopicPageModule;
}

interface Options {
  serviceOfTableControl: TableControlService;
}

export function createPagesModules ({
  serviceOfTableControl
}: Options): PagesModules {
  const moduleOfArticle = createArticlePageModule();
  const moduleOfTopic = createTopicPageModule({ serviceOfTableControl });

  return {
    Article: moduleOfArticle,
    Topic: moduleOfTopic,
  }
}
