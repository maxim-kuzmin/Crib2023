import { TestArticleDomainRepositoryImpl } from '../../app/Test/Domains/Article/TestArticleDomainRepositoryImpl';
import { type SetupOptions } from '../../common';
import { type ApiClient } from '../../data';
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
  const implOfArticleDomainRepository = setupOptions.isTestModeEnabled
    ? new TestArticleDomainRepositoryImpl()
    : new ArticleDomainRepositoryImpl({ apiClient });

  function getRepository (): ArticleDomainRepository {
    return implOfArticleDomainRepository;
  }

  return { getRepository };
}
