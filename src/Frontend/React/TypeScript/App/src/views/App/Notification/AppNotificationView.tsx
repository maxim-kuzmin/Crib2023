import React from 'react';
import { StoreDispatchType } from '../../../common';
import { notificationControl } from '../../../controls';
import { appNotificationStoreSlice } from '../../../stores';

export function AppNotificationView () {
    const component = notificationControl.useComponent();

    const { data } = appNotificationStoreSlice.useState();

    appNotificationStoreSlice.useDispatchToClear({
      dispatchType: StoreDispatchType.MountOrUpdate,
      callback: () => {
        if (data) {
          component.show(data);
        }
      }
    });

    return (
        <>
            {component.content}
        </>
    );
}
