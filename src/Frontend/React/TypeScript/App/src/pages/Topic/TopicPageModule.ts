import { type TableControlOptions } from '../../common';
import { type TopicPageService } from './TopicPageService';
import { TopicPageServiceImpl } from './TopicPageServiceImpl';

export interface TopicPageModule {
  readonly getService: () => TopicPageService;
}

interface Options {
  optionsOfTableControl: TableControlOptions;
}

export function createTopicPageModule ({
  optionsOfTableControl
}: Options): TopicPageModule {
  const implOfService = new TopicPageServiceImpl({ optionsOfTableControl });

  function getService (): TopicPageService {
    return implOfService;
  }

  return { getService };
}
