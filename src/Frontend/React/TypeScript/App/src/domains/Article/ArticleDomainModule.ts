import { type CommonOptions, type TestService } from '../../common';
import { type ApiClient } from '../../data';
import { createArticleDomainTestRepository } from '../../tests';
import { type ArticleDomainRepository, createArticleDomainRepository } from './ArticleDomainRepository';

export interface ArticleDomainModule {
  readonly getRepository: () => ArticleDomainRepository;
}

interface Options {
  readonly clientOfApi: ApiClient;
  readonly optionsOfCommon: CommonOptions;
  readonly serviceOfTest: TestService;
}

class Implementation implements ArticleDomainModule {
  private readonly repository: ArticleDomainRepository;

  constructor ({
    clientOfApi,
    optionsOfCommon,
    serviceOfTest,
  }: Options) {
    this.repository = optionsOfCommon.isTestModeEnabled
      ? createArticleDomainTestRepository({ serviceOfTest })
      : createArticleDomainRepository({ clientOfApi });
  }

  getRepository (): ArticleDomainRepository {
    return this.repository;
  }
}

export function createArticleDomainModule (options: Options): ArticleDomainModule {
  return new Implementation(options);
}
