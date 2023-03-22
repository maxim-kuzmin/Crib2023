import { type Module } from './app/Module';
import { ModuleImpl } from './app/ModuleImpl';

const module: Module = new ModuleImpl();

export function getModule (): Module {
  return module;
}

export * from './App';
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
export * from './app/ModuleImpl';
export * from './app/Provider';
