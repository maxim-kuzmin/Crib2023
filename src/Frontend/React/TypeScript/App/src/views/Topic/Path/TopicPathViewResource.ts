import { type LocalizationResource } from '../../../app';

export interface TopicPathViewResource extends LocalizationResource {
  readonly getTitleForRoot: () => string;
}
