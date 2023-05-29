import { type CommonModules, createCommonModules } from '../../common';
import { type DataModules, createDataModules } from '../../data';
import { type DomainsModules, createDomainsModules } from '../../domains';
import { type PagesModules, createPagesModules } from '../../pages';
import { type ViewsModules, createViewsModules } from '../../views';
import { type InstanceSettings } from './InstanceSettings';

export interface InstanceModules {
  readonly Common: CommonModules;
  readonly Data: DataModules;
  readonly Domains: DomainsModules;
  readonly Pages: PagesModules;
  readonly Views: ViewsModules;
}

interface Options {
  readonly settings: InstanceSettings;
}

class Implementation implements InstanceModules {
  readonly Common: CommonModules;
  readonly Data: DataModules;
  readonly Domains: DomainsModules;
  readonly Pages: PagesModules;
  readonly Views: ViewsModules;

  constructor ({
    settings,
  }: Options) {
    this.Common = createCommonModules();

    this.Views = createViewsModules();

    this.Data = createDataModules({
      httpClient: this.Common.Http.getClient(),
      settingsOfApi: settings.Data.Api,
    });

    this.Domains = createDomainsModules({
      clientOfApi: this.Data.Api.getClient(),
      settingsOfCommon: settings.Common,
      serviceOfTest: this.Common.Test.getService(),
    });

    this.Pages = createPagesModules({
      settingsOfTableControl: settings.Common.Controls.Table
    });
  }
}

export function createInstanceModules (options: Options): InstanceModules {
  return new Implementation(options);
}
