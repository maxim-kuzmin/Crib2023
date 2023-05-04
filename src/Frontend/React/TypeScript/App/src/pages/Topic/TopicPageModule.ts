import { type TableControlOptions } from '../../common';
import { type TopicPageService, createTopicPageService } from './TopicPageService';

export interface TopicPageModule {
  readonly getService: () => TopicPageService;
}

interface Options {
  optionsOfTableControl: TableControlOptions;
}

class Implementation implements TopicPageModule {
  private readonly service: TopicPageService;

  constructor ({
    optionsOfTableControl
  }: Options) {
    this.service = createTopicPageService({ optionsOfTableControl });
  }

  getService (): TopicPageService {
    return this.service;
  }
}

export function createTopicPageModule (options: Options): TopicPageModule {
  return new Implementation(options);
}
