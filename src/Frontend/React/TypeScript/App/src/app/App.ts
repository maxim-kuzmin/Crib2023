import { type Components } from './Components';
import { type Controls } from './Controls';
import { type Factories } from './Factories';
import { type Hooks } from './Hooks';
import { type Modules } from './Modules';

export interface App {
  readonly components: Components;
  readonly controls: Controls;
  readonly factories: Factories;
  readonly hooks: Hooks;
  readonly modules: Modules;
}
