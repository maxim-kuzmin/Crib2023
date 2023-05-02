import React, { memo, useCallback } from 'react';
import { useApp } from '../../../app';

export const AppNotificationView: React.FC = memo(
function AppNotificationView (): React.ReactElement | null {
  const { hooks } = useApp();

  const component = hooks.Controls.Notification.useComponent();

  const { payloadOfSetAction: data } = hooks.Views.App.Notification.useStoreState();

  const onActionCompleted = useCallback(() => {
      if (data) {
        component.show(data);
      }
    },
    [component, data]
  );

  hooks.Views.App.Notification.useStoreClearActionOutput({
    onActionCompleted
  });

  return (
      <>
          {component.content}
      </>
  );
});
