import React, { memo, useCallback } from 'react';
import app from '../../../app';

export const AppNotificationView: React.FC = memo(
function AppNotificationView (): React.ReactElement | null {
  const component = app.hooks.Controls.Notification.useComponent();

  const { payloadOfSetAction: data } = app.hooks.Views.App.Notification.useStoreState();

  const onActionCompleted = useCallback(() => {
      if (data) {
        component.show(data);
      }
    },
    [component, data]
  );

  app.hooks.Views.App.Notification.useStoreClearActionOutput({
    onActionCompleted
  });

  return (
      <>
          {component.content}
      </>
  );
});
