import { type TableControlService } from '../common';
import { type ArticlePageModule } from './Article';
import { createArticlePageModule } from './Article/ArticlePageModule';
import { type TopicPageModule } from './Topic';
import { createTopicPageModule } from './Topic/TopicPageModule';

export interface PagesModule {
  readonly Article: ArticlePageModule;
  readonly Topic: TopicPageModule;
}

interface Options {
  tableControlService: TableControlService;
}

export function createPagesModule ({
  tableControlService
}: Options): PagesModule {
  const moduleOfArticle = createArticlePageModule();
  const moduleOfTopic = createTopicPageModule({ tableControlService });

  return {
    Article: moduleOfArticle,
    Topic: moduleOfTopic,
  }
}
