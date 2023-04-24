import { useEffect } from 'react';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';
import { type ConfirmControlComponent, ConfirmControlType } from '../../common';
import { type ConfirmControlHooks } from '../../controls';

interface Options {
  readonly componentOfConfirmControl: ConfirmControlComponent;
  readonly hooksOfConfirmControl: ConfirmControlHooks;
  readonly shouldBlock: boolean;
}

export function useLeaveFormBlocker ({
  componentOfConfirmControl,
  hooksOfConfirmControl,
  shouldBlock
}: Options) {
  const resourceOfConfirmControl = hooksOfConfirmControl.useResource();

  const blocker = useBlocker(shouldBlock);

  useEffect(
    () => {
      if (blocker.state === 'blocked') {
        componentOfConfirmControl.show({
          resourceOfConfirmControl,
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
    [
      blocker,
      componentOfConfirmControl,
      resourceOfConfirmControl
    ]
  );
}
