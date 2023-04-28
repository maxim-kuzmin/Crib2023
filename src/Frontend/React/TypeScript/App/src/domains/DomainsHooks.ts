import { type ApiRequestHooks } from '../data';
import { type ArticleDomainRepository, type ArticleDomainHooks } from './Article';
import { createArticleDomainHooks } from './Article/ArticleDomainHooks';
import { type TopicDomainRepository, type TopicDomainHooks } from './Topic';
import { createTopicDomainHooks } from './Topic/TopicDomainHooks';

export interface DomainsHooks {
  readonly Article: ArticleDomainHooks;
  readonly Topic: TopicDomainHooks;
}

interface Options {
  readonly getArticleDomainRepository: () => ArticleDomainRepository;
  readonly getTopicDomainRepository: () => TopicDomainRepository;
  readonly hooksOfApiRequest: ApiRequestHooks;
}

export function createDomainsHooks ({
  getArticleDomainRepository,
  getTopicDomainRepository,
  hooksOfApiRequest
}: Options): DomainsHooks {
  const hooksOfArticleDomain = createArticleDomainHooks({
    getArticleDomainRepository,
    hooksOfApiRequest
  });

  const hooksOfTopicDomain = createTopicDomainHooks({
    getTopicDomainRepository,
    hooksOfApiRequest
  });

  return {
    Article: hooksOfArticleDomain,
    Topic: hooksOfTopicDomain,
  };
}
