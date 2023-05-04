import { type CommonOptions } from '../../common';
import { type ApiResponseFactory, type ApiClient } from '../../data';
import { type TestService } from '../../features';
import { createTestTopicDomainRepository } from '../../features/Test/Domains/Topic/TestTopicDomainRepository';
import { type TopicDomainRepository, createTopicDomainRepository } from './TopicDomainRepository';

export interface TopicDomainModule {
  readonly getRepository: () => TopicDomainRepository;
}

interface Options {
  readonly apiClient: ApiClient;
  readonly factoryOfApiResponse: ApiResponseFactory;
  readonly optionsOfCommon: CommonOptions;
  readonly serviceOfTest: TestService;
}

class Implementation implements TopicDomainModule {
  private readonly implOfRepository: TopicDomainRepository;

  constructor ({
    apiClient,
    factoryOfApiResponse,
    optionsOfCommon,
    serviceOfTest,
  }: Options) {
    this.implOfRepository = optionsOfCommon.isTestModeEnabled
      ? createTestTopicDomainRepository({ factoryOfApiResponse, serviceOfTest })
      : createTopicDomainRepository({ apiClient });
  }

  getRepository (): TopicDomainRepository {
    return this.implOfRepository;
  }
}

export function createTopicDomainModule (options: Options): TopicDomainModule {
  return new Implementation(options);
}
