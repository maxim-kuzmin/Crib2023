import { type App } from './App';
import { createControls, createModule } from './Factory';

const app: App = {
  controls: createControls(),
  module: createModule()
};

export default app;
export { type App } from './App';
export { type Controls } from './Controls';
export { type Hooks } from './Hooks';
export * from './Localization';
export { type Module } from './Module';
export * from './Stores';
