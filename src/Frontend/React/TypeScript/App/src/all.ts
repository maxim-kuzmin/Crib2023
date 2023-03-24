import { type Module, ModuleImpl } from './app/Module';

const module: Module = new ModuleImpl();

export function getModule (): Module {
  return module;
}

export { App } from './App';
export * from './common';
export * from './controls';
export * from './data';
export * from './domain';
export * from './domains';
export * from './pages';
export * from './reportWebVitals';
export * from './stores';
export * from './views';
export * from './app/Test';
export * from './app/Module';
export { Provider } from './app/Provider';
