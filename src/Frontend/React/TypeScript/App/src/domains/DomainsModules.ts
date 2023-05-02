import { type SetupOptions } from '../common';
import { type ApiResponseFactory, type ApiClient } from '../data';
import { type TestService } from '../features';
import { type ArticleDomainModule } from './Article';
import { createArticleDomainModule } from './Article/ArticleDomainModule';
import { type TopicDomainModule } from './Topic';
import { createTopicDomainModule } from './Topic/TopicDomainModule';

export interface DomainsModules {
  readonly Article: ArticleDomainModule;
  readonly Topic: TopicDomainModule;
}

interface Options {
  readonly apiClient: ApiClient;
  readonly factoryOfApiResponse: ApiResponseFactory;
  readonly optionsOfSetup: SetupOptions;
  readonly serviceOfTest: TestService;
}

export function createDomainsModules ({
  apiClient,
  factoryOfApiResponse,
  optionsOfSetup,
  serviceOfTest,
}: Options): DomainsModules {
  const moduleOfArticle = createArticleDomainModule({
    apiClient,
    factoryOfApiResponse,
    optionsOfSetup,
    serviceOfTest,
  });

  const moduleOfTopic = createTopicDomainModule({
    apiClient,
    factoryOfApiResponse,
    optionsOfSetup,
    serviceOfTest,
  });

  return {
    Article: moduleOfArticle,
    Topic: moduleOfTopic,
  }
}
