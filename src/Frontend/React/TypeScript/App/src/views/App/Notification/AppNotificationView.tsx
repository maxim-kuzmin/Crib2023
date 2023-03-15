import React, { useCallback } from 'react';
import { StoreDispatchType } from '../../../common';
import { useAppModule } from '../../../app/Module';

export function AppNotificationView () {
    const {
      getAppNotificationStoreService,
      getNotificationControlService
    } = useAppModule();

    const notificationControlService = getNotificationControlService();

    const component = notificationControlService.useComponent();

    const appNotificationStoreService = getAppNotificationStoreService();

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
}
