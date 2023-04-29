import React, { memo, useCallback } from 'react';
import appInstance from '../../../app/AppInstance';

export const AppNotificationView: React.FC = memo(
function AppNotificationView (): React.ReactElement | null {
  const component = appInstance.hooks.Controls.Notification.useComponent();

  const { payloadOfSetAction: data } = appInstance.hooks.Views.App.Notification.useStoreState();

  const onActionCompleted = useCallback(() => {
      if (data) {
        component.show(data);
      }
    },
    [component, data]
  );

  appInstance.hooks.Views.App.Notification.useStoreClearActionOutput({
    onActionCompleted
  });

  return (
      <>
          {component.content}
      </>
  );
});
