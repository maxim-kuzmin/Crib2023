import { type ConfirmControlComponent } from '../common';
import { useLeaveFormBlocker as useLeaveFormBlockerInner } from './Hooks/LeaveFormBlockerHook';
import { ModuleImpl } from './ModuleImpl';
import { type Hooks, type Module } from '.';

export function createHooks (confirmControlComponent: ConfirmControlComponent): Hooks {
  function useLeaveFormBlocker (shouldBlock: boolean) {
    useLeaveFormBlockerInner(confirmControlComponent, shouldBlock);
  }

  return {
    useLeaveFormBlocker
  };
}

export function createModule (): Module {
  return new ModuleImpl();
}
