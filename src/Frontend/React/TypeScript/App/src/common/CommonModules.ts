import { type ControlsModules } from './Controls';
import { createControlsModules } from './Controls/ControlsModules';
import { type HttpModule } from './Http';
import { createHttpModule } from './Http/HttpModule';
import { type SetupModule } from './Setup';
import { createSetupModule } from './Setup/SetupModule';
import { type StoreModule } from './Store';
import { createStoreModule } from './Store/StoreModule';

export interface CommonModules {
  readonly Controls: ControlsModules;
  readonly Http: HttpModule;
  readonly Setup: SetupModule;
  readonly Store: StoreModule;
}

export function createCommonModules (): CommonModules {
  const modulesOfControls = createControlsModules();
  const moduleOfHttp = createHttpModule();
  const moduleOfSetup = createSetupModule();
  const moduleOfStore = createStoreModule();

  return {
    Controls: modulesOfControls,
    Http: moduleOfHttp,
    Setup: moduleOfSetup,
    Store: moduleOfStore,
  }
}
