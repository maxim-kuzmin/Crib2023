import { type CommonOptions, type TestService } from '../../common';
import { type ApiResponseFactory, type ApiClient } from '../../data';
import { createArticleDomainTestRepository } from '../../tests';
import { type ArticleDomainRepository, createArticleDomainRepository } from './ArticleDomainRepository';

export interface ArticleDomainModule {
  readonly getRepository: () => ArticleDomainRepository;
}

interface Options {
  readonly apiClient: ApiClient;
  readonly factoryOfApiResponse: ApiResponseFactory;
  readonly optionsOfCommon: CommonOptions;
  readonly serviceOfTest: TestService;
}

class Implementation implements ArticleDomainModule {
  private readonly repository: ArticleDomainRepository;

  constructor ({
    apiClient,
    factoryOfApiResponse,
    optionsOfCommon,
    serviceOfTest,
  }: Options) {
    this.repository = optionsOfCommon.isTestModeEnabled
      ? createArticleDomainTestRepository({ factoryOfApiResponse, serviceOfTest })
      : createArticleDomainRepository({ apiClient });
  }

  getRepository (): ArticleDomainRepository {
    return this.repository;
  }
}

export function createArticleDomainModule (options: Options): ArticleDomainModule {
  return new Implementation(options);
}
