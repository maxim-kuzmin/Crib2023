import { type CommonSettings, type TestService } from '../../common';
import { type ApiClient } from '../../data';
import { createTopicDomainTestRepository } from '../../tests';
import { type TopicDomainRepository, createTopicDomainRepository } from './TopicDomainRepository';

export interface TopicDomainModule {
  readonly getRepository: () => TopicDomainRepository;
}

interface Options {
  readonly clientOfApi: ApiClient;
  readonly settingsOfCommon: CommonSettings;
  readonly serviceOfTest: TestService;
}

class Implementation implements TopicDomainModule {
  private readonly repository: TopicDomainRepository;

  constructor ({
    clientOfApi,
    settingsOfCommon,
    serviceOfTest,
  }: Options) {
    this.repository = settingsOfCommon.isTestModeEnabled
      ? createTopicDomainTestRepository({ serviceOfTest })
      : createTopicDomainRepository({ clientOfApi });
  }

  getRepository (): TopicDomainRepository {
    return this.repository;
  }
}

export function createTopicDomainModule (options: Options): TopicDomainModule {
  return new Implementation(options);
}
