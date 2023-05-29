import { type LocalizationResource } from '../../../common';

export interface TopicPathViewResource extends LocalizationResource {
  readonly getTitleForRoot: () => string;
}
