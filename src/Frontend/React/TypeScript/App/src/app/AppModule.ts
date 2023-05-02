import { type CommonModule } from '../common';
import { createCommonModule } from '../common/CommonModule';
import { type DataModule } from '../data';
import { createDataModule } from '../data/DataModule';
import { type DomainsModule } from '../domains';
import { createDomainsModule } from '../domains/DomainsModule';
import { type FeaturesModule } from '../features';
import { createFeaturesModule } from '../features/FeaturesModule';
import { type PagesModule } from '../pages';
import { createPagesModule } from '../pages/PagesModule';
import { type ViewsModule } from '../views';
import { createViewsModule } from '../views/ViewsModule';

export interface AppModule {
  readonly Common: CommonModule;
  readonly Data: DataModule;
  readonly Domains: DomainsModule;
  readonly Features: FeaturesModule;
  readonly Pages: PagesModule;
  readonly Views: ViewsModule;
}

export function createAppModule (): AppModule {
  const moduleOfCommon = createCommonModule();
  const moduleOfFeatures = createFeaturesModule();
  const moduleOfViews = createViewsModule();

  const moduleOfData = createDataModule({
    httpClient: moduleOfCommon.Http.getClient()
  });

  const moduleOfDomains = createDomainsModule({
    apiClient: moduleOfData.Api.getClient(),
    setupOptions: moduleOfCommon.Setup.getOptions()
  });

  const moduleOfPages = createPagesModule({
    tableControlService: moduleOfCommon.Controls.Table.getService()
  });

  return {
    Common: moduleOfCommon,
    Data: moduleOfData,
    Domains: moduleOfDomains,
    Features: moduleOfFeatures,
    Pages: moduleOfPages,
    Views: moduleOfViews,
  };
}
