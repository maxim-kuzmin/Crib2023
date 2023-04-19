import React, { memo, useCallback } from 'react';
import { getModule } from '../../../app/ModuleImpl';
import { StoreDispatchType } from '../../../common';

export const AppNotificationView: React.FC = memo(
function AppNotificationView () {
  const notificationControlHooks = getModule().getNotificationControlHooks();

  const component = notificationControlHooks.useComponent();

  const appNotificationViewHooks = getModule().getAppNotificationViewHooks();

  const { payloadOfSetAction: data } = appNotificationViewHooks.useStoreState();

  const callback = useCallback(() => {
      if (data) {
        component.show(data);
      }
    },
    [component, data]
  );

  appNotificationViewHooks.useClearActionDispatch({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback
  });

  return (
      <>
          {component.content}
      </>
  );
});
