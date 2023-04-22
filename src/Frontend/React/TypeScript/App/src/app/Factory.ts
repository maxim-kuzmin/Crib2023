import { type ConfirmControlComponent } from '../common';
import { useLeaveFormBlocker as useLeaveFormBlockerInner } from './Hooks/LeaveFormBlockerHook';
import { type Hooks } from './Hooks';

export function createHooks (confirmControlComponent: ConfirmControlComponent): Hooks {
  function useLeaveFormBlocker (shouldBlock: boolean) {
    useLeaveFormBlockerInner(confirmControlComponent, shouldBlock);
  }

  return {
    useLeaveFormBlocker
  };
}
