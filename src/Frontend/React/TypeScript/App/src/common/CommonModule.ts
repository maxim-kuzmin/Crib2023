import { type ControlsModule } from './Controls';
import { createControlsModule } from './Controls/ControlsModule';
import { type HttpModule } from './Http';
import { createHttpModule } from './Http/HttpModule';
import { type SetupModule } from './Setup';
import { createSetupModule } from './Setup/SetupModule';
import { type StoreModule } from './Store';
import { createStoreModule } from './Store/StoreModule';

export interface CommonModule {
  readonly Controls: ControlsModule;
  readonly Http: HttpModule;
  readonly Setup: SetupModule;
  readonly Store: StoreModule;
}

export function createCommonModule (): CommonModule {
  const moduleOfControls = createControlsModule();
  const moduleOfHttp = createHttpModule();
  const moduleOfSetup = createSetupModule();
  const moduleOfStore = createStoreModule();

  return {
    Controls: moduleOfControls,
    Http: moduleOfHttp,
    Setup: moduleOfSetup,
    Store: moduleOfStore,
  }
}
