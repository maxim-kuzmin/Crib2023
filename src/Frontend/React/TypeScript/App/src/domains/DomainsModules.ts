import { type CommonOptions, type TestService } from '../common';
import { type ApiClient } from '../data';
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
  readonly clientOfApi: ApiClient;
  readonly optionsOfCommon: CommonOptions;
  readonly serviceOfTest: TestService;
}

class Implementation implements DomainsModules {
  readonly Article: ArticleDomainModule;
  readonly Topic: TopicDomainModule;

  constructor ({
    clientOfApi,
    optionsOfCommon,
    serviceOfTest,
  }: Options) {
    this.Article = createArticleDomainModule({
      clientOfApi,
      optionsOfCommon,
      serviceOfTest,
    });

    this.Topic = createTopicDomainModule({
      clientOfApi,
      optionsOfCommon,
      serviceOfTest,
    });
  }
}
export function createDomainsModules (options: Options): DomainsModules {
  return new Implementation(options);
}
