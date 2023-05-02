import { type SetupOptions } from '../../common';
import { type ApiResponseFactory, type ApiClient } from '../../data';
import { type TestService } from '../../features';
import { TestTopicDomainRepositoryImpl } from '../../features/Test/Domains/Topic/TestTopicDomainRepositoryImpl';
import { type TopicDomainRepository } from './TopicDomainRepository';
import { TopicDomainRepositoryImpl } from './TopicDomainRepositoryImpl';

export interface TopicDomainModule {
  readonly getRepository: () => TopicDomainRepository;
}

interface Options {
  readonly apiClient: ApiClient;
  readonly factoryOfApiResponse: ApiResponseFactory;
  readonly optionsOfSetup: SetupOptions;
  readonly serviceOfTest: TestService;
}

export function createTopicDomainModule ({
  apiClient,
  factoryOfApiResponse,
  optionsOfSetup,
  serviceOfTest,
}: Options): TopicDomainModule {
  const implOfRepository = optionsOfSetup.isTestModeEnabled
    ? new TestTopicDomainRepositoryImpl({ factoryOfApiResponse, serviceOfTest })
    : new TopicDomainRepositoryImpl({ apiClient });

  function getRepository (): TopicDomainRepository {
    return implOfRepository;
  }

  return { getRepository };
}
