import { type ConfirmControlComponent, type ConfirmControlHooks } from './Controls';
import { useLeaveFormBlocker as useLeaveFormBlockerInner } from './Hooks/LeaveFormBlockerHook';

export interface CommonHooks {
  readonly useLeaveFormBlocker: (shouldBlock: boolean) => void;
}

interface Options {
  readonly componentOfConfirmControl: ConfirmControlComponent;
  readonly hooksOfConfirmControl: ConfirmControlHooks;
}

export function createCommonHooks ({
  componentOfConfirmControl,
  hooksOfConfirmControl
}: Options): CommonHooks {
  function useLeaveFormBlocker (shouldBlock: boolean) {
    useLeaveFormBlockerInner({
      componentOfConfirmControl,
      hooksOfConfirmControl,
      shouldBlock
    });
  }

  return { useLeaveFormBlocker };
}
