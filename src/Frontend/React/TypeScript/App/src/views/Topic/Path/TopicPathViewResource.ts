import { type LocalizationResource } from '../../../common';

export interface TopicPathViewResource extends LocalizationResource {
  readonly getTitleForRoot: () => string;
}

export function getTopicPathViewResourcePath (): string {
  return 'views/Topic/Path/TopicPathView';
}
