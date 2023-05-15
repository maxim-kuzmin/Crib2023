import { type TableControlOptions } from '../common';
import {
  type ArticlePageModule,
  type TopicPageModule,
  createArticlePageModule,
  createTopicPageModule
} from '.';

export interface PagesModules {
  readonly Article: ArticlePageModule;
  readonly Topic: TopicPageModule;
}

interface Options {
  optionsOfTableControl: TableControlOptions;
}

class Implementation implements PagesModules {
  readonly Article: ArticlePageModule;
  readonly Topic: TopicPageModule;

  constructor ({
    optionsOfTableControl
  }: Options) {
    this.Article = createArticlePageModule();
    this.Topic = createTopicPageModule({ optionsOfTableControl });
  }
}

export function createPagesModules (options: Options): PagesModules {
  return new Implementation(options);
}
