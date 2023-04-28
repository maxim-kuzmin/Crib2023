import { type Component, createComponent } from './Component';
import { type Control, createControl } from './Control';
import { type Factory, createFactory } from './Factory';
import { type Hooks, createHooks } from './Hooks';
import { type Module, createModule } from './Module';

export interface App {
  readonly component: Component;
  readonly control: Control;
  readonly factory: Factory;
  readonly hooks: Hooks;
  readonly module: Module;
}

export function createApp (): App {
  const component = createComponent();
  const control = createControl();
  const factory = createFactory();
  const module = createModule();
  const hooks = createHooks({ component, module });

  return { component, control, factory, hooks, module };
};
