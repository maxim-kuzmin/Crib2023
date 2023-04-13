import React, { memo, useCallback } from 'react';
import { AppNotificationStoreSliceName, StoreDispatchType, getModule } from '../../../all';
// import { getModule } from '../../../app/Module/ModuleImpl';
// console.log(getModule());

export const AppNotificationView: React.FC = memo(
function AppNotificationView () {
  const notificationControlHooks = getModule().getNotificationControlHooks();

  const component = notificationControlHooks.useComponent();

  const appNotificationStoreHooks = getModule().getAppNotificationStoreHooks();

  const appNotificationStoreSliceName = AppNotificationStoreSliceName.Global;

  const { payloadFromSetAction: data } = appNotificationStoreHooks.useState(appNotificationStoreSliceName);

  const callback = useCallback(() => {
      if (data) {
        component.show(data);
      }
    },
    [component, data]
  );

  appNotificationStoreHooks.useDispatchToClear({
    sliceName: appNotificationStoreSliceName,
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback
  });

  return (
      <>
          {component.content}
      </>
  );
});
