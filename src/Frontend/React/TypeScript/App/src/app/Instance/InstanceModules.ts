import { type CommonModules, createCommonModules } from '../../common';
import { type DataModules, createDataModules } from '../../data';
import { type DomainsModules, createDomainsModules } from '../../domains';
import { type FeaturesModules, createFeaturesModules } from '../../features';
import { type PagesModules, createPagesModules } from '../../pages';
import { type ViewsModules, createViewsModules } from '../../views';
import { type InstanceFactories } from './InstanceFactories';
import { type InstanceOptions } from './InstanceOptions';

export interface InstanceModules {
  readonly Common: CommonModules;
  readonly Data: DataModules;
  readonly Domains: DomainsModules;
  readonly Features: FeaturesModules;
  readonly Pages: PagesModules;
  readonly Views: ViewsModules;
}

interface Options {
  readonly factories: InstanceFactories;
  readonly options: InstanceOptions;
}

class Implementation implements InstanceModules {
  readonly Common: CommonModules;
  readonly Data: DataModules;
  readonly Domains: DomainsModules;
  readonly Features: FeaturesModules;
  readonly Pages: PagesModules;
  readonly Views: ViewsModules;

  constructor ({
    factories,
    options,
  }: Options) {
    this.Common = createCommonModules();

    this.Features = createFeaturesModules();
    this.Views = createViewsModules();

    this.Data = createDataModules({
      httpClient: this.Common.Http.getClient(),
      optionsOfApi: options.Data.Api,
    });

    this.Domains = createDomainsModules({
      apiClient: this.Data.Api.getClient(),
      factoryOfApiResponse: factories.Data.Api.Response,
      optionsOfCommon: options.Common,
      serviceOfTest: this.Features.Test.getService(),
    });

    this.Pages = createPagesModules({
      optionsOfTableControl: options.Common.Controls.Table
    });
  }
}

export function createInstanceModules (options: Options): InstanceModules {
  return new Implementation(options);
}
