import { type SetupOptions } from '../common';
import { type ApiResponseFactory, type ApiClient } from '../data';
import { type TestService } from '../features';
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
  readonly factoryOfApiResponse: ApiResponseFactory;
  readonly serviceOfTest: TestService;
  readonly setupOptions: SetupOptions;
}

export function createDomainsModule ({
  apiClient,
  factoryOfApiResponse,
  serviceOfTest,
  setupOptions
}: Options): DomainsModule {
  const moduleOfArticle = createArticleDomainModule({ apiClient, factoryOfApiResponse, serviceOfTest, setupOptions });
  const moduleOfTopic = createTopicDomainModule({ apiClient, factoryOfApiResponse, serviceOfTest, setupOptions });

  return {
    Article: moduleOfArticle,
    Topic: moduleOfTopic,
  }
}
