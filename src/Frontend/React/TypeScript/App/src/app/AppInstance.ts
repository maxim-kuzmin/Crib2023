import {
  type InstanceOptions,
  type InstanceComponents,
  type InstanceControls,
  type InstanceFactories,
  type InstanceHooks,
  type InstanceModules,
} from './Instance';
import { createInstanceComponents } from './Instance/InstanceComponents';
import { createInstanceControls } from './Instance/InstanceControls';
import { createInstanceFactories } from './Instance/InstanceFactories';
import { createInstanceHooks } from './Instance/InstanceHooks';
import { createInstanceModules } from './Instance/InstanceModules';
import { createInstanceOptions } from './Instance/InstanceOptions';

export interface AppInstance {
  readonly components: InstanceComponents;
  readonly controls: InstanceControls;
  readonly factories: InstanceFactories;
  readonly hooks: InstanceHooks;
  readonly modules: InstanceModules;
  readonly options: InstanceOptions;
}

export function createAppInstance (): AppInstance {
  const options = createInstanceOptions();
  const components = createInstanceComponents();
  const controls = createInstanceControls();
  const factories = createInstanceFactories();

  const modules = createInstanceModules({
    factories,
    options,
  });

  const hooks = createInstanceHooks({ components, modules });

  return {
    components,
    controls,
    factories,
    hooks,
    modules,
    options,
  };
}
