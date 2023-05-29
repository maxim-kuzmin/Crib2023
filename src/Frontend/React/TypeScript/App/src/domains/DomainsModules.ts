import { type CommonSettings, type TestService } from '../common';
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
  readonly settingsOfCommon: CommonSettings;
  readonly serviceOfTest: TestService;
}

class Implementation implements DomainsModules {
  readonly Article: ArticleDomainModule;
  readonly Topic: TopicDomainModule;

  constructor ({
    clientOfApi,
    settingsOfCommon,
    serviceOfTest,
  }: Options) {
    this.Article = createArticleDomainModule({
      clientOfApi,
      settingsOfCommon,
      serviceOfTest,
    });

    this.Topic = createTopicDomainModule({
      clientOfApi,
      settingsOfCommon,
      serviceOfTest,
    });
  }
}
export function createDomainsModules (options: Options): DomainsModules {
  return new Implementation(options);
}
