import { type CommonOptions, type TestService } from '../common';
import { type ApiResponseFactory, type ApiClient } from '../data';
import {
  type ArticleDomainModule,
  type TopicDomainModule,
  createArticleDomainModule,
  createTopicDomainModule,
} from '.';

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

class Implementation implements DomainsModules {
  readonly Article: ArticleDomainModule;
  readonly Topic: TopicDomainModule;

  constructor ({
    apiClient,
    factoryOfApiResponse,
    optionsOfCommon,
    serviceOfTest,
  }: Options) {
    this.Article = createArticleDomainModule({
      apiClient,
      factoryOfApiResponse,
      optionsOfCommon,
      serviceOfTest,
    });

    this.Topic = createTopicDomainModule({
      apiClient,
      factoryOfApiResponse,
      optionsOfCommon,
      serviceOfTest,
    });
  }
}
export function createDomainsModules (options: Options): DomainsModules {
  return new Implementation(options);
}
