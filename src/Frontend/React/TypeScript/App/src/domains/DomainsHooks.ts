import { type ApiRequestHooks } from '../data';
import { type ArticleDomainHooks, type ArticleDomainModule } from './Article';
import { createArticleDomainHooks } from './Article/ArticleDomainHooks';
import { type TopicDomainHooks, type TopicDomainModule } from './Topic';
import { createTopicDomainHooks } from './Topic/TopicDomainHooks';

export interface DomainsHooks {
  readonly Article: ArticleDomainHooks;
  readonly Topic: TopicDomainHooks;
}

interface Options {
  readonly hooksOfApiRequest: ApiRequestHooks;
  readonly moduleOfArticleDomain: ArticleDomainModule;
  readonly moduleOfTopicDomain: TopicDomainModule;
}

export function createDomainsHooks ({
  hooksOfApiRequest,
  moduleOfArticleDomain,
  moduleOfTopicDomain,
}: Options): DomainsHooks {
  const hooksOfArticle = createArticleDomainHooks({
    hooksOfApiRequest,
    moduleOfArticleDomain,
  });

  const hooksOfTopic = createTopicDomainHooks({
    hooksOfApiRequest,
    moduleOfTopicDomain,
  });

  return {
    Article: hooksOfArticle,
    Topic: hooksOfTopic,
  };
}
