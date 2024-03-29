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
import { type InstanceSettings } from './InstanceSettings';

function useFunctionToSetNotification (): FunctionToSetNotification {
  const { run } = useStoreSetActionDispatch(AppNotificationStoreSliceName.Default);

  return (data: NotificationControlProps) => {
    run(data);
  }
}

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
  readonly settings: InstanceSettings;
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
    modules,
    settings,
  }: Options) {
    const {
      pathOfApiResponseResource,
      pathOfArticleItemStoreResource,
      pathOfArticleListStoreResource,
      pathOfArticleItemViewResource,
      pathOfArticleItemEditViewResource,
      pathOfArticleTableViewResource,
      pathOfConfirmControlResource,
      pathOfOperationHandlerResource,
      pathOfTableControlResource,
      pathOfTopicItemStoreResource,
      pathOfTopicPathViewResource,
      pathOfTopicTreeStoreResource,
    } = settings.Features.App.Localization;

    this.Controls = createControlsHooks({ pathOfConfirmControlResource, pathOfTableControlResource });

    this.Features = createFeaturesHooks({
      createAppNotificationStoreHooks,
      createArticleItemStoreHooks,
      createArticleListStoreHooks,
      createTopicItemStoreHooks,
      createTopicTreeStoreHooks,
      pathOfArticleItemStoreResource,
      pathOfArticleListStoreResource,
      pathOfTopicItemStoreResource,
      pathOfTopicTreeStoreResource,
    });

    const hooksOfAppNotificationStore = this.Features.App.Notification.Store;

    this.Views = createViewsHooks({
      hooksOfAppNotificationStore,
      hooksOfArticleItemStore: this.Features.Article.Item.Store,
      hooksOfArticleListStore: this.Features.Article.List.Store,
      hooksOfTopicItemStore: this.Features.Topic.Item.Store,
      hooksOfTopicTreeStore: this.Features.Topic.Tree.Store,
      pathOfArticleItemViewResource,
      pathOfArticleItemEditViewResource,
      pathOfArticleTableViewResource,
      pathOfTopicPathViewResource,
    });

    this.Common = createCommonHooks({
      componentOfConfirmControl: components.Controls.Confirm,
      hooksOfConfirmControl: this.Controls.Confirm,
      pathOfOperationHandlerResource,
      useFunctionToSetNotification,
    });

    this.Data = createDataHooks({
      hooksOfOperation: this.Common.Operation,
      pathOfApiResponseResource,
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
