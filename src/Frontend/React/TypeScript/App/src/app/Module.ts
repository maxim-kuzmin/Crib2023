import {
  type ControlsModule,
  type HttpModule,
  type SetupModule,
  type StoreModule
} from '../common';
import { createControlsModule } from '../common/Controls/ControlsModule';
import { createHttpModule } from '../common/Http/HttpModule';
import { createSetupModule } from '../common/Setup/SetupModule';
import { createStoreModule } from '../common/Store/StoreModule';
import { type ApiModule } from '../data';
import { createApiModule } from '../data/Api/ApiModule';
import { type DomainsModule } from '../domains';
import { createDomainsModule } from '../domains/DomainsModule';
import { type PagesModule } from '../pages';
import { createPagesModule } from '../pages/PagesModule';
import { type ViewsModule } from '../views';
import { createViewsModule } from '../views/ViewsModule';
import { type TestModule } from './Test';
import { createTestModule } from './Test/TestModule';

export interface Module {
  readonly Api: ApiModule;
  readonly Controls: ControlsModule;
  readonly Domains: DomainsModule;
  readonly Http: HttpModule;
  readonly Pages: PagesModule;
  readonly Setup: SetupModule;
  readonly Store: StoreModule;
  readonly Test: TestModule;
  readonly Views: ViewsModule;
}

export function createModule (): Module {
  const moduleOfControls = createControlsModule();
  const moduleOfSetup = createSetupModule();
  const moduleOfHttp = createHttpModule();
  const moduleOfViews = createViewsModule();
  const moduleOfTest = createTestModule();
  const moduleOfStore = createStoreModule();

  const moduleOfApi = createApiModule({
    httpClient: moduleOfHttp.getClient()
  });

  const moduleOfDomains = createDomainsModule({
    apiClient: moduleOfApi.getClient(),
    setupOptions: moduleOfSetup.getOptions()
  });

  const moduleOfPages = createPagesModule({
    tableControlService: moduleOfControls.Table.getService()
  });

  return {
    Api: moduleOfApi,
    Controls: moduleOfControls,
    Domains: moduleOfDomains,
    Http: moduleOfHttp,
    Pages: moduleOfPages,
    Setup: moduleOfSetup,
    Store: moduleOfStore,
    Test: moduleOfTest,
    Views: moduleOfViews
  };
}
