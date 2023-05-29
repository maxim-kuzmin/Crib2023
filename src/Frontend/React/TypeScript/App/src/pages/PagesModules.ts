import { type TableControlSettings } from '../common';
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
  settingsOfTableControl: TableControlSettings;
}

class Implementation implements PagesModules {
  readonly Article: ArticlePageModule;
  readonly Topic: TopicPageModule;

  constructor ({
    settingsOfTableControl
  }: Options) {
    this.Article = createArticlePageModule();
    this.Topic = createTopicPageModule({ settingsOfTableControl });
  }
}

export function createPagesModules (options: Options): PagesModules {
  return new Implementation(options);
}
