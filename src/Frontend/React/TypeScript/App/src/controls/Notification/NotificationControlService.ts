import { notification } from 'antd';
import { useMemo } from 'react';
import { type NotificationComponent, type NotificationData, NotificationType } from '../../common';

function useComponent (): NotificationComponent {
    const [api, contextHolder] = notification.useNotification();

    return useMemo(() => ({
      content: contextHolder,
      show: (input: NotificationData) => {
        const { type, message, description } = input;

        switch (type) {
            case NotificationType.Error:
                api.error({ message, description });
                break;
            case NotificationType.Info:
                api.info({ message, description });
                break;
            case NotificationType.Success:
                api.success({ message, description });
                break;
            case NotificationType.Waring:
                api.warning({ message, description });
                break;
        }
      },
    }), [api, contextHolder]);
}

export interface NotificationControlService {
  readonly useComponent: () => NotificationComponent;
};

const service: NotificationControlService = {
    useComponent
};

export function getNotificationControlService (): NotificationControlService {
  return service;
}
