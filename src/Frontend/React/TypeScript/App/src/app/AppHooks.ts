import { useContext } from 'react';
import { type CommonHooks, type ControlsHooks } from '../common';
import { createCommonHooks } from '../common/CommonHooks';
import { createControlsHooks } from '../controls/ControlsHooks';
import { type DataHooks } from '../data';
import { createDataHooks } from '../data/DataHooks';
import { type DomainsHooks } from '../domains';
import { createDomainsHooks } from '../domains/DomainsHooks';
import { type FeaturesHooks } from '../features';
import { createFeaturesHooks } from '../features/FeaturesHooks';
import { type ViewsHooks } from '../views';
import { createViewsHooks } from '../views/ViewsHooks';
import { type AppComponent } from './AppComponent';
import { AppContext } from './AppContext';
import { type AppInstance } from './AppInstance';
import { type AppModule } from './AppModule';

export interface AppHooks {
  readonly Common: CommonHooks;
  readonly Controls: ControlsHooks;
  readonly Data: DataHooks;
  readonly Domains: DomainsHooks;
  readonly Features: FeaturesHooks;
  readonly Views: ViewsHooks;
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

  const hooksOfFeatures = createFeaturesHooks();

  const hooksOfViews = createViewsHooks({
    hooksOfAppNotificationStore: hooksOfFeatures.Stores.App.Notification,
    hooksOfArticleItemStore: hooksOfFeatures.Stores.Article.Item,
    hooksOfArticleListStore: hooksOfFeatures.Stores.Article.List,
    hooksOfTopicItemStore: hooksOfFeatures.Stores.Topic.Item,
    hooksOfTopicTreeStore: hooksOfFeatures.Stores.Topic.Tree,
  });

  const hooksOfCommon = createCommonHooks({
    componentOfConfirmControl: component.Controls.Confirm,
    hooksOfAppNotificationStore: hooksOfFeatures.Stores.App.Notification,
    hooksOfConfirmControl: hooksOfControls.Confirm,
  });

  const hooksOfData = createDataHooks({
    hooksOfOperation: hooksOfCommon.Operation
  });

  const hooksOfDomains = createDomainsHooks({
    getArticleDomainRepository: module.Domains.Article.getRepository,
    getTopicDomainRepository: module.Domains.Topic.getRepository,
    hooksOfApiRequest: hooksOfData.Api.Request
  });

  return {
    Common: hooksOfCommon,
    Controls: hooksOfControls,
    Data: hooksOfData,
    Domains: hooksOfDomains,
    Features: hooksOfFeatures,
    Views: hooksOfViews,
  };
}

export function useAppInstance (): AppInstance {
  return useContext(AppContext)!;
}
