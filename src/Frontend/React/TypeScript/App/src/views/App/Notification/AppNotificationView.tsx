import React, { memo, useCallback } from 'react';
import app from '../../../app';

export const AppNotificationView: React.FC = memo(
function AppNotificationView () {
  const notificationControlHooks = app.module.getNotificationControlHooks();

  const component = notificationControlHooks.useComponent();

  const appNotificationViewHooks = app.module.getAppNotificationViewHooks();

  const { payloadOfSetAction: data } = appNotificationViewHooks.useStoreState();

  const onActionCompleted = useCallback(() => {
      if (data) {
        component.show(data);
      }
    },
    [component, data]
  );

  appNotificationViewHooks.useStoreClearActionOutput({
    onActionCompleted
  });

  return (
      <>
          {component.content}
      </>
  );
});
