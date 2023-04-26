import { type TableControlModule } from '../common/Controls/Table/TableControlModule';
import { type HttpModule } from '../common/Http/HttpModule';
import { type SetupModule } from '../common/Setup/SetupModule';
import { type StoreModule } from '../common/Store/StoreModule';
import { type ApiModule } from '../data/Api/ApiModule';
import { type ArticleDomainModule } from '../domains/Article/ArticleDomainModule'
import { type TopicDomainModule } from '../domains/Topic/TopicDomainModule';
import { type ArticlePageModule } from '../pages/Article/ArticlePageModule';
import { type TopicPageModule } from '../pages/Topic/TopicPageModule';
import { type ArticleItemEditViewModule } from '../views/Article/Item/Edit/ArticleItemEditViewModule';
import { type TestModule } from './Test/TestModule';

export interface Modules {
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
      readonly ItemEdit: ArticleItemEditViewModule;
    };
  };
}
