import { type TableControlOptions } from '../common';
import { type ArticlePageModule } from './Article';
import { createArticlePageModule } from './Article/ArticlePageModule';
import { type TopicPageModule } from './Topic';
import { createTopicPageModule } from './Topic/TopicPageModule';

export interface PagesModules {
  readonly Article: ArticlePageModule;
  readonly Topic: TopicPageModule;
}

interface Options {
  optionsOfTableControl: TableControlOptions;
}

export function createPagesModules ({
  optionsOfTableControl
}: Options): PagesModules {
  const moduleOfArticle = createArticlePageModule();
  const moduleOfTopic = createTopicPageModule({ optionsOfTableControl });

  return {
    Article: moduleOfArticle,
    Topic: moduleOfTopic,
  }
}
