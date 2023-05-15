import {
  type InstanceOptions,
  type InstanceComponents,
  type InstanceControls,
  type InstanceFactories,
  type InstanceHooks,
  type InstanceModules,
  createInstanceComponents,
  createInstanceControls,
  createInstanceFactories,
  createInstanceHooks,
  createInstanceModules,
  createInstanceOptions,
} from '.';

export interface AppInstance {
  readonly components: InstanceComponents;
  readonly controls: InstanceControls;
  readonly factories: InstanceFactories;
  readonly hooks: InstanceHooks;
  readonly modules: InstanceModules;
  readonly options: InstanceOptions;
}

class Implementation implements AppInstance {
  readonly components: InstanceComponents;
  readonly controls: InstanceControls;
  readonly factories: InstanceFactories;
  readonly hooks: InstanceHooks;
  readonly modules: InstanceModules;
  readonly options: InstanceOptions;

  constructor () {
    this.options = createInstanceOptions();
    this.components = createInstanceComponents();
    this.controls = createInstanceControls();
    this.factories = createInstanceFactories();

    this.modules = createInstanceModules({
      factories: this.factories,
      options: this.options,
    });

    this.hooks = createInstanceHooks({
      components: this.components,
      modules: this.modules
    });
  }
}

export function createAppInstance (): AppInstance {
  return new Implementation();
}
