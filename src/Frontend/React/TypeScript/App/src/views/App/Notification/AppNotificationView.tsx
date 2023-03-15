import React, { useCallback } from 'react';
import { StoreDispatchType } from '../../../common';
import { notificationControl } from '../../../controls';
import { appNotificationStoreSlice } from '../../../stores';

export function AppNotificationView () {
    const component = notificationControl.useComponent();

    const { data } = appNotificationStoreSlice.useState();

    const callback = useCallback(() => {
      if (data) {
        component.show(data);
      }
    }, [component, data]);

    appNotificationStoreSlice.useDispatchToClear({
      dispatchType: StoreDispatchType.MountOrUpdate,
      callback
    });

    return (
        <>
            {component.content}
        </>
    );
}
