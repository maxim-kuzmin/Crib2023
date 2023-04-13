import { type Module } from '../../../all';
import { ModuleImpl } from './ModuleImpl';

const module = new ModuleImpl();

export function getModule (): Module {
  return module;
}
