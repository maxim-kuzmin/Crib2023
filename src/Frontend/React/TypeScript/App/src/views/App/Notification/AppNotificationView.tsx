import React, { useCallback } from 'react';
import { StoreDispatchType } from '../../../common';
import { notificationControlService } from '../../../controls';
import { appNotificationStoreService } from '../../../stores';

export function AppNotificationView () {
    const component = notificationControlService.useComponent();

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
