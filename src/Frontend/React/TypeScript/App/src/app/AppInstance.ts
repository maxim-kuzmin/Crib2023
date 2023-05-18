import {
  type InstanceOptions,
  type InstanceComponents,
  type InstanceControls,
  type InstanceHooks,
  type InstanceModules,
  createInstanceComponents,
  createInstanceControls,
  createInstanceHooks,
  createInstanceModules,
  createInstanceOptions,
} from './Instance';

export interface AppInstance {
  readonly components: InstanceComponents;
  readonly controls: InstanceControls;
  readonly hooks: InstanceHooks;
  readonly modules: InstanceModules;
  readonly options: InstanceOptions;
}

class Implementation implements AppInstance {
  readonly components: InstanceComponents;
  readonly controls: InstanceControls;
  readonly hooks: InstanceHooks;
  readonly modules: InstanceModules;
  readonly options: InstanceOptions;

  constructor () {
    this.options = createInstanceOptions();
    this.components = createInstanceComponents();
    this.controls = createInstanceControls();

    this.modules = createInstanceModules({
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
