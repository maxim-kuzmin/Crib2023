import { type CommonHooks, type ControlsHooks, createCommonHooks } from '../../common';
import { createControlsHooks } from '../../controls';
import { type DataHooks, createDataHooks } from '../../data';
import { type DomainsHooks, createDomainsHooks } from '../../domains';
import { type FeaturesHooks, createFeaturesHooks } from '../../features';
import { type ViewsHooks, createViewsHooks } from '../../views';
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

class Implementation implements InstanceHooks {
  readonly Common: CommonHooks;
  readonly Controls: ControlsHooks;
  readonly Data: DataHooks;
  readonly Domains: DomainsHooks;
  readonly Features: FeaturesHooks;
  readonly Views: ViewsHooks;

  constructor ({
    components,
    modules
  }: Options) {
    this.Controls = createControlsHooks();

    this.Features = createFeaturesHooks();

    this.Views = createViewsHooks({
      hooksOfAppNotificationStore: this.Features.Stores.App.Notification,
      hooksOfArticleItemStore: this.Features.Stores.Article.Item,
      hooksOfArticleListStore: this.Features.Stores.Article.List,
      hooksOfTopicItemStore: this.Features.Stores.Topic.Item,
      hooksOfTopicTreeStore: this.Features.Stores.Topic.Tree,
    });

    this.Common = createCommonHooks({
      componentOfConfirmControl: components.Controls.Confirm,
      hooksOfAppNotificationStore: this.Features.Stores.App.Notification,
      hooksOfConfirmControl: this.Controls.Confirm,
    });

    this.Data = createDataHooks({
      hooksOfOperation: this.Common.Operation
    });

    this.Domains = createDomainsHooks({
      hooksOfApiRequest: this.Data.Api.Request,
      moduleOfArticleDomain: modules.Domains.Article,
      moduleOfTopicDomain: modules.Domains.Topic,
    });
  }
}
export function createInstanceHooks (options: Options): InstanceHooks {
  return new Implementation(options);
}
