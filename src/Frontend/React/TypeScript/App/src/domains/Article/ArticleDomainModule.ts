import { type SetupOptions } from '../../common';
import { type ApiResponseFactory, type ApiClient } from '../../data';
import { type TestService } from '../../features';
import { TestArticleDomainRepositoryImpl } from '../../features/Test/Domains/Article/TestArticleDomainRepositoryImpl';
import { type ArticleDomainRepository } from './ArticleDomainRepository';
import { ArticleDomainRepositoryImpl } from './ArticleDomainRepositoryImpl';

export interface ArticleDomainModule {
  readonly getRepository: () => ArticleDomainRepository;
}

interface Options {
  readonly apiClient: ApiClient;
  readonly factoryOfApiResponse: ApiResponseFactory;
  readonly serviceOfTest: TestService;
  readonly setupOptions: SetupOptions;
}

export function createArticleDomainModule ({
  apiClient,
  factoryOfApiResponse,
  serviceOfTest,
  setupOptions
}: Options): ArticleDomainModule {
  const implOfRepository = setupOptions.isTestModeEnabled
    ? new TestArticleDomainRepositoryImpl({ factoryOfApiResponse, serviceOfTest })
    : new ArticleDomainRepositoryImpl({ apiClient });

  function getRepository (): ArticleDomainRepository {
    return implOfRepository;
  }

  return { getRepository };
}
