import { useEffect } from 'react';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';
import {
  type ConfirmControlComponent,
  type ConfirmControlHooks,
  ConfirmControlType
} from '../../common';

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
  const blocker = useBlocker(shouldBlock);

  const resourceOfConfirmControl = hooksOfConfirmControl.useResource();

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
