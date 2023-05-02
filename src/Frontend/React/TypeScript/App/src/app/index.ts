import { type AppComponent, createAppComponent } from './AppComponent';
import { type AppControl, createAppControl } from './AppControl';
import { type AppFactory, createAppFactory } from './AppFactory';
import { type AppHooks, createAppHooks } from './AppHooks';
import { type AppModule, createAppModule } from './AppModule';

interface App {
  readonly component: AppComponent;
  readonly control: AppControl;
  readonly factory: AppFactory;
  readonly hooks: AppHooks;
  readonly module: AppModule;
}

function createApp (): App {
  const component = createAppComponent();
  const control = createAppControl();
  const factory = createAppFactory();
  const module = createAppModule({ factory });
  const hooks = createAppHooks({ component, module });

  return {
    component,
    control,
    factory,
    hooks,
    module,
  };
}

const app = createApp();

export function useApp (): App {
  return app;
}
