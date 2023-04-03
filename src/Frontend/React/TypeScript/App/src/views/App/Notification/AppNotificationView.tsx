import React, { useCallback } from 'react';
import { getModule, StoreDispatchType } from '../../../all';

export const AppNotificationView: React.FC = () => {
    const {
      getAppNotificationStoreService,
      getNotificationControlService
    } = getModule();

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
