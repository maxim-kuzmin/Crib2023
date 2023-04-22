import { createModule } from './Factory';
import { type Module } from './Module';

const module = createModule();

export function getModule (): Module {
  return module;
}

export { type Hooks } from './Hooks';
export { type Module } from './Module';
