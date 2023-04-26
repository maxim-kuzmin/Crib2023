import { type Components } from './Components';
import { type Controls } from './Controls';
import { type Hooks } from './Hooks';
import { type Module } from './Module';

export interface App {
  readonly components: Components;
  readonly controls: Controls;
  readonly hooks: Hooks;
  readonly module: Module;
}
