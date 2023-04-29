import { type SetupOptions } from '../common';
import { type ApiClient } from '../data';
import { type ArticleDomainModule } from './Article';
import { createArticleDomainModule } from './Article/ArticleDomainModule';
import { type TopicDomainModule } from './Topic';
import { createTopicDomainModule } from './Topic/TopicDomainModule';

export interface DomainsModule {
  readonly Article: ArticleDomainModule;
  readonly Topic: TopicDomainModule;
}

interface Options {
  readonly apiClient: ApiClient;
  readonly setupOptions: SetupOptions;
}

export function createDomainsModule ({
  apiClient,
  setupOptions
}: Options): DomainsModule {
  const moduleOfArticle = createArticleDomainModule({ apiClient, setupOptions });
  const moduleOfTopic = createTopicDomainModule({ apiClient, setupOptions });

  return {
    Article: moduleOfArticle,
    Topic: moduleOfTopic,
  }
}
