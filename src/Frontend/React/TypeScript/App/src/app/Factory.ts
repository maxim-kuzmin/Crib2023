import { type ConfirmControlComponent } from '../common';
import { useLeaveFormBlocker as useLeaveFormBlockerInner } from './Hooks/LeaveFormBlockerHook';
import { ModuleImpl } from './ModuleImpl';
import { type Hooks, type Module } from '.';
import { type ConfirmControlHooks } from '../controls';

interface Options {
  readonly componentOfConfirmControl: ConfirmControlComponent;
  readonly hooksOfConfirmControl: ConfirmControlHooks;
}

export function createHooks ({
  componentOfConfirmControl,
  hooksOfConfirmControl
}: Options): Hooks {
  function useLeaveFormBlocker (shouldBlock: boolean) {
    useLeaveFormBlockerInner({
      componentOfConfirmControl,
      hooksOfConfirmControl,
      shouldBlock
    });
  }

  return {
    useLeaveFormBlocker
  };
}

export function createModule (): Module {
  return new ModuleImpl();
}
