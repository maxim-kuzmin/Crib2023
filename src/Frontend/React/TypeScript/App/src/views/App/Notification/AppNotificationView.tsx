import React, { memo, useCallback } from 'react';
import { getModule, StoreDispatchType } from '../../../all';

export const AppNotificationView: React.FC = memo(
    function AppNotificationView () {
  const notificationControlService = getModule().getNotificationControlService();

  const component = notificationControlService.useComponent();

  const appNotificationStoreHooks = getModule().getAppNotificationStoreHooks();

  const { data } = appNotificationStoreHooks.useState();

  const callback = useCallback(() => {
    if (data) {
      component.show(data);
    }
  }, [component, data]);

  appNotificationStoreHooks.useDispatchToClear({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback
  });

  return (
      <>
          {component.content}
      </>
  );
});
