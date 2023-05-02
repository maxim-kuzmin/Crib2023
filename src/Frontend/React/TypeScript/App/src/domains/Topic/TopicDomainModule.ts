import { type SetupOptions } from '../../common';
import { type ApiClient } from '../../data';
import { TestTopicDomainRepositoryImpl } from '../../features/Test/Domains/Topic/TestTopicDomainRepositoryImpl';
import { type TopicDomainRepository } from './TopicDomainRepository';
import { TopicDomainRepositoryImpl } from './TopicDomainRepositoryImpl';

export interface TopicDomainModule {
  readonly getRepository: () => TopicDomainRepository;
}

interface Options {
  readonly apiClient: ApiClient;
  readonly setupOptions: SetupOptions;
}

export function createTopicDomainModule ({
  apiClient,
  setupOptions
}: Options): TopicDomainModule {
  const implOfRepository = setupOptions.isTestModeEnabled
    ? new TestTopicDomainRepositoryImpl()
    : new TopicDomainRepositoryImpl({ apiClient });

  function getRepository (): TopicDomainRepository {
    return implOfRepository;
  }

  return { getRepository };
}
