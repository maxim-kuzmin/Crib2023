import { type CommonHooks, type ControlsHooks } from '../common';
import { createCommonHooks } from '../common/CommonHooks';
import { createOperationHooks } from '../common/Operation/OperationHooks';
import { createControlsHooks } from '../controls/ControlsHooks';
import { type ApiHooks } from '../data';
import { createApiHooks } from '../data/Api/ApiHooks';
import { type DomainsHooks } from '../domains';
import { createDomainsHooks } from '../domains/DomainsHooks';
import { type FeaturesHooks } from '../features';
import { createFeaturesHooks } from '../features/FeaturesHooks';
import { createStoresHooks } from '../stores/StoresHooks';
import { type ViewsHooks } from '../views';
import { createViewsHooks } from '../views/ViewsHooks';
import { type AppComponent } from './AppComponent';
import { type AppModule } from './AppModule';

export interface AppHooks {
  readonly Api: ApiHooks;
  readonly Controls: ControlsHooks;
  readonly Domains: DomainsHooks;
  readonly Features: FeaturesHooks;
  readonly Views: ViewsHooks;
  readonly Common: CommonHooks;
}

interface Options {
  readonly component: AppComponent;
  readonly module: AppModule;
}

export function createAppHooks ({
  component,
  module
}: Options): AppHooks {
  const hooksOfControls = createControlsHooks();
  const hooksOfStores = createStoresHooks();

  const hooksOfViews = createViewsHooks({
    hooksOfAppNotificationStore: hooksOfStores.App.Notification,
    hooksOfArticleItemStore: hooksOfStores.Article.Item,
    hooksOfArticleListStore: hooksOfStores.Article.List,
    hooksOfTopicItemStore: hooksOfStores.Topic.Item,
    hooksOfTopicTreeStore: hooksOfStores.Topic.Tree,
  });

  const hooksOfFeatures = createFeaturesHooks();

  const hooksOfOperation = createOperationHooks({
    hooksOfAppNotificationStore: hooksOfStores.App.Notification
  });

  const hooksOfApi = createApiHooks({ hooksOfOperation });

  const hooksOfDomains = createDomainsHooks({
    getArticleDomainRepository: module.Domains.Article.getRepository,
    getTopicDomainRepository: module.Domains.Topic.getRepository,
    hooksOfApiRequest: hooksOfApi.Request
  });

  const hooksOfCommon = createCommonHooks({
    componentOfConfirmControl: component.Controls.Confirm,
    hooksOfConfirmControl: hooksOfControls.Confirm
  });

  return {
    Api: hooksOfApi,
    Common: hooksOfCommon,
    Controls: hooksOfControls,
    Domains: hooksOfDomains,
    Features: hooksOfFeatures,
    Views: hooksOfViews,
  };
}
