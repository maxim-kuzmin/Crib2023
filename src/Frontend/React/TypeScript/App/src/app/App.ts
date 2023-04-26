import { type Controls } from './Controls';
import { type Module } from './Module';

export interface App {
  readonly controls: Controls;
  readonly module: Module;
}
