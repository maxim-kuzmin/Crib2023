import { useEffect } from 'react';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';
import { type ConfirmControlComponent, ConfirmControlType } from '../../common';

export function useLeaveFormBlocker (confirmControlComponent: ConfirmControlComponent, shouldBlock: boolean) {
  const blocker = useBlocker(true);

  useEffect(
    () => {
      if (blocker.state === 'blocked') {
        confirmControlComponent.show({
          onCancel: () => {
            blocker.reset();
          },
          onOk: () => {
            blocker.proceed();
          },
          type: ConfirmControlType.LeaveForm
        })
      }
    },
    [blocker, confirmControlComponent]
  );
}
