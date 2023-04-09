import React, { memo, useCallback } from 'react';
import { getModule, StoreDispatchType } from '../../../all';

export const AppNotificationView: React.FC = memo(function AppNotificationView () {
    const notificationControlService = getModule().getNotificationControlService();

    const component = notificationControlService.useComponent();

    const appNotificationStoreService = getModule().getAppNotificationStoreService();

    const { data } = appNotificationStoreService.useState();

    const callback = useCallback(() => {
      if (data) {
        component.show(data);
      }
    }, [component, data]);

    appNotificationStoreService.useDispatchToClear({
      dispatchType: StoreDispatchType.MountOrUpdate,
      callback
    });

    return (
        <>
            {component.content}
        </>
    );
});
