import { type PropsWithChildren } from 'react';

export interface AppLayoutAsideViewProps extends PropsWithChildren {
  createTopicPageUrl: (topicId: number) => string;
  logoUrl: string;
}
