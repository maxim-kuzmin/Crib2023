import { type FunctionToSetNotification } from './CommonFunctions';
import { type ConfirmControlComponent, type ConfirmControlHooks } from './Controls';
import { useLeaveFormBlocker as useLeaveFormBlockerInner } from './Hooks/LeaveFormBlockerHook';
import { type OperationHooks } from './Operation';
import { createOperationHooks } from './Operation/OperationHooks';

export interface CommonHooks {
  readonly Operation: OperationHooks;
  readonly useLeaveFormBlocker: (shouldBlock: boolean) => void;
}

interface Options {
  readonly componentOfConfirmControl: ConfirmControlComponent;
  readonly hooksOfConfirmControl: ConfirmControlHooks;
  readonly pathOfOperationHandlerResource: string;
  readonly useFunctionToSetNotification: () => FunctionToSetNotification;
}

export function createCommonHooks ({
  componentOfConfirmControl,
  hooksOfConfirmControl,
  pathOfOperationHandlerResource,
  useFunctionToSetNotification,
}: Options): CommonHooks {
  const hooksOfOperation = createOperationHooks({
    pathOfOperationHandlerResource,
    useFunctionToSetNotification
  });

  function useLeaveFormBlocker (shouldBlock: boolean) {
    useLeaveFormBlockerInner({
      componentOfConfirmControl,
      hooksOfConfirmControl,
      shouldBlock
    });
  }

  return {
    Operation: hooksOfOperation,
    useLeaveFormBlocker,
  };
}
