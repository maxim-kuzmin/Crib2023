import {
  type CommonHooks,
  type ControlsHooks,
  type FunctionToSetNotification,
  type NotificationControlProps,
  createCommonHooks,
} from '../../common';
import { createControlsHooks } from '../../controls';
import { type DataHooks, createDataHooks } from '../../data';
import { type DomainsHooks, createDomainsHooks } from '../../domains';
import {
  AppNotificationStoreSliceName,
  type FeaturesHooks,
  createFeaturesHooks,
} from '../../features';
import {
  createAppNotificationStoreHooks,
  createArticleItemStoreHooks,
  createArticleListStoreHooks,
  createTopicItemStoreHooks,
  createTopicTreeStoreHooks,
} from '../../stores';
import {
  useStoreSetActionDispatch
} from '../../stores/App/Notification/Hooks/Actions/Set/AppNotificationStoreSetActionDispatchHook';
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

    this.Features = createFeaturesHooks({
      createAppNotificationStoreHooks,
      createArticleItemStoreHooks,
      createArticleListStoreHooks,
      createTopicItemStoreHooks,
      createTopicTreeStoreHooks,
    });

    const hooksOfAppNotificationStore = this.Features.App.Notification.Store;

    this.Views = createViewsHooks({
      hooksOfAppNotificationStore,
      hooksOfArticleItemStore: this.Features.Article.Item.Store,
      hooksOfArticleListStore: this.Features.Article.List.Store,
      hooksOfTopicItemStore: this.Features.Topic.Item.Store,
      hooksOfTopicTreeStore: this.Features.Topic.Tree.Store,
    });

    function useFunctionToSetNotification (): FunctionToSetNotification {
      const { run } = useStoreSetActionDispatch(AppNotificationStoreSliceName.Default);

      return (data: NotificationControlProps) => {
        run(data);
      }
    }

    this.Common = createCommonHooks({
      componentOfConfirmControl: components.Controls.Confirm,
      useFunctionToSetNotification,
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
