import { type CommonOptions } from '../common';
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
  readonly optionsOfCommon: CommonOptions;
  readonly serviceOfTest: TestService;
}

export function createDomainsModules ({
  apiClient,
  factoryOfApiResponse,
  optionsOfCommon,
  serviceOfTest,
}: Options): DomainsModules {
  const moduleOfArticle = createArticleDomainModule({
    apiClient,
    factoryOfApiResponse,
    optionsOfCommon,
    serviceOfTest,
  });

  const moduleOfTopic = createTopicDomainModule({
    apiClient,
    factoryOfApiResponse,
    optionsOfCommon,
    serviceOfTest,
  });

  return {
    Article: moduleOfArticle,
    Topic: moduleOfTopic,
  };
}
