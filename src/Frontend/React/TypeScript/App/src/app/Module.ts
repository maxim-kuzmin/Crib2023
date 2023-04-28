import { createTableControlModule, type TableControlModule } from '../common/Controls/Table/TableControlModule';
import { createHttpModule, type HttpModule } from '../common/Http/HttpModule';
import { createSetupModule, type SetupModule } from '../common/Setup/SetupModule';
import { createStoreModule, type StoreModule } from '../common/Store/StoreModule';
import { createApiModule, type ApiModule } from '../data/Api/ApiModule';
import { createArticleDomainModule, type ArticleDomainModule } from '../domains/Article/ArticleDomainModule'
import { createTopicDomainModule, type TopicDomainModule } from '../domains/Topic/TopicDomainModule';
import { createArticlePageModule, type ArticlePageModule } from '../pages/Article/ArticlePageModule';
import { createTopicPageModule, type TopicPageModule } from '../pages/Topic/TopicPageModule';
import { createArticleItemViewModule, type ArticleItemViewModule } from '../views/Article/Item/ArticleItemViewModule';
import { createTestModule, type TestModule } from './Test/TestModule';

export interface Module {
  readonly Api: ApiModule;
  readonly Controls: {
    readonly Table: TableControlModule;
  };
  readonly Domains: {
    readonly Article: ArticleDomainModule;
    readonly Topic: TopicDomainModule;
  };
  readonly Http: HttpModule;
  readonly Pages: {
    readonly Article: ArticlePageModule;
    readonly Topic: TopicPageModule;
  };
  readonly Setup: SetupModule;
  readonly Store: StoreModule;
  readonly Test: TestModule;
  readonly Views: {
    readonly Article: {
      readonly Item: ArticleItemViewModule;
    };
  };
}

export function createModule (): Module {
  const moduleOfSetup = createSetupModule();
  const moduleOfHttp = createHttpModule();
  const moduleOfArticlePage = createArticlePageModule();
  const moduleOfTableControl = createTableControlModule();
  const moduleOfArticleItemView = createArticleItemViewModule();
  const moduleOfTest = createTestModule();
  const moduleOfStore = createStoreModule();

  const moduleOfApi = createApiModule({
    httpClient: moduleOfHttp.getClient()
  });

  const moduleOfArticleDomain = createArticleDomainModule({
    apiClient: moduleOfApi.getClient(),
    setupOptions: moduleOfSetup.getOptions()
  });

  const moduleOfTopicDomain = createTopicDomainModule({
    apiClient: moduleOfApi.getClient(),
    setupOptions: moduleOfSetup.getOptions()
  });

  const moduleOfTopicPage = createTopicPageModule({
    tableControlService: moduleOfTableControl.getService()
  });

  return {
    Api: moduleOfApi,
    Controls: {
      Table: moduleOfTableControl,
    },
    Domains: {
      Article: moduleOfArticleDomain,
      Topic: moduleOfTopicDomain,
    },
    Http: moduleOfHttp,
    Pages: {
      Article: moduleOfArticlePage,
      Topic: moduleOfTopicPage,
    },
    Setup: moduleOfSetup,
    Store: moduleOfStore,
    Test: moduleOfTest,
    Views: {
      Article: {
        Item: moduleOfArticleItemView,
      }
    }
  };
}
