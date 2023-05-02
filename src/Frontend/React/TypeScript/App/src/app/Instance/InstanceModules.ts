import { type CommonModules } from '../../common';
import { createCommonModules } from '../../common/CommonModules';
import { type DataModules } from '../../data';
import { createDataModules } from '../../data/DataModules';
import { type DomainsModules } from '../../domains';
import { createDomainsModules } from '../../domains/DomainsModules';
import { type FeaturesModules } from '../../features';
import { createFeaturesModules } from '../../features/FeaturesModules';
import { type PagesModules } from '../../pages';
import { createPagesModules } from '../../pages/PagesModules';
import { type ViewsModules } from '../../views';
import { createViewsModules } from '../../views/ViewsModules';
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

export function createInstanceModules ({
  factories,
  options,
}: Options): InstanceModules {
  const modulesOfCommon = createCommonModules();

  const modulesOfFeatures = createFeaturesModules();
  const modulesOfViews = createViewsModules();

  const modulesOfData = createDataModules({
    httpClient: modulesOfCommon.Http.getClient(),
    optionsOfApi: options.Data.Api,
  });

  const modulesOfDomains = createDomainsModules({
    apiClient: modulesOfData.Api.getClient(),
    factoryOfApiResponse: factories.Data.Api.Response,
    optionsOfCommon: options.Common,
    serviceOfTest: modulesOfFeatures.Test.getService(),
  });

  const modulesOfPages = createPagesModules({
    serviceOfTableControl: modulesOfCommon.Controls.Table.getService()
  });

  return {
    Common: modulesOfCommon,
    Data: modulesOfData,
    Domains: modulesOfDomains,
    Features: modulesOfFeatures,
    Pages: modulesOfPages,
    Views: modulesOfViews,
  };
}
