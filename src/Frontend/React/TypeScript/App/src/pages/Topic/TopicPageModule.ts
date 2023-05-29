import { type TableControlSettings } from '../../common';
import { type TopicPageService, createTopicPageService } from './TopicPageService';

export interface TopicPageModule {
  readonly getService: () => TopicPageService;
}

interface Options {
  settingsOfTableControl: TableControlSettings;
}

class Implementation implements TopicPageModule {
  private readonly service: TopicPageService;

  constructor ({
    settingsOfTableControl
  }: Options) {
    this.service = createTopicPageService({ settingsOfTableControl });
  }

  getService (): TopicPageService {
    return this.service;
  }
}

export function createTopicPageModule (options: Options): TopicPageModule {
  return new Implementation(options);
}
