import {
  type InstanceSettings,
  type InstanceComponents,
  type InstanceControls,
  type InstanceHooks,
  type InstanceModules,
  createInstanceComponents,
  createInstanceControls,
  createInstanceHooks,
  createInstanceModules,
  createInstanceSettings,
} from './Instance';

export interface AppInstance {
  readonly components: InstanceComponents;
  readonly controls: InstanceControls;
  readonly hooks: InstanceHooks;
  readonly modules: InstanceModules;
  readonly settings: InstanceSettings;
}

class Implementation implements AppInstance {
  readonly components: InstanceComponents;
  readonly controls: InstanceControls;
  readonly hooks: InstanceHooks;
  readonly modules: InstanceModules;
  readonly settings: InstanceSettings;

  constructor () {
    this.settings = createInstanceSettings();
    this.components = createInstanceComponents();
    this.controls = createInstanceControls();

    this.modules = createInstanceModules({
      settings: this.settings,
    });

    this.hooks = createInstanceHooks({
      components: this.components,
      modules: this.modules,
      settings: this.settings,
    });
  }
}

export function createAppInstance (): AppInstance {
  return new Implementation();
}
