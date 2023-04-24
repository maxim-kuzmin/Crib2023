import React, { memo, useCallback } from 'react';
import { getModule } from '../../../app';

export const AppNotificationView: React.FC = memo(
function AppNotificationView () {
  const notificationControlHooks = getModule().getNotificationControlHooks();

  const component = notificationControlHooks.useComponent();

  const appNotificationViewHooks = getModule().getAppNotificationViewHooks();

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
