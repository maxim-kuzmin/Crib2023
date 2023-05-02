import { type SetupOptions } from '../../common';
import { type ApiClient } from '../../data';
import { TestArticleDomainRepositoryImpl } from '../../features/Test/Domains/Article/TestArticleDomainRepositoryImpl';
import { type ArticleDomainRepository } from './ArticleDomainRepository';
import { ArticleDomainRepositoryImpl } from './ArticleDomainRepositoryImpl';

export interface ArticleDomainModule {
  readonly getRepository: () => ArticleDomainRepository;
}

interface Options {
  readonly apiClient: ApiClient;
  readonly setupOptions: SetupOptions;
}

export function createArticleDomainModule ({
  apiClient,
  setupOptions
}: Options): ArticleDomainModule {
  const implOfRepository = setupOptions.isTestModeEnabled
    ? new TestArticleDomainRepositoryImpl()
    : new ArticleDomainRepositoryImpl({ apiClient });

  function getRepository (): ArticleDomainRepository {
    return implOfRepository;
  }

  return { getRepository };
}
