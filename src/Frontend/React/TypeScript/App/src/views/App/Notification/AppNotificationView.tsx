import React, { memo, useEffect } from 'react';
import { useAppInstance } from '../../../app';

export const AppNotificationView: React.FC = memo(
function AppNotificationView (): React.ReactElement | null {
  const { hooks } = useAppInstance();

  const component = hooks.Controls.Notification.useComponent();

  const { dispatchOfClearAction } = hooks.Views.App.Notification.useStoreClearActionOutput();

  const { resultOfSetAction } = hooks.Views.App.Notification.useStoreState();

  useEffect(
    () => {
      if (resultOfSetAction) {
        component.show(resultOfSetAction);

        dispatchOfClearAction.run();
      }
    },
    [component, dispatchOfClearAction, resultOfSetAction]
  );

  return (
      <>
          {component.content}
      </>
  );
});
