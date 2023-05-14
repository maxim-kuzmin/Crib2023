import { type CommonHooks, type ControlsHooks } from '../../common';
import { createCommonHooks } from '../../common/CommonHooks';
import { createControlsHooks } from '../../controls/ControlsHooks';
import { type DataHooks } from '../../data';
import { createDataHooks } from '../../data/DataHooks';
import { type DomainsHooks } from '../../domains';
import { createDomainsHooks } from '../../domains/DomainsHooks';
import { type FeaturesHooks, createFeaturesHooks } from '../../features';
import { type ViewsHooks } from '../../views';
import { createViewsHooks } from '../../views/ViewsHooks';
import { type InstanceComponents } from './InstanceComponents';
import { type InstanceModules } from './InstanceModules';

export interface InstanceHooks {
  readonly Common: CommonHooks;
  readonly Controls: ControlsHooks;
  readonly Data: DataHooks;
  readonly Domains: DomainsHooks;
  readonly Features: FeaturesHooks;
  readonly Views: ViewsHooks;
}

interface Options {
  readonly components: InstanceComponents;
  readonly modules: InstanceModules;
}

export function createInstanceHooks ({
  components,
  modules
}: Options): InstanceHooks {
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
    componentOfConfirmControl: components.Controls.Confirm,
    hooksOfAppNotificationStore: hooksOfFeatures.Stores.App.Notification,
    hooksOfConfirmControl: hooksOfControls.Confirm,
  });

  const hooksOfData = createDataHooks({
    hooksOfOperation: hooksOfCommon.Operation
  });

  const hooksOfDomains = createDomainsHooks({
    hooksOfApiRequest: hooksOfData.Api.Request,
    moduleOfArticleDomain: modules.Domains.Article,
    moduleOfTopicDomain: modules.Domains.Topic,
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
