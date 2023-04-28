import { type ControlsHooks } from '../common';
import { createOperationHooks } from '../common/Operation/OperationHooks';
import { createControlsHooks } from '../controls/ControlsHooks';
import { type ApiHooks } from '../data';
import { createApiHooks } from '../data/Api/ApiHooks';
import { type DomainsHooks } from '../domains';
import { createDomainsHooks } from '../domains/DomainsHooks';
import { createStoresHooks } from '../stores/StoresHooks';
import { type ViewsHooks } from '../views';
import { createViewsHooks } from '../views/ViewsHooks';
import { type Component } from './Component';
import { useLeaveFormBlocker as useLeaveFormBlockerInner } from './Hooks/LeaveFormBlockerHook';
import { type LocalizationHooks } from './Localization';
import { createLocalizationHooks } from './Localization/LocalizationHooks';
import { type Module } from './Module';
import { type StoresHooks } from './Stores';

export interface Hooks {
  readonly Api: ApiHooks;
  readonly Controls: ControlsHooks;
  readonly Domains: DomainsHooks;
  readonly Localization: LocalizationHooks;
  readonly Stores: StoresHooks;
  readonly Views: ViewsHooks;
  readonly useLeaveFormBlocker: (shouldBlock: boolean) => void;
}

interface HooksOptions {
  readonly component: Component;
  readonly module: Module;
}

export function createHooks ({
  component,
  module
}: HooksOptions): Hooks {
  const hooksOfControls = createControlsHooks();
  const hooksOfStores = createStoresHooks();

  const hooksOfViews = createViewsHooks({
    hooksOfAppNotificationStore: hooksOfStores.App.Notification,
    hooksOfArticleItemStore: hooksOfStores.Article.Item,
    hooksOfArticleListStore: hooksOfStores.Article.List,
    hooksOfTopicItemStore: hooksOfStores.Topic.Item,
    hooksOfTopicTreeStore: hooksOfStores.Topic.Tree,
  });

  const hooksOfLocalization = createLocalizationHooks();

  const hooksOfOperation = createOperationHooks({
    hooksOfAppNotificationStore: hooksOfStores.App.Notification
  });

  const hooksOfApi = createApiHooks({ hooksOfOperation });

  const hooksOfDomains = createDomainsHooks({
    getArticleDomainRepository: module.Domains.Article.getRepository,
    getTopicDomainRepository: module.Domains.Topic.getRepository,
    hooksOfApiRequest: hooksOfApi.Request
  });

  function useLeaveFormBlocker (shouldBlock: boolean) {
    useLeaveFormBlockerInner({
      componentOfConfirmControl: component.Controls.Confirm,
      hooksOfConfirmControl: hooksOfControls.Confirm,
      shouldBlock
    });
  }

  return {
    Api: hooksOfApi,
    Controls: hooksOfControls,
    Domains: hooksOfDomains,
    Localization: hooksOfLocalization,
    Stores: hooksOfStores,
    Views: hooksOfViews,
    useLeaveFormBlocker
  };
}
