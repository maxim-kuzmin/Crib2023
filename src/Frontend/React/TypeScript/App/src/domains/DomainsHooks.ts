import { type ApiRequestHooks } from '../data';
import {
  type ArticleDomainHooks,
  type ArticleDomainModule,
  type TopicDomainHooks,
  type TopicDomainModule,
  createArticleDomainHooks,
  createTopicDomainHooks,
} from '.';

export interface DomainsHooks {
  readonly Article: ArticleDomainHooks;
  readonly Topic: TopicDomainHooks;
}

interface Options {
  readonly hooksOfApiRequest: ApiRequestHooks;
  readonly moduleOfArticleDomain: ArticleDomainModule;
  readonly moduleOfTopicDomain: TopicDomainModule;
}

class Implementation implements DomainsHooks {
  readonly Article: ArticleDomainHooks;
  readonly Topic: TopicDomainHooks;

  constructor ({
    hooksOfApiRequest,
    moduleOfArticleDomain,
    moduleOfTopicDomain,
  }: Options) {
    this.Article = createArticleDomainHooks({
      hooksOfApiRequest,
      moduleOfArticleDomain,
    });

    this.Topic = createTopicDomainHooks({
      hooksOfApiRequest,
      moduleOfTopicDomain,
    });
  }
}

export function createDomainsHooks (options: Options): DomainsHooks {
  return new Implementation(options);
}
