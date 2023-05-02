import { type CommonOptions } from '../../common';
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
  readonly optionsOfCommon: CommonOptions;
  readonly serviceOfTest: TestService;
}

export function createTopicDomainModule ({
  apiClient,
  factoryOfApiResponse,
  optionsOfCommon,
  serviceOfTest,
}: Options): TopicDomainModule {
  const implOfRepository = optionsOfCommon.isTestModeEnabled
    ? new TestTopicDomainRepositoryImpl({ factoryOfApiResponse, serviceOfTest })
    : new TopicDomainRepositoryImpl({ apiClient });

  function getRepository (): TopicDomainRepository {
    return implOfRepository;
  }

  return { getRepository };
}
