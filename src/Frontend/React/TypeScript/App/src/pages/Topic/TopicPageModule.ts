import { type TableControlService } from '../../common';
import { type TopicPageService } from './TopicPageService';
import { TopicPageServiceImpl } from './TopicPageServiceImpl';

export interface TopicPageModule {
  readonly getService: () => TopicPageService;
}

interface Options {
  serviceOfTableControl: TableControlService;
}

export function createTopicPageModule ({
  serviceOfTableControl
}: Options): TopicPageModule {
  const implOfService = new TopicPageServiceImpl({ serviceOfTableControl });

  function getService (): TopicPageService {
    return implOfService;
  }

  return { getService };
}
