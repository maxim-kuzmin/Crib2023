import { type TableControlService } from '../../common';
import { type TopicPageService } from './TopicPageService';
import { TopicPageServiceImpl } from './TopicPageServiceImpl';

export interface TopicPageModule {
  readonly getService: () => TopicPageService;
}

interface Options {
  tableControlService: TableControlService;
}

export function createTopicPageModule ({
  tableControlService
}: Options): TopicPageModule {
  const implOfTopicPageService = new TopicPageServiceImpl({ tableControlService });

  function getService (): TopicPageService {
    return implOfTopicPageService;
  }

  return { getService };
}
