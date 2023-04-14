import React, { memo, useCallback } from 'react';
import { StoreDispatchType } from '../../../all';
import { getModule } from '../../../app/ModuleImpl';
import { AppNotificationStoreSliceName } from '../../../app/Stores';

const appNotificationStoreSliceName = AppNotificationStoreSliceName.Global;

export const AppNotificationView: React.FC = memo(
function AppNotificationView () {
  const notificationControlHooks = getModule().getNotificationControlHooks();

  const component = notificationControlHooks.useComponent();

  const appNotificationStoreHooks = getModule().getAppNotificationStoreHooks();

  const { payloadFromSetAction: data } = appNotificationStoreHooks.useState(appNotificationStoreSliceName);

  const callback = useCallback(() => {
      if (data) {
        component.show(data);
      }
    },
    [component, data]
  );

  appNotificationStoreHooks.useDispatchToClear(
    appNotificationStoreSliceName,
    {
      dispatchType: StoreDispatchType.MountOrUpdate,
      callback
    }
  );

  return (
      <>
          {component.content}
      </>
  );
});
